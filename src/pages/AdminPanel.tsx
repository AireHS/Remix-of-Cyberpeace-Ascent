import { useState, useEffect } from 'react';
import AdminAnalytics from '@/components/AdminAnalytics';
import DeliveryPipeline from '@/components/DeliveryPipeline';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Shield, Users, FileText, CheckCircle, XCircle, Clock,
  Award, Star, Search, ChevronDown, Trash2, Plus,
  Building2, Globe, Phone, Mail, TrendingUp, Target,
  DollarSign, Calendar, UserCheck, Briefcase, LogOut, Settings,
  CreditCard, Send, MapPin, UserPlus
} from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '@supabase/supabase-js';
import logoColor from '@/assets/logo-color.png';

type PartnerLevel = 'authorized' | 'gold' | 'platinum';
type ResourceCategory = 'sales_playbook' | 'storytelling' | 'presentations' | 'technical_guides' | 'case_studies' | 'marketing_materials' | 'certifications' | 'competitive_intelligence';
type DealStatus = 'registered' | 'in_progress' | 'won' | 'lost' | 'expired';
type LeadStatus = 'new' | 'assigned' | 'contacted' | 'converted' | 'discarded';

interface PricingLead {
  id: string;
  full_name: string;
  corporate_email: string;
  company_name: string;
  country: string;
  phone: string | null;
  service_slug: string;
  service_type: string;
  payment_method: string;
  estimated_value: number | null;
  currency: string;
  calculation_params: any;
  status: LeadStatus;
  assigned_to: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

interface PartnerProfile {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  level: PartnerLevel;
  status: string;
  phone: string | null;
  country: string | null;
  created_at: string;
  is_company_rep: boolean;
}

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: ResourceCategory;
  min_level: PartnerLevel;
  file_type: string | null;
  created_at: string;
}

type DeliveryPhase = 'pending' | 'onboarding' | 'configuracion' | 'operacion' | 'revision' | 'kickoff' | 'implementacion' | 'qa' | 'entrega' | 'cerrado';
type DeliveryType = 'recurring' | 'one_shot';

interface Deal {
  id: string;
  partner_profile_id: string;
  company_name_partner: string;
  client_company: string;
  client_contact: string | null;
  client_email: string | null;
  deal_description: string;
  estimated_value: number | null;
  currency: string;
  status: DealStatus;
  notes: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  delivery_type: DeliveryType | null;
  delivery_phase: DeliveryPhase;
  phase_started_at: string | null;
  phase_sla_days: number;
  delivery_responsible: string | null;
  delivery_notes: string | null;
}

const levelBadge: Record<PartnerLevel, { label: string; color: string }> = {
  authorized: { label: 'Authorized', color: 'bg-muted text-muted-foreground border-border' },
  gold: { label: 'Gold', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  platinum: { label: 'Platinum', color: 'bg-primary/10 text-primary border-primary/20' },
};

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pendiente', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: Clock },
  approved: { label: 'Aprobado', color: 'bg-green-500/10 text-green-600 border-green-500/20', icon: CheckCircle },
  rejected: { label: 'Rechazado', color: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
};

const dealStatusConfig: Record<DealStatus, { label: string; color: string }> = {
  registered: { label: 'Registrada', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  in_progress: { label: 'En Progreso', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  won: { label: 'Ganada', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
  lost: { label: 'Perdida', color: 'bg-destructive/10 text-destructive border-destructive/20' },
  expired: { label: 'Expirada', color: 'bg-muted text-muted-foreground border-border' },
};

const leadStatusConfig: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: 'Nuevo', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  assigned: { label: 'Asignado', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  contacted: { label: 'Contactado', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  converted: { label: 'Convertido', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
  discarded: { label: 'Descartado', color: 'bg-muted text-muted-foreground border-border' },
};

const serviceLabels: Record<string, string> = {
  soc360: 'SOC360', ir: 'CPCSIRT', exposure: 'Red Team', brand: 'Brand Protection', grc: 'GRC',
};

const countryRegionMap: Record<string, string> = {
  'México': 'LATAM Norte', 'Guatemala': 'LATAM Norte', 'Honduras': 'LATAM Norte', 'El Salvador': 'LATAM Norte', 'Nicaragua': 'LATAM Norte', 'Costa Rica': 'LATAM Norte', 'Panamá': 'LATAM Norte', 'República Dominicana': 'LATAM Norte',
  'Colombia': 'Andina', 'Ecuador': 'Andina', 'Perú': 'Andina', 'Venezuela': 'Andina', 'Bolivia': 'Andina',
  'Chile': 'Cono Sur', 'Argentina': 'Cono Sur', 'Uruguay': 'Cono Sur', 'Paraguay': 'Cono Sur',
  'Brasil': 'Brasil', 'España': 'Europa', 'Estados Unidos': 'USA',
};

const categoryLabels: Record<ResourceCategory, string> = {
  sales_playbook: 'Sales Playbook',
  storytelling: 'Storytelling',
  presentations: 'Presentaciones',
  technical_guides: 'Guías Técnicas',
  case_studies: 'Casos de Éxito',
  marketing_materials: 'Marketing',
  certifications: 'Certificaciones',
  competitive_intelligence: 'Inteligencia Competitiva',
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'analytics' | 'companies' | 'deals' | 'resources' | 'leads'>('analytics');
  const [partners, setPartners] = useState<PartnerProfile[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [leads, setLeads] = useState<PricingLead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dealStatusFilter, setDealStatusFilter] = useState<string>('all');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [editingDealNotes, setEditingDealNotes] = useState<string | null>(null);
  const [editingLeadNotes, setEditingLeadNotes] = useState<string | null>(null);
  const [leadNoteText, setLeadNoteText] = useState('');
  const [adminNoteText, setAdminNoteText] = useState('');

  const [showNewResource, setShowNewResource] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '', description: '', category: 'sales_playbook' as ResourceCategory,
    min_level: 'authorized' as PartnerLevel, file_type: 'pdf',
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) { navigate('/partner-login'); return; }
      setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/partner-login'); return; }
      setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const checkAdmin = async () => {
      const { data } = await supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin');
      if (!data || data.length === 0) {
        toast.error('No tienes permisos de administrador');
        navigate('/partner-dashboard');
        return;
      }
      setIsAdmin(true);
      fetchData();
    };
    checkAdmin();
  }, [user, navigate]);

  const fetchData = async () => {
    const [partnersRes, dealsRes, resourcesRes, leadsRes] = await Promise.all([
      supabase.from('partner_profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('deal_registrations').select('*').order('created_at', { ascending: false }),
      supabase.from('partner_resources').select('*').order('created_at', { ascending: false }),
      supabase.from('pricing_leads').select('*').order('created_at', { ascending: false }),
    ]);
    if (partnersRes.data) setPartners(partnersRes.data as unknown as PartnerProfile[]);
    if (dealsRes.data) setDeals(dealsRes.data as unknown as Deal[]);
    if (resourcesRes.data) setResources(resourcesRes.data as unknown as Resource[]);
    if (leadsRes.data) setLeads(leadsRes.data as unknown as PricingLead[]);
    setLoading(false);
  };

  const updatePartnerStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('partner_profiles').update({ status }).eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success(`Partner ${status === 'approved' ? 'aprobado' : 'rechazado'}`);
    setPartners(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const updatePartnerLevel = async (id: string, level: PartnerLevel) => {
    const { error } = await supabase.from('partner_profiles').update({ level }).eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Nivel actualizado');
    setPartners(prev => prev.map(p => p.id === id ? { ...p, level } : p));
  };

  const toggleCompanyRep = async (id: string, current: boolean) => {
    const { error } = await supabase.from('partner_profiles').update({ is_company_rep: !current }).eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success(!current ? 'Designado como representante de empresa' : 'Representante removido');
    setPartners(prev => prev.map(p => p.id === id ? { ...p, is_company_rep: !current } : p));
  };

  const updateDealStatus = async (id: string, status: DealStatus) => {
    const updates: any = { status };
    // Auto-start delivery when deal is won
    if (status === 'won') {
      const deal = deals.find(d => d.id === id);
      if (deal && deal.delivery_phase === 'pending') {
        const defaultType: DeliveryType = 'recurring';
        const firstPhase: DeliveryPhase = 'onboarding';
        updates.delivery_type = defaultType;
        updates.delivery_phase = firstPhase;
        updates.phase_started_at = new Date().toISOString();
      }
    }
    const { error } = await supabase.from('deal_registrations').update(updates).eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Status actualizado');
    setDeals(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const updateDeliveryPhase = async (dealId: string, phase: DeliveryPhase) => {
    const updates = { delivery_phase: phase, phase_started_at: new Date().toISOString() };
    const { error } = await supabase.from('deal_registrations').update(updates as any).eq('id', dealId);
    if (error) { toast.error(error.message); return; }
    toast.success(`Fase actualizada a ${phase}`);
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, ...updates } : d));
  };

  const updateDeliveryType = async (dealId: string, type: DeliveryType) => {
    const firstPhase: DeliveryPhase = type === 'one_shot' ? 'kickoff' : 'onboarding';
    const updates = { delivery_type: type, delivery_phase: firstPhase, phase_started_at: new Date().toISOString() };
    const { error } = await supabase.from('deal_registrations').update(updates as any).eq('id', dealId);
    if (error) { toast.error(error.message); return; }
    toast.success('Tipo de delivery actualizado');
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, ...updates } : d));
  };

  const updateDeliveryResponsible = async (dealId: string, userId: string) => {
    const { error } = await supabase.from('deal_registrations').update({ delivery_responsible: userId || null } as any).eq('id', dealId);
    if (error) { toast.error(error.message); return; }
    toast.success('Responsable actualizado');
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, delivery_responsible: userId || null } : d));
  };

  const updateDeliverySla = async (dealId: string, days: number) => {
    const { error } = await supabase.from('deal_registrations').update({ phase_sla_days: days } as any).eq('id', dealId);
    if (error) { toast.error(error.message); return; }
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, phase_sla_days: days } : d));
  };

  const saveDealAdminNotes = async (id: string) => {
    const { error } = await supabase.from('deal_registrations').update({ admin_notes: adminNoteText }).eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Nota guardada');
    setDeals(prev => prev.map(d => d.id === id ? { ...d, admin_notes: adminNoteText } : d));
    setEditingDealNotes(null);
    setAdminNoteText('');
  };

  const deleteResource = async (id: string) => {
    const { error } = await supabase.from('partner_resources').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Recurso eliminado');
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const createResource = async () => {
    if (!newResource.title.trim()) { toast.error('El título es requerido'); return; }
    const { data, error } = await supabase.from('partner_resources').insert(newResource).select().single();
    if (error) { toast.error(error.message); return; }
    toast.success('Recurso creado');
    if (data) setResources(prev => [data as unknown as Resource, ...prev]);
    setNewResource({ title: '', description: '', category: 'sales_playbook', min_level: 'authorized', file_type: 'pdf' });
    setShowNewResource(false);
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    const { error } = await supabase.from('pricing_leads').update({ status } as any).eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Status del lead actualizado');
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const saveLeadNotes = async (id: string) => {
    const { error } = await supabase.from('pricing_leads').update({ admin_notes: leadNoteText } as any).eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Nota guardada');
    setLeads(prev => prev.map(l => l.id === id ? { ...l, admin_notes: leadNoteText } : l));
    setEditingLeadNotes(null);
    setLeadNoteText('');
  };

  const autoAssignLead = async (lead: PricingLead) => {
    const region = countryRegionMap[lead.country] || 'Otro';
    // Find an approved partner in the same region/country
    const regionPartners = partners.filter(p => p.status === 'approved' && p.country === lead.country);
    if (regionPartners.length > 0) {
      const assigned = regionPartners[0];
      const { error } = await supabase.from('pricing_leads').update({ assigned_to: assigned.user_id, status: 'assigned' as any } as any).eq('id', lead.id);
      if (error) { toast.error(error.message); return; }
      toast.success(`Lead asignado a ${assigned.contact_name} (${region})`);
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, assigned_to: assigned.user_id, status: 'assigned' as LeadStatus } : l));
    } else {
      toast.error(`No hay partners aprobados en ${lead.country} (${region})`);
    }
  };

  const assignLeadManually = async (leadId: string, userId: string) => {
    const { error } = await supabase.from('pricing_leads').update({ assigned_to: userId, status: 'assigned' as any } as any).eq('id', leadId);
    if (error) { toast.error(error.message); return; }
    const partner = partners.find(p => p.user_id === userId);
    toast.success(`Lead asignado a ${partner?.contact_name || 'vendedor'}`);
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, assigned_to: userId, status: 'assigned' as LeadStatus } : l));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/partner-login');
  };

  // Group partners by company
  const companies = partners.reduce<Record<string, PartnerProfile[]>>((acc, p) => {
    if (!acc[p.company_name]) acc[p.company_name] = [];
    acc[p.company_name].push(p);
    return acc;
  }, {});

  const filteredCompanies = Object.entries(companies).filter(([name, members]) => {
    const matchSearch = !searchQuery || name.toLowerCase().includes(searchQuery.toLowerCase()) || members.some(m => m.contact_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStatus = statusFilter === 'all' || members.some(m => m.status === statusFilter);
    return matchSearch && matchStatus;
  });

  const filteredDeals = deals.filter(d => {
    const matchSearch = !searchQuery || d.client_company.toLowerCase().includes(searchQuery.toLowerCase()) || d.company_name_partner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = dealStatusFilter === 'all' || d.status === dealStatusFilter;
    return matchSearch && matchStatus;
  });

  const filteredResources = resources.filter(r =>
    !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLeads = leads.filter(l => {
    const matchSearch = !searchQuery || l.company_name.toLowerCase().includes(searchQuery.toLowerCase()) || l.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || l.corporate_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    return matchSearch && matchStatus;
  });

  const pendingCount = partners.filter(p => p.status === 'pending').length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const totalDealValue = deals.filter(d => d.status === 'won').reduce((sum, d) => sum + (d.estimated_value || 0), 0);
  const totalLeadValue = leads.reduce((sum, l) => sum + (l.estimated_value || 0), 0);

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass = "w-full bg-card/50 border border-border rounded-xl py-2.5 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 transition-all";
  const selectClass = "bg-card/50 border border-border rounded-lg py-1.5 px-3 text-xs text-foreground focus:outline-none focus:border-primary/30 transition-all appearance-none cursor-pointer";

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/" className="shrink-0">
              <img src={logoColor} alt="Cyberpeace" className="h-7" />
            </Link>
            <div className="h-5 w-px bg-border" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5" /> Admin Panel
            </span>
            {pendingCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                <Clock className="w-3 h-3" />
                {pendingCount} pendientes
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/partner-dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Portal
            </Link>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Cerrar sesión">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10">
            {[
              { icon: Building2, label: 'Empresas', value: Object.keys(companies).length },
              { icon: Users, label: 'Usuarios', value: partners.length },
              { icon: Clock, label: 'Pendientes', value: pendingCount },
              { icon: Target, label: 'Oportunidades', value: deals.length },
              { icon: Send, label: 'Leads Nuevos', value: newLeadsCount },
              { icon: DollarSign, label: 'Pipeline Leads', value: `$${(totalLeadValue / 1000).toFixed(0)}K` },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/50 border border-border rounded-xl p-4">
                <stat.icon className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 mb-8 border-b border-border overflow-x-auto">
            {[
              { id: 'analytics' as const, label: 'Analytics', icon: TrendingUp },
              { id: 'companies' as const, label: 'Empresas & Usuarios', icon: Building2 },
              { id: 'deals' as const, label: 'Oportunidades', icon: Target },
              { id: 'leads' as const, label: `Leads Pricing${newLeadsCount > 0 ? ` (${newLeadsCount})` : ''}`, icon: Send },
              { id: 'resources' as const, label: 'Recursos', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSearchQuery(''); setStatusFilter('all'); setDealStatusFilter('all'); setLeadStatusFilter('all'); }}
                className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-all -mb-px whitespace-nowrap ${
                  activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
              <input
                type="text"
                placeholder={activeTab === 'companies' ? 'Buscar empresas o usuarios...' : activeTab === 'deals' ? 'Buscar oportunidades...' : activeTab === 'leads' ? 'Buscar leads...' : 'Buscar recursos...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card/50 border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
              />
            </div>
            {activeTab === 'companies' && (
              <div className="relative">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
                  <option value="all">Todos</option>
                  <option value="pending">Pendientes</option>
                  <option value="approved">Aprobados</option>
                  <option value="rejected">Rechazados</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
              </div>
            )}
            {activeTab === 'deals' && (
              <div className="relative">
                <select value={dealStatusFilter} onChange={(e) => setDealStatusFilter(e.target.value)} className={selectClass}>
                  <option value="all">Todos</option>
                  <option value="registered">Registrada</option>
                  <option value="in_progress">En Progreso</option>
                  <option value="won">Ganada</option>
                  <option value="lost">Perdida</option>
                  <option value="expired">Expirada</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
              </div>
            )}
            {activeTab === 'resources' && (
              <button onClick={() => setShowNewResource(!showNewResource)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
                <Plus className="w-4 h-4" /> Nuevo Recurso
              </button>
            )}
            {activeTab === 'leads' && (
              <div className="relative">
                <select value={leadStatusFilter} onChange={(e) => setLeadStatusFilter(e.target.value)} className={selectClass}>
                  <option value="all">Todos</option>
                  <option value="new">Nuevos</option>
                  <option value="assigned">Asignados</option>
                  <option value="contacted">Contactados</option>
                  <option value="converted">Convertidos</option>
                  <option value="discarded">Descartados</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
              </div>
            )}
          </div>

          {/* ===== ANALYTICS TAB ===== */}
          {activeTab === 'analytics' && (
            <AdminAnalytics partners={partners} deals={deals} leads={leads} />
          )}

          {/* ===== COMPANIES TAB ===== */}
          {activeTab === 'companies' && (
            <div className="space-y-4">
              {filteredCompanies.length === 0 ? (
                <div className="text-center py-16">
                  <Building2 className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No se encontraron empresas</p>
                </div>
              ) : filteredCompanies.map(([companyName, members]) => {
                const isExpanded = expandedCompany === companyName;
                const companyDeals = deals.filter(d => d.company_name_partner === companyName);
                const rep = members.find(m => m.is_company_rep);
                const approvedCount = members.filter(m => m.status === 'approved').length;
                const pendingMembers = members.filter(m => m.status === 'pending').length;
                
                return (
                  <div key={companyName} className="bg-card/50 border border-border rounded-xl overflow-hidden transition-all">
                    {/* Company header */}
                    <button
                      onClick={() => setExpandedCompany(isExpanded ? null : companyName)}
                      className="w-full px-6 py-4 flex items-center gap-4 hover:bg-muted/20 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/[0.06] flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-0.5">
                          <h3 className="text-sm font-semibold text-foreground">{companyName}</h3>
                          {pendingMembers > 0 && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                              {pendingMembers} pendientes
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                          <span>{members.length} usuario{members.length > 1 ? 's' : ''}</span>
                          <span>{approvedCount} aprobado{approvedCount !== 1 ? 's' : ''}</span>
                          <span>{companyDeals.length} oportunidad{companyDeals.length !== 1 ? 'es' : ''}</span>
                          {rep && <span className="text-primary">Rep: {rep.contact_name}</span>}
                          {members[0]?.country && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{members[0].country}</span>}
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="border-t border-border px-6 py-5 space-y-4">
                        {/* Members */}
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Usuarios</p>
                          <div className="space-y-2">
                            {members.map((member) => {
                              const status = statusConfig[member.status] || statusConfig.pending;
                              const StatusIcon = status.icon;
                              return (
                                <div key={member.id} className="flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/50">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm font-medium text-foreground">{member.contact_name}</span>
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${status.color}`}>
                                        <StatusIcon className="w-2.5 h-2.5" />
                                        {status.label}
                                      </span>
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${levelBadge[member.level].color}`}>
                                        {levelBadge[member.level].label}
                                      </span>
                                      {member.is_company_rep && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                                          <UserCheck className="w-2.5 h-2.5" /> Rep
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                      {member.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{member.phone}</span>}
                                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(member.created_at).toLocaleDateString('es-ES')}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      onClick={() => toggleCompanyRep(member.id, member.is_company_rep)}
                                      className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-all ${
                                        member.is_company_rep ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                                      }`}
                                    >
                                      {member.is_company_rep ? 'Quitar Rep' : 'Hacer Rep'}
                                    </button>
                                    <div className="relative">
                                      <select value={member.level} onChange={(e) => updatePartnerLevel(member.id, e.target.value as PartnerLevel)} className={selectClass + ' text-[10px]'}>
                                        <option value="authorized">Authorized</option>
                                        <option value="gold">Gold</option>
                                        <option value="platinum">Platinum</option>
                                      </select>
                                    </div>
                                    {member.status === 'pending' ? (
                                      <>
                                        <button onClick={() => updatePartnerStatus(member.id, 'approved')} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500/20 transition-all">
                                          <CheckCircle className="w-3 h-3" /> Aprobar
                                        </button>
                                        <button onClick={() => updatePartnerStatus(member.id, 'rejected')} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-all">
                                          <XCircle className="w-3 h-3" /> Rechazar
                                        </button>
                                      </>
                                    ) : (
                                      <button onClick={() => updatePartnerStatus(member.id, member.status === 'approved' ? 'rejected' : 'approved')} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-muted text-muted-foreground border border-border hover:bg-muted/80 transition-all">
                                        {member.status === 'approved' ? 'Desactivar' : 'Reactivar'}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Company deals */}
                        {companyDeals.length > 0 && (
                          <div>
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Oportunidades ({companyDeals.length})</p>
                            <div className="space-y-2">
                              {companyDeals.map((deal) => (
                                <div key={deal.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 border border-border/50 text-xs">
                                  <Target className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                  <span className="font-medium text-foreground">{deal.client_company}</span>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${dealStatusConfig[deal.status].color}`}>
                                    {dealStatusConfig[deal.status].label}
                                  </span>
                                  {deal.estimated_value && (
                                    <span className="text-muted-foreground">
                                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: deal.currency, maximumFractionDigits: 0 }).format(deal.estimated_value)}
                                    </span>
                                  )}
                                  <span className="text-muted-foreground ml-auto">{new Date(deal.created_at).toLocaleDateString('es-ES')}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ===== DEALS TAB ===== */}
          {activeTab === 'deals' && (
            <div className="space-y-3">
              {filteredDeals.length === 0 ? (
                <div className="text-center py-16">
                  <Target className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No se encontraron oportunidades</p>
                </div>
              ) : filteredDeals.map((deal) => {
                const statusConf = dealStatusConfig[deal.status];
                return (
                  <div key={deal.id} className="bg-card/50 border border-border rounded-xl p-5 transition-all">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-semibold text-foreground">{deal.client_company}</h3>
                          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusConf.color}`}>
                            {statusConf.label}
                          </span>
                          {deal.estimated_value && (
                            <span className="text-sm font-bold text-foreground ml-auto">
                              {new Intl.NumberFormat('en-US', { style: 'currency', currency: deal.currency, maximumFractionDigits: 0 }).format(deal.estimated_value)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{deal.deal_description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1 text-primary font-medium"><Building2 className="w-3 h-3" />{deal.company_name_partner}</span>
                          {deal.client_contact && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{deal.client_contact}</span>}
                          {deal.client_email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{deal.client_email}</span>}
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(deal.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Actualizado: {new Date(deal.updated_at).toLocaleDateString('es-ES')}</span>
                        </div>
                        {deal.notes && (
                          <p className="mt-2 text-xs text-muted-foreground/70 italic">Nota del partner: {deal.notes}</p>
                        )}
                        {deal.admin_notes && editingDealNotes !== deal.id && (
                          <div className="mt-2 p-2.5 bg-primary/[0.04] border border-primary/10 rounded-lg">
                            <p className="text-[11px] text-primary font-medium">Tu nota: {deal.admin_notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="relative">
                          <select value={deal.status} onChange={(e) => updateDealStatus(deal.id, e.target.value as DealStatus)} className={selectClass}>
                            <option value="registered">Registrada</option>
                            <option value="in_progress">En Progreso</option>
                            <option value="won">Ganada</option>
                            <option value="lost">Perdida</option>
                            <option value="expired">Expirada</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                        </div>
                        <button
                          onClick={() => { setEditingDealNotes(editingDealNotes === deal.id ? null : deal.id); setAdminNoteText(deal.admin_notes || ''); }}
                          className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium bg-muted text-muted-foreground border border-border hover:bg-muted/80 transition-all"
                        >
                          {editingDealNotes === deal.id ? 'Cancelar' : 'Nota'}
                        </button>
                      </div>
                    </div>
                    {editingDealNotes === deal.id && (
                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          value={adminNoteText}
                          onChange={(e) => setAdminNoteText(e.target.value)}
                          placeholder="Escribe una nota para el partner..."
                          className={inputClass}
                        />
                        <button onClick={() => saveDealAdminNotes(deal.id)} className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-medium hover:opacity-90 transition-all shrink-0">
                          Guardar
                        </button>
                      </div>
                    )}
                    {/* Delivery Pipeline for won deals */}
                    {(deal.status === 'won' || deal.delivery_phase !== 'pending') && (
                      <DeliveryPipeline
                        phase={deal.delivery_phase}
                        deliveryType={deal.delivery_type}
                        phaseStartedAt={deal.phase_started_at}
                        phaseSlaDays={deal.phase_sla_days}
                        deliveryResponsible={deal.delivery_responsible}
                        deliveryNotes={deal.delivery_notes}
                        isAdmin
                        partners={partners.filter(p => p.status === 'approved').map(p => ({ user_id: p.user_id, contact_name: p.contact_name, company_name: p.company_name }))}
                        onPhaseChange={(phase) => updateDeliveryPhase(deal.id, phase)}
                        onTypeChange={(type) => updateDeliveryType(deal.id, type)}
                        onResponsibleChange={(uid) => updateDeliveryResponsible(deal.id, uid)}
                        onSlaChange={(days) => updateDeliverySla(deal.id, days)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ===== RESOURCES TAB ===== */}
          {activeTab === 'resources' && (
            <div>
              {showNewResource && (
                <div className="bg-card/50 border border-primary/20 rounded-xl p-6 mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-primary" /> Nuevo Recurso
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="Título *" value={newResource.title} onChange={(e) => setNewResource(p => ({ ...p, title: e.target.value }))} className={inputClass} />
                    <input type="text" placeholder="Descripción" value={newResource.description} onChange={(e) => setNewResource(p => ({ ...p, description: e.target.value }))} className={inputClass} />
                    <div className="relative">
                      <select value={newResource.category} onChange={(e) => setNewResource(p => ({ ...p, category: e.target.value as ResourceCategory }))} className={inputClass}>
                        {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <select value={newResource.min_level} onChange={(e) => setNewResource(p => ({ ...p, min_level: e.target.value as PartnerLevel }))} className={inputClass}>
                          <option value="authorized">Authorized</option>
                          <option value="gold">Gold</option>
                          <option value="platinum">Platinum</option>
                        </select>
                      </div>
                      <input type="text" placeholder="Tipo (pdf, pptx...)" value={newResource.file_type} onChange={(e) => setNewResource(p => ({ ...p, file_type: e.target.value }))} className={inputClass + ' w-32'} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={createResource} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all">Crear</button>
                    <button onClick={() => setShowNewResource(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
                  </div>
                </div>
              )}

              {filteredResources.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No se encontraron recursos</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredResources.map((resource) => (
                    <div key={resource.id} className="flex items-center gap-4 bg-card/50 border border-border rounded-xl px-5 py-3.5 hover:border-border transition-all">
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground truncate">{resource.title}</h3>
                        <p className="text-[11px] text-muted-foreground truncate">{resource.description}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase font-medium shrink-0">{categoryLabels[resource.category]}</span>
                      <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${levelBadge[resource.min_level].color}`}>
                        {levelBadge[resource.min_level].label}
                      </span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{resource.file_type?.toUpperCase()}</span>
                      <button onClick={() => deleteResource(resource.id)} className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== LEADS TAB ===== */}
          {activeTab === 'leads' && (
            <div className="space-y-3">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16">
                  <Send className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">No se encontraron leads</p>
                </div>
              ) : filteredLeads.map((lead) => {
                const assignedPartner = partners.find(p => p.user_id === lead.assigned_to);
                const approvedPartners = partners.filter(p => p.status === 'approved');
                const region = countryRegionMap[lead.country] || 'Otro';

                return (
                  <div key={lead.id} className="bg-card/50 border border-border rounded-xl overflow-hidden">
                    <div className="px-5 py-4">
                      <div className="flex items-start gap-4">
                        {/* Lead info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-foreground">{lead.full_name}</h3>
                            <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${leadStatusConfig[lead.status].color}`}>
                              {leadStatusConfig[lead.status].label}
                            </span>
                            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${lead.service_type === 'one_shot' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'}`}>
                              {lead.service_type === 'one_shot' ? 'One-shot' : 'Recurrente'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{lead.company_name}</span>
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.corporate_email}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.country} ({region})</span>
                            {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>}
                          </div>
                          <div className="flex items-center gap-3 mt-2 text-[11px]">
                            <span className="font-medium text-foreground">{serviceLabels[lead.service_slug] || lead.service_slug}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-foreground font-semibold">${(lead.estimated_value || 0).toLocaleString('en-US')} {lead.currency}/mes</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="flex items-center gap-1">
                              {lead.payment_method === 'card' ? <CreditCard className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                              {lead.payment_method === 'card' ? 'Tarjeta' : 'OC/Transferencia'}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{new Date(lead.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Status selector */}
                          <div className="relative">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                              className={selectClass}
                            >
                              <option value="new">Nuevo</option>
                              <option value="assigned">Asignado</option>
                              <option value="contacted">Contactado</option>
                              <option value="converted">Convertido</option>
                              <option value="discarded">Descartado</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                          </div>

                          {/* Auto-assign */}
                          <button
                            onClick={() => autoAssignLead(lead)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                            title="Auto-asignar por país"
                          >
                            <MapPin className="w-4 h-4" />
                          </button>

                          {/* Notes */}
                          <button
                            onClick={() => { setEditingLeadNotes(editingLeadNotes === lead.id ? null : lead.id); setLeadNoteText(lead.admin_notes || ''); }}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                            title="Notas"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Assigned to */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                        <span className="text-[10px] text-muted-foreground font-medium">Asignado a:</span>
                        {assignedPartner ? (
                          <span className="text-[11px] font-medium text-foreground">{assignedPartner.contact_name} — {assignedPartner.company_name}</span>
                        ) : (
                          <span className="text-[11px] text-muted-foreground/60 italic">Sin asignar</span>
                        )}
                        <div className="ml-auto relative">
                          <select
                            value={lead.assigned_to || ''}
                            onChange={(e) => e.target.value && assignLeadManually(lead.id, e.target.value)}
                            className={selectClass + ' text-[10px]'}
                          >
                            <option value="">Asignar manualmente...</option>
                            {approvedPartners.map(p => (
                              <option key={p.user_id} value={p.user_id}>{p.contact_name} ({p.company_name})</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Admin notes */}
                    {editingLeadNotes === lead.id && (
                      <div className="px-5 py-3 border-t border-border bg-muted/20">
                        <textarea
                          value={leadNoteText}
                          onChange={(e) => setLeadNoteText(e.target.value)}
                          placeholder="Notas del admin..."
                          className={inputClass + ' min-h-[60px] resize-none mb-2'}
                        />
                        <div className="flex gap-2">
                          <button onClick={() => saveLeadNotes(lead.id)} className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition-all">Guardar</button>
                          <button onClick={() => setEditingLeadNotes(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
                        </div>
                      </div>
                    )}
                    {lead.admin_notes && editingLeadNotes !== lead.id && (
                      <div className="px-5 py-2 border-t border-border/50 bg-muted/10">
                        <p className="text-[11px] text-muted-foreground"><span className="font-medium">Nota:</span> {lead.admin_notes}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
