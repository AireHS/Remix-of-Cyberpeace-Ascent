import { useMemo, useState } from 'react';
import {
  ChevronDown, Filter
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area, CartesianGrid
} from 'recharts';

type DealStatus = 'registered' | 'in_progress' | 'won' | 'lost' | 'expired';
type LeadStatus = 'new' | 'assigned' | 'contacted' | 'converted' | 'discarded';

interface PartnerProfile {
  id: string; user_id: string; company_name: string; contact_name: string;
  level: string; status: string; phone: string | null; country: string | null;
  created_at: string; is_company_rep: boolean;
}

interface Deal {
  id: string; partner_profile_id: string; company_name_partner: string;
  client_company: string; client_contact: string | null; client_email: string | null;
  deal_description: string; estimated_value: number | null; currency: string;
  status: DealStatus; notes: string | null; admin_notes: string | null;
  created_at: string; updated_at: string;
}

interface PricingLead {
  id: string; full_name: string; corporate_email: string; company_name: string;
  country: string; phone: string | null; service_slug: string; service_type: string;
  payment_method: string; estimated_value: number | null; currency: string;
  calculation_params: any; status: LeadStatus; assigned_to: string | null;
  admin_notes: string | null; created_at: string; updated_at: string;
}

interface AdminAnalyticsProps {
  partners: PartnerProfile[];
  deals: Deal[];
  leads: PricingLead[];
}

const countryRegionMap: Record<string, string> = {
  'México': 'LATAM Norte', 'Guatemala': 'LATAM Norte', 'Honduras': 'LATAM Norte',
  'El Salvador': 'LATAM Norte', 'Nicaragua': 'LATAM Norte', 'Costa Rica': 'LATAM Norte',
  'Panamá': 'LATAM Norte', 'República Dominicana': 'LATAM Norte',
  'Colombia': 'Andina', 'Ecuador': 'Andina', 'Perú': 'Andina',
  'Venezuela': 'Andina', 'Bolivia': 'Andina',
  'Chile': 'Cono Sur', 'Argentina': 'Cono Sur', 'Uruguay': 'Cono Sur', 'Paraguay': 'Cono Sur',
  'Brasil': 'Brasil', 'España': 'Europa', 'Estados Unidos': 'USA',
};

const fmt = (v: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(v);

const fmtK = (v: number) => {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}k`;
  return `$${v}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm">
      <p className="text-[11px] font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{typeof p.value === 'number' && p.value > 100 ? fmt(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

const AdminAnalytics = ({ partners, deals, leads }: AdminAnalyticsProps) => {
  const [countryFilter, setCountryFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState<'all' | '30d' | '90d' | '1y'>('all');

  const cutoffDate = useMemo(() => {
    if (periodFilter === 'all') return null;
    const d = new Date();
    if (periodFilter === '30d') d.setDate(d.getDate() - 30);
    else if (periodFilter === '90d') d.setDate(d.getDate() - 90);
    else d.setFullYear(d.getFullYear() - 1);
    return d;
  }, [periodFilter]);

  const filterByDate = <T extends { created_at: string }>(items: T[]) =>
    cutoffDate ? items.filter(i => new Date(i.created_at) >= cutoffDate) : items;

  const allCountries = useMemo(() => {
    const set = new Set<string>();
    partners.forEach(p => p.country && set.add(p.country));
    leads.forEach(l => l.country && set.add(l.country));
    return Array.from(set).sort();
  }, [partners, leads]);

  const fDeals = useMemo(() => {
    let d = filterByDate(deals);
    if (countryFilter !== 'all') {
      const partnerIds = partners.filter(p => p.country === countryFilter).map(p => p.id);
      d = d.filter(deal => partnerIds.includes(deal.partner_profile_id));
    }
    return d;
  }, [deals, partners, countryFilter, cutoffDate]);

  const fLeads = useMemo(() => {
    let l = filterByDate(leads);
    if (countryFilter !== 'all') l = l.filter(ld => ld.country === countryFilter);
    return l;
  }, [leads, countryFilter, cutoffDate]);

  const fPartners = useMemo(() => {
    let p = partners.filter(pp => pp.status === 'approved');
    if (countryFilter !== 'all') p = p.filter(pp => pp.country === countryFilter);
    return p;
  }, [partners, countryFilter]);

  // KPIs
  const totalPipeline = fDeals.filter(d => ['registered', 'in_progress'].includes(d.status)).reduce((s, d) => s + (d.estimated_value || 0), 0);
  const wonValue = fDeals.filter(d => d.status === 'won').reduce((s, d) => s + (d.estimated_value || 0), 0);
  const lostValue = fDeals.filter(d => d.status === 'lost').reduce((s, d) => s + (d.estimated_value || 0), 0);
  const openDeals = fDeals.filter(d => ['registered', 'in_progress'].includes(d.status)).length;
  const wonDeals = fDeals.filter(d => d.status === 'won').length;
  const closedDeals = fDeals.filter(d => ['won', 'lost'].includes(d.status)).length;
  const winRate = closedDeals > 0 ? Math.round((wonDeals / closedDeals) * 100) : 0;
  const webLeads = fLeads.length;
  const convertedLeads = fLeads.filter(l => l.status === 'converted').length;

  // Pipeline by status
  const pipelineByStatus = useMemo(() => {
    const statuses: { key: DealStatus; label: string; color: string }[] = [
      { key: 'registered', label: 'Registradas', color: 'hsl(215, 90%, 42%)' },
      { key: 'in_progress', label: 'En Progreso', color: '#eab308' },
      { key: 'won', label: 'Ganadas', color: '#22c55e' },
      { key: 'lost', label: 'Perdidas', color: '#ef4444' },
      { key: 'expired', label: 'Expiradas', color: '#94a3b8' },
    ];
    return statuses.map(s => ({
      ...s,
      count: fDeals.filter(d => d.status === s.key).length,
      value: fDeals.filter(d => d.status === s.key).reduce((sum, d) => sum + (d.estimated_value || 0), 0),
    })).filter(s => s.count > 0);
  }, [fDeals]);

  // Seller ranking
  const sellerRanking = useMemo(() => {
    const map = new Map<string, { name: string; company: string; country: string; dealsTotal: number; dealsWon: number; wonValue: number; webLeadsAssigned: number }>();
    fPartners.forEach(p => {
      map.set(p.id, { name: p.contact_name, company: p.company_name, country: p.country || '—', dealsTotal: 0, dealsWon: 0, wonValue: 0, webLeadsAssigned: 0 });
    });
    fDeals.forEach(d => {
      const entry = map.get(d.partner_profile_id);
      if (entry) {
        entry.dealsTotal++;
        if (d.status === 'won') { entry.dealsWon++; entry.wonValue += d.estimated_value || 0; }
      }
    });
    fLeads.forEach(l => {
      if (l.assigned_to) {
        const partner = fPartners.find(p => p.user_id === l.assigned_to);
        if (partner) { const entry = map.get(partner.id); if (entry) entry.webLeadsAssigned++; }
      }
    });
    return Array.from(map.values())
      .filter(e => e.dealsTotal > 0 || e.webLeadsAssigned > 0)
      .sort((a, b) => b.wonValue - a.wonValue || b.dealsWon - a.dealsWon);
  }, [fPartners, fDeals, fLeads]);

  // Country breakdown
  const countryBreakdown = useMemo(() => {
    const map = new Map<string, { deals: number; pipeline: number; won: number; leads: number; partners: number }>();
    const ensure = (c: string) => { if (!map.has(c)) map.set(c, { deals: 0, pipeline: 0, won: 0, leads: 0, partners: 0 }); };
    partners.filter(p => p.status === 'approved' && p.country).forEach(p => { ensure(p.country!); map.get(p.country!)!.partners++; });
    deals.forEach(d => {
      const partner = partners.find(p => p.id === d.partner_profile_id);
      const country = partner?.country || 'Sin país';
      ensure(country);
      const entry = map.get(country)!;
      entry.deals++;
      if (['registered', 'in_progress'].includes(d.status)) entry.pipeline += d.estimated_value || 0;
      if (d.status === 'won') entry.won += d.estimated_value || 0;
    });
    leads.forEach(l => { ensure(l.country); map.get(l.country)!.leads++; });
    return Array.from(map.entries())
      .map(([country, data]) => ({ country, region: countryRegionMap[country] || 'Otro', ...data }))
      .sort((a, b) => (b.pipeline + b.won) - (a.pipeline + a.won));
  }, [partners, deals, leads]);

  // Leads by service
  const leadsByService = useMemo(() => {
    const map = new Map<string, { count: number; value: number }>();
    fLeads.forEach(l => {
      const key = l.service_slug || 'Otro';
      if (!map.has(key)) map.set(key, { count: 0, value: 0 });
      const e = map.get(key)!;
      e.count++;
      e.value += l.estimated_value || 0;
    });
    return Array.from(map.entries()).map(([service, data]) => ({ service, ...data })).sort((a, b) => b.value - a.value);
  }, [fLeads]);

  // Monthly trend
  const monthlyTrend = useMemo(() => {
    const months = new Map<string, { month: string; pipeline: number; won: number; leads: number }>();
    const allItems = [
      ...fDeals.map(d => ({ date: d.created_at, value: d.estimated_value || 0, type: d.status === 'won' ? 'won' : 'pipeline' as string })),
      ...fLeads.map(l => ({ date: l.created_at, value: l.estimated_value || 0, type: 'lead' }))
    ];
    allItems.forEach(item => {
      const d = new Date(item.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('es', { month: 'short', year: '2-digit' });
      if (!months.has(key)) months.set(key, { month: label, pipeline: 0, won: 0, leads: 0 });
      const entry = months.get(key)!;
      if (item.type === 'won') entry.won += item.value;
      else if (item.type === 'lead') entry.leads += item.value;
      else entry.pipeline += item.value;
    });
    return Array.from(months.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([, v]) => v);
  }, [fDeals, fLeads]);

  return (
    <div className="space-y-8">
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">Dashboard Comercial</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Vista ejecutiva de pipeline, canales y rendimiento</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="relative">
            <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)}
              className="bg-card border border-border rounded-lg py-2 px-3 pr-8 text-[11px] font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer transition-all hover:border-primary/30">
              <option value="all">Todos los países</option>
              {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <select value={periodFilter} onChange={e => setPeriodFilter(e.target.value as any)}
              className="bg-card border border-border rounded-lg py-2 px-3 pr-8 text-[11px] font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer transition-all hover:border-primary/30">
              <option value="all">Todo el tiempo</option>
              <option value="30d">30 días</option>
              <option value="90d">90 días</option>
              <option value="1y">1 año</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pipeline Abierto', value: fmt(totalPipeline), detail: `${openDeals} oportunidades`, accent: 'border-l-primary' },
          { label: 'Revenue Cerrado', value: fmt(wonValue), detail: `${wonDeals} deals ganados`, accent: 'border-l-green-500' },
          { label: 'Win Rate', value: `${winRate}%`, detail: `${closedDeals} cerrados total`, accent: 'border-l-yellow-500' },
          { label: 'Leads Web', value: String(webLeads), detail: `${convertedLeads} convertidos`, accent: 'border-l-violet-500' },
        ].map(kpi => (
          <div key={kpi.label} className={`bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 border-l-[3px] ${kpi.accent} hover:shadow-md transition-shadow`}>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
            <p className="text-[26px] font-extrabold text-foreground leading-none mt-2 tracking-tight">{kpi.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1.5">{kpi.detail}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1: Trend + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-5">Evolución Mensual</p>
          {monthlyTrend.length === 0 ? (
            <div className="flex items-center justify-center h-[220px] text-xs text-muted-foreground">Sin datos suficientes</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="gPipeline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(215, 90%, 42%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(215, 90%, 42%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gWon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 84%)" strokeOpacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(220, 12%, 35%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 12%, 35%)' }} tickFormatter={fmtK} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="pipeline" name="Pipeline" stroke="hsl(215, 90%, 42%)" fill="url(#gPipeline)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="won" name="Ganado" stroke="#22c55e" fill="url(#gWon)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="lg:col-span-2 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-5">Distribución de Deals</p>
          {pipelineByStatus.length === 0 ? (
            <div className="flex items-center justify-center h-[220px] text-xs text-muted-foreground">Sin deals</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pipelineByStatus} dataKey="count" nameKey="label" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4} strokeWidth={0}>
                  {pipelineByStatus.map((entry) => (
                    <Cell key={entry.key} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [value, name]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Charts Row 2: Country + Leads by Service */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-5">Pipeline por País</p>
          {countryBreakdown.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-xs text-muted-foreground">Sin datos</div>
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(180, countryBreakdown.slice(0, 8).length * 38)}>
              <BarChart data={countryBreakdown.slice(0, 8)} layout="vertical" barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 84%)" strokeOpacity={0.4} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(220, 12%, 35%)' }} tickFormatter={fmtK} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="country" tick={{ fontSize: 11, fill: 'hsl(220, 12%, 35%)', fontWeight: 500 }} width={85} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pipeline" name="Pipeline" fill="hsl(215, 90%, 42%)" radius={[0, 6, 6, 0]} barSize={14} />
                <Bar dataKey="won" name="Ganado" fill="#22c55e" radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-5">Leads por Servicio</p>
          {leadsByService.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] text-xs text-muted-foreground">Sin leads</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={leadsByService} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 84%)" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="service" tick={{ fontSize: 10, fill: 'hsl(220, 12%, 35%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 12%, 35%)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Leads" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Seller Ranking */}
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Ranking de Vendedores</p>
          <span className="text-[10px] text-muted-foreground">{sellerRanking.length} activos</span>
        </div>

        {sellerRanking.length === 0 ? (
          <div className="flex items-center justify-center h-[120px] text-xs text-muted-foreground">Sin actividad registrada</div>
        ) : (
          <>
            {/* Chart */}
            {sellerRanking.length > 0 && (
              <div className="mb-5">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={sellerRanking.slice(0, 6).map(s => ({
                    name: s.name.split(' ')[0],
                    ganado: s.wonValue,
                    deals: s.dealsTotal,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 84%)" strokeOpacity={0.4} vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(220, 12%, 35%)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 12%, 35%)' }} tickFormatter={fmtK} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="ganado" name="Monto Ganado" fill="#22c55e" radius={[6, 6, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="bg-muted/40">
                    <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground">#</th>
                    <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground">Vendedor</th>
                    <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground hidden sm:table-cell">País</th>
                    <th className="text-center py-2.5 px-3 font-semibold text-muted-foreground">Ops</th>
                    <th className="text-center py-2.5 px-3 font-semibold text-muted-foreground">Ganadas</th>
                    <th className="text-right py-2.5 px-3 font-semibold text-muted-foreground">Monto</th>
                    <th className="text-center py-2.5 px-3 font-semibold text-muted-foreground">Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerRanking.map((seller, i) => (
                    <tr key={`${seller.name}-${i}`} className="border-t border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-2.5 px-3">
                        {i === 0 ? <span className="text-yellow-500 font-bold">1°</span> :
                         i === 1 ? <span className="text-muted-foreground font-bold">2°</span> :
                         i === 2 ? <span className="text-amber-600 font-bold">3°</span> :
                         <span className="text-muted-foreground">{i + 1}°</span>}
                      </td>
                      <td className="py-2.5 px-3">
                        <p className="font-semibold text-foreground">{seller.name}</p>
                        <p className="text-[10px] text-muted-foreground">{seller.company}</p>
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground hidden sm:table-cell">{seller.country}</td>
                      <td className="py-2.5 px-3 text-center font-semibold text-foreground">{seller.dealsTotal}</td>
                      <td className="py-2.5 px-3 text-center font-semibold text-green-600">{seller.dealsWon}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-foreground">{fmt(seller.wonValue)}</td>
                      <td className="py-2.5 px-3 text-center font-semibold text-violet-600">{seller.webLeadsAssigned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Open Opportunities */}
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Oportunidades Abiertas</p>
          <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{openDeals}</span>
        </div>
        {fDeals.filter(d => ['registered', 'in_progress'].includes(d.status)).length === 0 ? (
          <div className="flex items-center justify-center h-[80px] text-xs text-muted-foreground">Sin oportunidades abiertas</div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-muted/40">
                  <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground">Cliente</th>
                  <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground hidden md:table-cell">Partner</th>
                  <th className="text-left py-2.5 px-3 font-semibold text-muted-foreground hidden lg:table-cell">País</th>
                  <th className="text-center py-2.5 px-3 font-semibold text-muted-foreground">Estado</th>
                  <th className="text-right py-2.5 px-3 font-semibold text-muted-foreground">Monto</th>
                  <th className="text-right py-2.5 px-3 font-semibold text-muted-foreground">Días</th>
                </tr>
              </thead>
              <tbody>
                {fDeals
                  .filter(d => ['registered', 'in_progress'].includes(d.status))
                  .sort((a, b) => (b.estimated_value || 0) - (a.estimated_value || 0))
                  .map(d => {
                    const partner = partners.find(p => p.id === d.partner_profile_id);
                    const age = Math.round((Date.now() - new Date(d.created_at).getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={d.id} className="border-t border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-foreground">{d.client_company}</td>
                        <td className="py-2.5 px-3 text-muted-foreground hidden md:table-cell">{partner?.contact_name || '—'}</td>
                        <td className="py-2.5 px-3 text-muted-foreground hidden lg:table-cell">{partner?.country || '—'}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            d.status === 'registered' ? 'bg-primary/10 text-primary' : 'bg-yellow-500/10 text-yellow-600'
                          }`}>
                            {d.status === 'registered' ? 'Registrada' : 'En progreso'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-foreground">{d.estimated_value ? fmt(d.estimated_value, d.currency) : '—'}</td>
                        <td className="py-2.5 px-3 text-right text-muted-foreground">{age}d</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
