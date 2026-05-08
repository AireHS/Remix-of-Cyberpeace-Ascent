import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DeliveryPipeline from '@/components/DeliveryPipeline';
import { supabase } from '@/integrations/supabase/client';
import { 
  Shield, LogOut, BookOpen, Presentation, FileText, Award, 
  Target, Megaphone, GraduationCap, Swords, Download, Lock, 
  Search, ChevronRight, LayoutGrid, List, Star, Clock,
  Building2, User as UserIcon, TrendingUp, Briefcase,
  Plus, X, DollarSign, Mail, Phone, Settings
} from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import logoColor from '@/assets/logo-color.png';

type PartnerLevel = 'authorized' | 'gold' | 'platinum';
type ResourceCategory = 'sales_playbook' | 'storytelling' | 'presentations' | 'technical_guides' | 'case_studies' | 'marketing_materials' | 'certifications' | 'competitive_intelligence';
type DealStatus = 'registered' | 'in_progress' | 'won' | 'lost' | 'expired';

interface PartnerProfile {
  id: string;
  company_name: string;
  contact_name: string;
  level: PartnerLevel;
  status: string;
  phone: string | null;
  country: string | null;
  is_company_rep: boolean;
}

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: ResourceCategory;
  min_level: PartnerLevel;
  file_type: string | null;
  file_url: string | null;
  thumbnail_url: string | null;
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

const categoryConfig: Record<ResourceCategory, { label: string; icon: typeof BookOpen; color: string }> = {
  sales_playbook: { label: 'Sales Playbook', icon: Target, color: 'border-primary/20 text-primary' },
  storytelling: { label: 'Storytelling & History Selling', icon: BookOpen, color: 'border-primary/20 text-primary' },
  presentations: { label: 'Presentaciones', icon: Presentation, color: 'border-primary/20 text-primary' },
  technical_guides: { label: 'Guías Técnicas', icon: FileText, color: 'border-primary/20 text-primary' },
  case_studies: { label: 'Casos de Éxito', icon: Target, color: 'border-primary/20 text-primary' },
  marketing_materials: { label: 'Material de Marketing', icon: Megaphone, color: 'border-primary/20 text-primary' },
  certifications: { label: 'Certificaciones', icon: GraduationCap, color: 'border-primary/20 text-primary' },
  competitive_intelligence: { label: 'Inteligencia Competitiva', icon: Swords, color: 'border-primary/20 text-primary' },
};

const levelBadge: Record<PartnerLevel, { label: string; color: string; icon: typeof Shield }> = {
  authorized: { label: 'Authorized', color: 'bg-muted text-muted-foreground border-border', icon: Shield },
  gold: { label: 'Gold', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: Award },
  platinum: { label: 'Platinum', color: 'bg-primary/10 text-primary border-primary/20', icon: Star },
};

const levelOrder: Record<PartnerLevel, number> = { authorized: 0, gold: 1, platinum: 2 };

const dealStatusConfig: Record<DealStatus, { label: string; color: string }> = {
  registered: { label: 'Registrada', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  in_progress: { label: 'En Progreso', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  won: { label: 'Ganada', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
  lost: { label: 'Perdida', color: 'bg-destructive/10 text-destructive border-destructive/20' },
  expired: { label: 'Expirada', color: 'bg-muted text-muted-foreground border-border' },
};

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PartnerProfile | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'resources' | 'deals'>('resources');
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showNewDeal, setShowNewDeal] = useState(false);
  const [dealLoading, setDealLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // New deal form
  const [newDeal, setNewDeal] = useState({
    client_company: '',
    client_contact: '',
    client_email: '',
    deal_description: '',
    estimated_value: '',
    currency: 'USD',
    notes: '',
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/partner-login');
        return;
      }
      setUser(session.user);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/partner-login');
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [profileRes, resourcesRes, dealsRes, rolesRes] = await Promise.all([
        supabase.from('partner_profiles').select('*').eq('user_id', user.id).single(),
        supabase.from('partner_resources').select('*').order('created_at', { ascending: false }),
        supabase.from('deal_registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin'),
      ]);
      if (profileRes.data) setProfile(profileRes.data as unknown as PartnerProfile);
      if (resourcesRes.data) setResources(resourcesRes.data as unknown as Resource[]);
      if (dealsRes.data) setDeals(dealsRes.data as unknown as Deal[]);
      if (rolesRes.data && rolesRes.data.length > 0) setIsAdmin(true);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/partner-login');
  };

  const handleNewDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    if (!newDeal.client_company.trim() || !newDeal.deal_description.trim()) {
      toast.error('Completa los campos requeridos');
      return;
    }
    setDealLoading(true);
    const { data, error } = await supabase.from('deal_registrations').insert({
      partner_profile_id: profile.id,
      company_name_partner: profile.company_name,
      client_company: newDeal.client_company.trim(),
      client_contact: newDeal.client_contact.trim() || null,
      client_email: newDeal.client_email.trim() || null,
      deal_description: newDeal.deal_description.trim(),
      estimated_value: newDeal.estimated_value ? parseFloat(newDeal.estimated_value) : null,
      currency: newDeal.currency,
      notes: newDeal.notes.trim() || null,
    }).select();
    
    if (error) {
      toast.error('Error registrando oportunidad: ' + error.message);
    } else if (data) {
      setDeals(prev => [data[0] as unknown as Deal, ...prev]);
      setNewDeal({ client_company: '', client_contact: '', client_email: '', deal_description: '', estimated_value: '', currency: 'USD', notes: '' });
      setShowNewDeal(false);
      toast.success('Oportunidad registrada exitosamente');
    }
    setDealLoading(false);
  };

  const filteredResources = resources.filter((r) => {
    const matchCategory = activeCategory === 'all' || r.category === activeCategory;
    const matchSearch = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const isLocked = (minLevel: PartnerLevel) => {
    if (!profile) return true;
    return levelOrder[profile.level] < levelOrder[minLevel];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (profile?.status === 'pending') {
    return (
      <div className="min-h-screen bg-background">
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">Cuenta Pendiente de Aprobación</h1>
            <p className="text-muted-foreground text-sm mb-8">Tu registro está siendo revisado por nuestro equipo de Channel. Te notificaremos por email cuando tu cuenta sea aprobada.</p>
            <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  const resourcesByCategory = Object.entries(categoryConfig).map(([key, config]) => ({
    category: key as ResourceCategory,
    ...config,
    count: resources.filter(r => r.category === key).length,
  }));

  const inputClass = "w-full bg-card/50 border border-border rounded-xl py-2.5 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all";

  return (
    <div className="min-h-screen bg-background">
      {/* Portal Header Bar */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/" className="shrink-0">
              <img src={logoColor} alt="Cyberpeace" className="h-7" />
            </Link>
            <div className="h-5 w-px bg-border" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Partner Portal</span>
            {profile && (
              <div className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${levelBadge[profile.level].color}`}>
                {(() => { const Icon = levelBadge[profile.level].icon; return <Icon className="w-3 h-3" />; })()}
                {levelBadge[profile.level].label}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link to="/admin" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
                <Settings className="w-3.5 h-3.5" /> Admin
              </Link>
            )}
            <div className="text-right hidden sm:block">
              <p className="text-xs text-foreground font-medium">{profile?.contact_name}</p>
              <p className="text-[10px] text-muted-foreground">{profile?.company_name}</p>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Cerrar sesión">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Welcome */}
          <div className="mb-10">
            <h1 className="font-display font-extrabold text-3xl text-foreground mb-2">
              Hola, {profile?.contact_name?.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground text-sm">Accede a todos los recursos y materiales exclusivos para partners de Cyberpeace.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Briefcase, label: 'Recursos', value: resources.length.toString() },
              { icon: Target, label: 'Oportunidades', value: deals.length.toString() },
              { icon: TrendingUp, label: 'Tu Nivel', value: levelBadge[profile?.level || 'authorized'].label },
              { icon: Building2, label: 'Empresa', value: profile?.company_name || '' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/50 border border-border rounded-xl p-4">
                <stat.icon className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tab Toggle */}
          <div className="flex mb-8 bg-muted/30 rounded-xl p-1 max-w-xs">
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'resources' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Recursos
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'deals' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Target className="w-4 h-4" /> Oportunidades
            </button>
          </div>

          {activeTab === 'resources' ? (
            /* ===== RESOURCES TAB ===== */
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <div className="lg:w-64 shrink-0">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-3">Categorías</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      activeCategory === 'all' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Todos los Recursos
                    <span className="ml-auto text-[10px] opacity-60">{resources.length}</span>
                  </button>
                  {resourcesByCategory.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.category}
                        onClick={() => setActiveCategory(cat.category)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                          activeCategory === cat.category ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="truncate">{cat.label}</span>
                        <span className="ml-auto text-[10px] opacity-60">{cat.count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                    <input
                      type="text"
                      placeholder="Buscar recursos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-card/50 border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
                    />
                  </div>
                  <div className="flex bg-card/50 border border-border rounded-xl p-1">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {filteredResources.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-sm">No se encontraron recursos</p>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredResources.map((resource) => {
                      const config = categoryConfig[resource.category];
                      const locked = isLocked(resource.min_level);
                      const Icon = config.icon;
                      return (
                        <div key={resource.id} className={`group relative bg-card/50 border border-border rounded-xl p-5 transition-all duration-300 ${locked ? 'opacity-50' : 'hover:border-primary/30 hover:shadow-sm cursor-pointer'}`}>
                          {locked && <div className="absolute top-3 right-3"><Lock className="w-4 h-4 text-muted-foreground" /></div>}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-9 h-9 rounded-lg bg-primary/[0.06] flex items-center justify-center">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="inline-block text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{resource.file_type?.toUpperCase()}</span>
                              <h3 className="text-sm font-semibold text-foreground leading-snug">{resource.title}</h3>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${levelBadge[resource.min_level].color}`}>{levelBadge[resource.min_level].label}</span>
                            {!locked && <button className="flex items-center gap-1 text-[11px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"><Download className="w-3 h-3" /> Descargar</button>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredResources.map((resource) => {
                      const config = categoryConfig[resource.category];
                      const locked = isLocked(resource.min_level);
                      const Icon = config.icon;
                      return (
                        <div key={resource.id} className={`group flex items-center gap-4 bg-card/50 border border-border rounded-xl px-5 py-3.5 transition-all ${locked ? 'opacity-50' : 'hover:border-primary/30 cursor-pointer'}`}>
                          <div className="w-8 h-8 rounded-lg bg-primary/[0.06] flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-primary" /></div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-foreground truncate">{resource.title}</h3>
                            <p className="text-[11px] text-muted-foreground truncate">{resource.description}</p>
                          </div>
                          <span className="text-[10px] text-muted-foreground uppercase font-medium shrink-0">{resource.file_type}</span>
                          <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${levelBadge[resource.min_level].color}`}>{levelBadge[resource.min_level].label}</span>
                          {locked ? <Lock className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ===== DEALS TAB ===== */
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Registro de Oportunidades</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {profile?.is_company_rep ? 'Ves todas las oportunidades de tu empresa' : 'Tus oportunidades registradas'}
                  </p>
                </div>
                <button
                  onClick={() => setShowNewDeal(true)}
                  className="bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Nueva Oportunidad
                </button>
              </div>

              {/* New Deal Modal */}
              {showNewDeal && (
                <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-background border border-border rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-foreground">Registrar Oportunidad</h3>
                      <button onClick={() => setShowNewDeal(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form onSubmit={handleNewDeal} className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-foreground mb-1.5 block">Empresa del Cliente *</label>
                        <input type="text" value={newDeal.client_company} onChange={(e) => setNewDeal(p => ({ ...p, client_company: e.target.value }))} required className={inputClass} placeholder="Nombre de la empresa cliente" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">Contacto</label>
                          <input type="text" value={newDeal.client_contact} onChange={(e) => setNewDeal(p => ({ ...p, client_contact: e.target.value }))} className={inputClass} placeholder="Nombre del contacto" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">Email</label>
                          <input type="email" value={newDeal.client_email} onChange={(e) => setNewDeal(p => ({ ...p, client_email: e.target.value }))} className={inputClass} placeholder="email@empresa.com" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-foreground mb-1.5 block">Descripción de la Oportunidad *</label>
                        <textarea value={newDeal.deal_description} onChange={(e) => setNewDeal(p => ({ ...p, deal_description: e.target.value }))} required rows={3} className={inputClass + ' resize-none'} placeholder="Describe la oportunidad, servicios requeridos, contexto..." />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">Valor Estimado</label>
                          <input type="number" step="0.01" min="0" value={newDeal.estimated_value} onChange={(e) => setNewDeal(p => ({ ...p, estimated_value: e.target.value }))} className={inputClass} placeholder="50000" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-foreground mb-1.5 block">Moneda</label>
                          <select value={newDeal.currency} onChange={(e) => setNewDeal(p => ({ ...p, currency: e.target.value }))} className={inputClass}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="MXN">MXN</option>
                            <option value="CLP">CLP</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-foreground mb-1.5 block">Notas Adicionales</label>
                        <textarea value={newDeal.notes} onChange={(e) => setNewDeal(p => ({ ...p, notes: e.target.value }))} rows={2} className={inputClass + ' resize-none'} placeholder="Notas internas..." />
                      </div>
                      <button type="submit" disabled={dealLoading} className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20">
                        {dealLoading ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <>Registrar Oportunidad <ChevronRight className="w-4 h-4" /></>}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Deals List */}
              {deals.length === 0 ? (
                <div className="text-center py-20 border border-border/50 rounded-2xl bg-card/20">
                  <Target className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm mb-1">No hay oportunidades registradas</p>
                  <p className="text-muted-foreground/60 text-xs">Registra tu primera oportunidad para hacer seguimiento</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {deals.map((deal) => {
                    const statusConf = dealStatusConfig[deal.status];
                    return (
                      <div key={deal.id} className="bg-card/50 border border-border rounded-xl p-5 hover:border-border hover:shadow-sm transition-all">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-sm font-semibold text-foreground">{deal.client_company}</h3>
                              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusConf.color}`}>
                                {statusConf.label}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{deal.deal_description}</p>
                          </div>
                          {deal.estimated_value && (
                            <div className="text-right shrink-0">
                              <p className="text-sm font-bold text-foreground">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: deal.currency }).format(deal.estimated_value)}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                          {deal.client_contact && (
                            <span className="flex items-center gap-1"><UserIcon className="w-3 h-3" />{deal.client_contact}</span>
                          )}
                          {deal.client_email && (
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{deal.client_email}</span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(deal.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                          {profile?.is_company_rep && deal.company_name_partner && (
                            <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{deal.company_name_partner}</span>
                          )}
                        </div>
                        {deal.admin_notes && (
                          <div className="mt-3 p-3 bg-primary/[0.04] border border-primary/10 rounded-lg">
                            <p className="text-[11px] text-primary font-medium mb-0.5">Nota del equipo Cyberpeace:</p>
                            <p className="text-xs text-muted-foreground">{deal.admin_notes}</p>
                          </div>
                        )}
                        {/* Delivery Pipeline (read-only for partners) */}
                        {deal.status === 'won' && deal.delivery_phase !== 'pending' && (
                          <DeliveryPipeline
                            phase={deal.delivery_phase}
                            deliveryType={deal.delivery_type}
                            phaseStartedAt={deal.phase_started_at}
                            phaseSlaDays={deal.phase_sla_days}
                            deliveryResponsible={deal.delivery_responsible}
                            deliveryNotes={deal.delivery_notes}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PartnerDashboard;
