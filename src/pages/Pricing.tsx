import { useState, useMemo, useCallback } from 'react';
import { ArrowRight, Shield, AlertTriangle, Crosshair, Eye, Scale, Calculator, ChevronDown, ChevronRight, Check, X, CreditCard, FileText, Send, Clock, Zap, Minus, Package, Plus, ShoppingCart, Server, Monitor } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const accent = {
  gradient: 'from-[hsl(215_80%_55%)] to-[hsl(200_70%_50%)]',
  text: 'text-[hsl(215_80%_55%)]',
  bg: 'bg-[hsl(215_80%_55%)]',
  bgLight: 'bg-[hsl(215_80%_55%/0.08)]',
  border: 'border-[hsl(215_80%_55%/0.2)]',
};

/* ═══ Corporate email validation ═══ */
const publicDomains = [
  'gmail.com','googlemail.com','hotmail.com','outlook.com','live.com','msn.com',
  'yahoo.com','yahoo.es','yahoo.com.mx','ymail.com','aol.com','protonmail.com',
  'proton.me','icloud.com','me.com','mac.com','mail.com','zoho.com','gmx.com',
  'gmx.es','tutanota.com','inbox.com','fastmail.com','hey.com',
  'mailinator.com','10minutemail.com','temp-mail.org','yopmail.com','guerrillamail.com',
  'throwawaymail.com','fakemail.net'
];

const isCorporateEmail = (email: string) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain && !publicDomains.includes(domain);
};

const countries = [
  'México','Colombia','Chile','Perú','Argentina','Brasil','Ecuador','Panamá',
  'Costa Rica','Guatemala','República Dominicana','Uruguay','Paraguay','Bolivia',
  'Honduras','El Salvador','Nicaragua','Venezuela','España','Estados Unidos','Otro',
];

/* ═══ Service definitions ═══ */
type ServiceParam = {
  id: string;
  label: string;
  type: 'select';
  options?: { label: string; value: number; multiplier: number }[];
};

type ServiceConfig = {
  id: string;
  icon: React.ElementType;
  label: string;
  shortLabel: string;
  desc: string;
  href: string;
  basePrice: number;
  params: ServiceParam[];
  inHouseMultiplier: number;
  color: string;
  defaultServiceType: 'one_shot' | 'recurring';
};

const services: ServiceConfig[] = [
  {
    id: 'soc360',
    icon: Shield,
    label: 'SOC / MDR',
    shortLabel: 'SOC/MDR',
    desc: 'Detección, investigación y respuesta 24/7 con Threat Hunting activo y Threat Intelligence.',
    href: '/soc-360',
    basePrice: 8500,
    inHouseMultiplier: 6.2,
    color: 'hsl(215 80% 55%)',
    defaultServiceType: 'recurring',
    params: [
      { id: 'siem_xdr', label: '¿Tiene SIEM / XDR?', type: 'select', options: [
        { label: 'Ya tengo SIEM/XDR', value: 1, multiplier: 1 },
        { label: 'Necesito uno (incluido)', value: 2, multiplier: 1.4 },
        { label: 'No estoy seguro', value: 3, multiplier: 1.2 },
      ]},
      { id: 'deployment', label: 'Despliegue', type: 'select', options: [
        { label: 'Cloud del fabricante (SaaS)', value: 1, multiplier: 1 },
        { label: 'On-premise / infraestructura propia', value: 2, multiplier: 1.3 },
        { label: 'Híbrido', value: 3, multiplier: 1.15 },
      ]},
      { id: 'endpoints', label: 'Endpoints', type: 'select', options: [
        { label: '1–100', value: 100, multiplier: 1 },
        { label: '101–500', value: 500, multiplier: 2.8 },
        { label: '501–1,000', value: 1000, multiplier: 4.5 },
        { label: '1,001–5,000', value: 5000, multiplier: 8 },
        { label: '5,001–10,000', value: 10000, multiplier: 14 },
        { label: '+10,000', value: 15000, multiplier: 20 },
      ]},
      { id: 'sources', label: 'Fuentes a integrar', type: 'select', options: [
        { label: '1–10', value: 10, multiplier: 1 },
        { label: '11–50', value: 50, multiplier: 1.5 },
        { label: '51–100', value: 100, multiplier: 2.2 },
        { label: '+100', value: 200, multiplier: 3 },
      ]},
      { id: 'eps', label: 'Volumen aprox. (EPS o GB/día)', type: 'select', options: [
        { label: 'No lo sé / estimar', value: 0, multiplier: 1 },
        { label: '< 500 EPS / < 5 GB/día', value: 1, multiplier: 1 },
        { label: '500–2,000 EPS / 5–20 GB/día', value: 2, multiplier: 1.4 },
        { label: '2,000–10,000 EPS / 20–100 GB/día', value: 3, multiplier: 2.2 },
        { label: '+10,000 EPS / +100 GB/día', value: 4, multiplier: 3.5 },
      ]},
      { id: 'coverage', label: 'Cobertura', type: 'select', options: [
        { label: '8×5', value: 1, multiplier: 1 },
        { label: '12×5', value: 2, multiplier: 1.4 },
        { label: '24×7', value: 3, multiplier: 2 },
      ]},
      { id: 'retention_hot', label: 'Retención en caliente (meses)', type: 'select', options: [
        { label: '1 mes', value: 1, multiplier: 0.8 },
        { label: '3 meses (recomendado)', value: 3, multiplier: 1 },
        { label: '6 meses', value: 6, multiplier: 1.3 },
        { label: '12 meses', value: 12, multiplier: 1.8 },
      ]},
      { id: 'retention_cold', label: 'Retención en frío (meses)', type: 'select', options: [
        { label: '3 meses', value: 3, multiplier: 0.8 },
        { label: '8 meses (cumplimiento)', value: 8, multiplier: 1 },
        { label: '12 meses', value: 12, multiplier: 1.2 },
        { label: '24 meses', value: 24, multiplier: 1.5 },
        { label: '36 meses', value: 36, multiplier: 1.8 },
      ]},
    ],
  },
  {
    id: 'brand',
    icon: Eye,
    label: 'Brand Protection',
    shortLabel: 'Brand',
    desc: 'Protección de marca, monitoreo de fraude y Dark Web.',
    href: '/brand-protection',
    basePrice: 3500,
    inHouseMultiplier: 4.2,
    color: 'hsl(35 80% 55%)',
    defaultServiceType: 'recurring',
    params: [
      { id: 'domains', label: 'Dominios', type: 'select', options: [
        { label: '1–3', value: 3, multiplier: 1 },
        { label: '4–10', value: 10, multiplier: 2 },
        { label: '11–25', value: 25, multiplier: 3.5 },
        { label: '+25', value: 50, multiplier: 5 },
      ]},
      { id: 'darkweb', label: 'Dark Web', type: 'select', options: [
        { label: 'Básico', value: 1, multiplier: 1 },
        { label: 'Avanzado (+ deep web)', value: 2, multiplier: 1.6 },
      ]},
      { id: 'takedown', label: 'Takedowns', type: 'select', options: [
        { label: 'Hasta 5/mes', value: 1, multiplier: 1 },
        { label: 'Ilimitado', value: 2, multiplier: 1.8 },
      ]},
    ],
  },
  {
    id: 'ir',
    icon: AlertTriangle,
    label: 'Respuesta a Incidentes',
    shortLabel: 'CPCSIRT',
    desc: 'Contención, DFIR y recuperación ante incidentes de seguridad.',
    href: '/cpcsirt',
    basePrice: 5000,
    inHouseMultiplier: 5.5,
    color: 'hsl(0 70% 55%)',
    defaultServiceType: 'recurring',
    params: [
      { id: 'retainer', label: 'Retainer', type: 'select', options: [
        { label: 'On-demand', value: 0, multiplier: 1 },
        { label: 'Básico (40h/año)', value: 1, multiplier: 2.5 },
        { label: 'Avanzado (100h/año)', value: 2, multiplier: 5 },
        { label: 'Premium (ilimitado)', value: 3, multiplier: 9 },
      ]},
      { id: 'sla', label: 'SLA', type: 'select', options: [
        { label: 'Best effort', value: 0, multiplier: 1 },
        { label: '4 horas', value: 1, multiplier: 1.3 },
        { label: '2 horas', value: 2, multiplier: 1.6 },
        { label: '1 hora', value: 3, multiplier: 2 },
      ]},
    ],
  },
  {
    id: 'offensive',
    icon: Crosshair,
    label: 'Servicios Ofensivos',
    shortLabel: 'Ofensivos',
    desc: 'Pentesting, análisis de código, red teaming y evaluaciones regulatorias.',
    href: '/red-teaming',
    basePrice: 6000,
    inHouseMultiplier: 4.8,
    color: 'hsl(0 65% 50%)',
    defaultServiceType: 'one_shot',
    params: [
      { id: 'service', label: 'Tipo', type: 'select', options: [
        { label: 'Pentesting infraestructura', value: 1, multiplier: 1 },
        { label: 'Pentesting apps web', value: 2, multiplier: 1.2 },
        { label: 'Pentesting apps móviles', value: 3, multiplier: 1.4 },
        { label: 'SAST (código estático)', value: 4, multiplier: 0.9 },
        { label: 'DAST (código dinámico)', value: 5, multiplier: 1.1 },
        { label: 'Red Teaming completo', value: 6, multiplier: 3 },
        { label: 'Regulatorio (PCI, SOX)', value: 7, multiplier: 1.5 },
      ]},
      { id: 'scope', label: 'Alcance', type: 'select', options: [
        { label: '1–3 activos', value: 1, multiplier: 1 },
        { label: '4–10 activos', value: 2, multiplier: 2.5 },
        { label: '11–25 activos', value: 3, multiplier: 4 },
        { label: '+25 activos', value: 4, multiplier: 6 },
      ]},
    ],
  },
  {
    id: 'msp',
    icon: Server,
    label: 'Seguridad Gestionada',
    shortLabel: 'Seg. Gestionada',
    desc: 'Administración de firewalls, WAF, proxies, NAC y plataformas de seguridad.',
    href: '/contacto',
    basePrice: 5500,
    inHouseMultiplier: 4.8,
    color: 'hsl(260 45% 55%)',
    defaultServiceType: 'recurring',
    params: [
      { id: 'devices_msp', label: 'Dispositivos gestionados', type: 'select', options: [
        { label: '1–10', value: 10, multiplier: 1 },
        { label: '11–30', value: 30, multiplier: 2 },
        { label: '31–100', value: 100, multiplier: 4 },
        { label: '+100', value: 200, multiplier: 7 },
      ]},
      { id: 'platform_type', label: 'Tipo de plataformas', type: 'select', options: [
        { label: 'Firewalls / NGFW', value: 1, multiplier: 1 },
        { label: 'WAF + Firewalls', value: 2, multiplier: 1.4 },
        { label: 'Full stack (FW + WAF + Proxy + NAC)', value: 3, multiplier: 2 },
        { label: 'Custom (múltiples vendors)', value: 4, multiplier: 2.5 },
      ]},
      { id: 'change_mgmt', label: 'Gestión de cambios', type: 'select', options: [
        { label: 'Básica (hasta 10/mes)', value: 1, multiplier: 1 },
        { label: 'Estándar (hasta 30/mes)', value: 2, multiplier: 1.3 },
        { label: 'Ilimitada', value: 3, multiplier: 1.8 },
      ]},
      { id: 'coverage_msp', label: 'Cobertura', type: 'select', options: [
        { label: '8×5', value: 1, multiplier: 1 },
        { label: '12×5', value: 2, multiplier: 1.3 },
        { label: '24×7', value: 3, multiplier: 1.8 },
      ]},
    ],
  },
  {
    id: 'grc',
    icon: Scale,
    label: 'GRC y Cumplimiento',
    shortLabel: 'GRC',
    desc: 'Evaluación de riesgo, madurez y cumplimiento normativo.',
    href: '/compliance',
    basePrice: 4000,
    inHouseMultiplier: 3.8,
    color: 'hsl(215 15% 50%)',
    defaultServiceType: 'recurring',
    params: [
      { id: 'framework', label: 'Frameworks', type: 'select', options: [
        { label: '1 framework', value: 1, multiplier: 1 },
        { label: '2–3 frameworks', value: 2, multiplier: 2 },
        { label: '4+ frameworks', value: 3, multiplier: 3.5 },
      ]},
      { id: 'maturity', label: 'Assessment madurez', type: 'select', options: [
        { label: 'No incluido', value: 0, multiplier: 1 },
        { label: 'Único', value: 1, multiplier: 1.3 },
        { label: 'Recurrente', value: 2, multiplier: 1.8 },
      ]},
    ],
  },
  {
    id: 'noc',
    icon: Monitor,
    label: 'NOC',
    shortLabel: 'NOC',
    desc: 'Monitoreo de red, disponibilidad, gestión de incidencias de infraestructura y escalamiento.',
    href: '/contacto',
    basePrice: 4000,
    inHouseMultiplier: 4.0,
    color: 'hsl(180 50% 45%)',
    defaultServiceType: 'recurring',
    params: [
      { id: 'devices_noc', label: 'Dispositivos monitoreados', type: 'select', options: [
        { label: '1–25', value: 25, multiplier: 1 },
        { label: '26–100', value: 100, multiplier: 2.2 },
        { label: '101–500', value: 500, multiplier: 4.5 },
        { label: '+500', value: 1000, multiplier: 8 },
      ]},
      { id: 'sites', label: 'Sitios / localidades', type: 'select', options: [
        { label: '1–3', value: 3, multiplier: 1 },
        { label: '4–10', value: 10, multiplier: 1.5 },
        { label: '11–30', value: 30, multiplier: 2.5 },
        { label: '+30', value: 50, multiplier: 4 },
      ]},
      { id: 'coverage_noc', label: 'Cobertura', type: 'select', options: [
        { label: '8×5', value: 1, multiplier: 1 },
        { label: '12×5', value: 2, multiplier: 1.3 },
        { label: '24×7', value: 3, multiplier: 1.8 },
      ]},
      { id: 'sla_noc', label: 'SLA de respuesta', type: 'select', options: [
        { label: 'Best effort', value: 0, multiplier: 1 },
        { label: '30 minutos', value: 1, multiplier: 1.3 },
        { label: '15 minutos', value: 2, multiplier: 1.6 },
      ]},
    ],
  },
];

/* ═══ Feature comparison data ═══ */
const comparisonFeatures = [
  { feature: 'Threat Detection & Response 24/7', soc360: true, noc: false, msp: false, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Threat Hunting activo', soc360: true, noc: false, msp: false, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Threat Intelligence operacional', soc360: true, noc: false, msp: false, brand: false, ir: true, offensive: false, grc: false },
  { feature: 'Ingeniería de Detección', soc360: true, noc: false, msp: false, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Investigación y Triage', soc360: true, noc: false, msp: false, brand: false, ir: true, offensive: false, grc: false },
  { feature: 'Contención y Respuesta', soc360: true, noc: false, msp: false, brand: false, ir: true, offensive: false, grc: false },
  { feature: 'Monitoreo de red y disponibilidad', soc360: false, noc: true, msp: false, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Gestión de incidencias de infra', soc360: false, noc: true, msp: false, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Escalamiento y SLA de red', soc360: false, noc: true, msp: false, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Admin. de firewalls / NGFW', soc360: false, noc: false, msp: true, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Administración WAF', soc360: false, noc: false, msp: true, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Gestión de cambios de seguridad', soc360: false, noc: false, msp: true, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Multi-vendor management', soc360: false, noc: false, msp: true, brand: false, ir: false, offensive: false, grc: false },
  { feature: 'Retainer de Incident Response', soc360: false, noc: false, msp: false, brand: false, ir: true, offensive: false, grc: false },
  { feature: 'DFIR (Digital Forensics)', soc360: false, noc: false, msp: false, brand: false, ir: true, offensive: false, grc: false },
  { feature: 'Protección de marca digital', soc360: false, noc: false, msp: false, brand: true, ir: false, offensive: false, grc: false },
  { feature: 'Monitoreo Dark Web', soc360: false, noc: false, msp: false, brand: true, ir: false, offensive: false, grc: false },
  { feature: 'Takedown de amenazas', soc360: false, noc: false, msp: false, brand: true, ir: false, offensive: false, grc: false },
  { feature: 'Pentesting & Red Teaming', soc360: false, noc: false, msp: false, brand: false, ir: false, offensive: true, grc: false },
  { feature: 'Análisis de código (SAST/DAST)', soc360: false, noc: false, msp: false, brand: false, ir: false, offensive: true, grc: false },
  { feature: 'Pentesting de apps móviles', soc360: false, noc: false, msp: false, brand: false, ir: false, offensive: true, grc: false },
  { feature: 'Cumplimiento normativo', soc360: false, noc: false, msp: false, brand: false, ir: false, offensive: false, grc: true },
  { feature: 'Assessment de madurez', soc360: false, noc: false, msp: false, brand: false, ir: false, offensive: false, grc: true },
  { feature: 'Riesgo de terceros', soc360: false, noc: false, msp: false, brand: false, ir: false, offensive: false, grc: true },
];

const comparisonColumns = [
  { key: 'soc360', label: 'SOC/MDR', highlight: false },
  { key: 'brand', label: 'Brand', highlight: false },
  { key: 'ir', label: 'CPCSIRT', highlight: false },
  { key: 'offensive', label: 'Ofensivos', highlight: false },
  { key: 'msp', label: 'Seg. Gestionada', highlight: false },
  { key: 'grc', label: 'GRC', highlight: false },
  { key: 'noc', label: 'NOC', highlight: false },
] as const;

/* ═══ Helper: compute cost for a service ═══ */
function computeCost(service: ServiceConfig, values: Record<string, number>) {
  let multiplier = 1;
  service.params.forEach(p => {
    if (p.options) {
      const selected = p.options[values[p.id] || 0];
      if (selected) multiplier *= selected.multiplier;
    }
  });
  const managed = Math.round(service.basePrice * multiplier);
  const inHouse = Math.round(managed * service.inHouseMultiplier);
  const savings = Math.round(((inHouse - managed) / inHouse) * 100);
  return { managed, inHouse, savings };
}

/* ═══ Bundle lead form ═══ */
interface BundleLeadFormProps {
  enabledServices: { service: ServiceConfig; cost: number; params: Record<string, number> }[];
  totalCost: number;
  onClose: () => void;
}

const BundleLeadForm = ({ enabledServices, totalCost, onClose }: BundleLeadFormProps) => {
  const [form, setForm] = useState({
    full_name: '',
    corporate_email: '',
    company_name: '',
    country: '',
    phone: '',
    payment_method: 'transfer_oc' as 'card' | 'transfer_oc',
    service_type: (enabledServices.length > 1 ? 'recurring' : enabledServices[0]?.service.defaultServiceType || 'recurring') as 'one_shot' | 'recurring',
  });
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (email: string) => {
    setForm(prev => ({ ...prev, corporate_email: email }));
    if (email && email.includes('@')) {
      setEmailError(isCorporateEmail(email) ? '' : 'Por favor ingresa un email corporativo (no Gmail, Hotmail, etc.)');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCorporateEmail(form.corporate_email)) {
      setEmailError('Por favor ingresa un email corporativo');
      return;
    }
    setSubmitting(true);
    try {
      const slug = enabledServices.map(s => s.service.id).join('+');
      const allParams: Record<string, any> = {};
      enabledServices.forEach(s => { allParams[s.service.id] = s.params; });

      // [!] ATENCIÓN DE SEGURIDAD (CWE-602): Igual que en el Checkout, el valor de 'totalCost' (enviado
      // como 'estimated_value') no debe provenir directamente del cliente para no sufrir de alteración de
      // precios por atacantes. Lo recomendable es crear una Supabase Edge Function que tome los servicios
      // y parámetros para insertar el lead con los costos validados y un token de CAPTCHA integrado.
      const { error } = await supabase.from('pricing_leads').insert({
        full_name: form.full_name,
        corporate_email: form.corporate_email,
        company_name: form.company_name,
        country: form.country,
        phone: form.phone || null,
        service_slug: slug,
        service_type: form.service_type as any,
        payment_method: form.payment_method as any,
        estimated_value: totalCost,
        currency: 'USD',
        calculation_params: allParams as any,
      });
      if (error) throw error;
      toast.success('¡Solicitud enviada! Nos pondremos en contacto pronto.');
      onClose();
    } catch (err: any) {
      toast.error('Error al enviar la solicitud. Intenta de nuevo.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = form.full_name && form.corporate_email && form.company_name && form.country && !emailError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="font-semibold text-foreground text-lg">Solicitar cotización</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {enabledServices.length} servicio{enabledServices.length > 1 ? 's' : ''} — ${totalCost.toLocaleString('en-US')} USD/mes estimado
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><X size={18} /></button>
        </div>

        {/* Services summary */}
        <div className="px-6 pt-4 space-y-2">
          {enabledServices.map(({ service, cost }) => (
            <div key={service.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/50">
              <service.icon size={14} style={{ color: service.color }} />
              <span className="text-xs font-medium text-foreground flex-1">{service.label}</span>
              <span className="text-xs font-bold text-foreground">${cost.toLocaleString('en-US')}</span>
            </div>
          ))}
          {enabledServices.length >= 3 && (
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold px-2">
              <Package size={12} />
              Paquete combinado — descuento aplicado
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Nombre completo *</label>
            <input required className="w-full bg-muted/40 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" value={form.full_name} onChange={e => setForm(prev => ({ ...prev, full_name: e.target.value }))} placeholder="Tu nombre" />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Email corporativo *</label>
            <input required type="email" className={`w-full bg-muted/40 border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${emailError ? 'border-destructive' : 'border-border focus:border-primary/40'}`} value={form.corporate_email} onChange={e => handleEmailChange(e.target.value)} placeholder="nombre@tuempresa.com" />
            {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Empresa *</label>
              <input required className="w-full bg-muted/40 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" value={form.company_name} onChange={e => setForm(prev => ({ ...prev, company_name: e.target.value }))} placeholder="Tu empresa" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">País *</label>
              <div className="relative">
                <select required className="w-full appearance-none bg-muted/40 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground pr-8 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" value={form.country} onChange={e => setForm(prev => ({ ...prev, country: e.target.value }))}>
                  <option value="">País</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Teléfono</label>
            <input className="w-full bg-muted/40 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} placeholder="+52 55 1234 5678" />
          </div>

          {/* Service type + Payment */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Tipo *</label>
              <div className="grid grid-cols-2 gap-2">
                {(['one_shot', 'recurring'] as const).map(t => (
                  <button key={t} type="button" onClick={() => setForm(prev => ({ ...prev, service_type: t }))}
                    className={`flex items-center gap-1.5 p-2 rounded-lg border text-left transition-all text-[11px] ${form.service_type === t ? `${accent.border} ${accent.bgLight}` : 'border-border'}`}>
                    {t === 'one_shot' ? <Zap size={12} /> : <Clock size={12} />}
                    {t === 'one_shot' ? 'One-shot' : 'Recurrente'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Pago *</label>
              <div className="grid grid-cols-2 gap-2">
                {(['card', 'transfer_oc'] as const).map(p => (
                  <button key={p} type="button" onClick={() => setForm(prev => ({ ...prev, payment_method: p }))}
                    className={`flex items-center gap-1.5 p-2 rounded-lg border text-left transition-all text-[11px] ${form.payment_method === p ? `${accent.border} ${accent.bgLight}` : 'border-border'}`}>
                    {p === 'card' ? <CreditCard size={12} /> : <FileText size={12} />}
                    {p === 'card' ? 'Tarjeta' : 'OC/Transfer'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" disabled={!isValid || submitting}
            className={`w-full flex items-center justify-center gap-2 ${accent.bg} text-white py-3 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[hsl(215_80%_55%/0.25)]`}>
            {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={14} /> Enviar cotización</>}
          </button>

          <p className="text-[10px] text-muted-foreground/60 text-center">
            Al enviar, aceptas que un especialista te contacte para una cotización personalizada.
          </p>
        </form>
      </div>
    </div>
  );
};

/* ═══ Main Pricing Page ═══ */
const Pricing = () => {
  const navigate = useNavigate();
  const [enabledServices, setEnabledServices] = useState<Record<string, boolean>>({ soc360: true });
  const [serviceValues, setServiceValues] = useState<Record<string, Record<string, number>>>(() => {
    const init: Record<string, Record<string, number>> = {};
    services.forEach(s => {
      const vals: Record<string, number> = {};
      s.params.forEach(p => {
        // Set smart defaults
        if (s.id === 'soc360' && p.id === 'retention_hot') vals[p.id] = 1; // 3 meses
        else if (s.id === 'soc360' && p.id === 'retention_cold') vals[p.id] = 1; // 8 meses
        else vals[p.id] = 0;
      });
      init[s.id] = vals;
    });
    return init;
  });
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set(['soc360']));
  const [showForm, setShowForm] = useState(false);

  const toggleExpand = useCallback((id: string) => {
    setExpandedServices(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleService = useCallback((id: string) => {
    setEnabledServices(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) setExpandedServices(prev2 => new Set(prev2).add(id));
      return next;
    });
  }, []);

  const updateParam = useCallback((serviceId: string, paramId: string, value: number) => {
    setServiceValues(prev => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], [paramId]: value },
    }));
  }, []);

  const costs = useMemo(() => {
    const result: Record<string, { managed: number; inHouse: number; savings: number }> = {};
    services.forEach(s => {
      result[s.id] = computeCost(s, serviceValues[s.id] || {});
    });
    return result;
  }, [serviceValues]);

  const enabledList = services.filter(s => enabledServices[s.id]);
  const enabledCount = enabledList.length;

  // Bundle discount: 3+ = 10%, 4+ = 15%, 5+ = 20%, 6+ = 25%, all 7 = 30%
  const bundleDiscount = enabledCount >= 7 ? 30 : enabledCount >= 6 ? 25 : enabledCount >= 5 ? 20 : enabledCount >= 4 ? 15 : enabledCount >= 3 ? 10 : 0;

  const subtotal = enabledList.reduce((sum, s) => sum + costs[s.id].managed, 0);
  const totalManaged = Math.round(subtotal * (1 - bundleDiscount / 100));
  const totalInHouse = enabledList.reduce((sum, s) => sum + costs[s.id].inHouse, 0);
  const totalSavings = totalInHouse > 0 ? Math.round(((totalInHouse - totalManaged) / totalInHouse) * 100) : 0;

  const enabledForForm = enabledList.map(s => ({
    service: s,
    cost: costs[s.id].managed,
    params: serviceValues[s.id] || {},
  }));

  return (
    <PageLayout>
      {/* Slim Hero */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(215_80%_55%/0.3)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className={`inline-flex items-center gap-3 text-[11px] font-semibold ${accent.text} mb-6 px-5 py-2 rounded-full ${accent.border} ${accent.bgLight} uppercase tracking-[0.15em]`}>
            <Calculator size={14} />
            Calculadora de Costos
          </div>
          <h1 className="font-display font-extrabold text-foreground mb-4 tracking-[-0.035em]" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}>
            Arma tu paquete: <span className="bg-gradient-to-r from-[hsl(215_80%_55%)] to-[hsl(200_70%_50%)] bg-clip-text text-transparent">In-house vs. Cyberpeace</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            Activa los servicios que necesitas, configura cada uno y obtén una cotización combinada.
          </p>
          <a href="#calculadora" className={`inline-flex items-center gap-2 ${accent.bg} text-white px-7 py-3 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(215_80%_55%/0.25)] transition-all duration-500`}>
            Configurar servicios <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculadora" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">

            {/* Left — Service cards */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-4">
                Activa y configura tus servicios
              </p>

              {services.map(s => {
                const isEnabled = !!enabledServices[s.id];
                const isExpanded = expandedServices.has(s.id) && isEnabled;
                const cost = costs[s.id];

                return (
                  <div
                    key={s.id}
                    className={`bg-card border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isEnabled ? `border-[hsl(215_80%_55%/0.4)] ring-1 ring-[hsl(215_80%_55%/0.15)] bg-[hsl(215_80%_55%/0.02)]` : 'border-border opacity-70'
                    }`}
                  >
                    {/* Service header — toggle + expand */}
                    <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => isEnabled ? toggleExpand(s.id) : toggleService(s.id)}>
                      {/* Toggle */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleService(s.id); }}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                          isEnabled ? 'bg-[hsl(215_80%_55%)] border-[hsl(215_80%_55%)]' : 'border-muted-foreground/40'
                        }`}
                      >
                        {isEnabled && <Check size={13} className="text-white" />}
                      </button>

                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color.replace(')', ' / 0.1)')}` }}>
                        <s.icon size={16} style={{ color: s.color }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-semibold ${isEnabled ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</h3>
                        <p className="text-[11px] text-muted-foreground truncate">{s.desc}</p>
                      </div>

                      {isEnabled && (
                        <span className="text-sm font-bold text-foreground shrink-0">
                          ${cost.managed.toLocaleString('en-US')}
                          <span className="text-[10px] font-normal text-muted-foreground">/mes</span>
                        </span>
                      )}

                      {isEnabled && (
                        <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                      )}
                    </div>

                    {/* Expanded params */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-border/50">
                        {/* Always-included for SOC */}
                        {s.id === 'soc360' && (
                          <div className="flex flex-wrap gap-1.5 mb-4 mt-3">
                            {['Threat Hunting activo', 'Threat Intelligence', 'Ingeniería de Detección', 'Contención y Respuesta'].map(cap => (
                              <span key={cap} className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                                <Check size={8} /> {cap}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-3 mt-3">
                          {s.params.map(param => (
                            <div key={param.id}>
                              <label className="text-[11px] font-medium text-foreground mb-1 block">{param.label}</label>
                              <div className="relative">
                                <select
                                  className="w-full appearance-none bg-muted/40 border border-border rounded-lg px-3 py-2 text-[13px] text-foreground pr-8 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                                  value={serviceValues[s.id]?.[param.id] || 0}
                                  onChange={(e) => updateParam(s.id, param.id, parseInt(e.target.value))}
                                >
                                  {param.options?.map((opt, i) => (
                                    <option key={i} value={i}>{opt.label}</option>
                                  ))}
                                </select>
                                <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Individual cost breakdown */}
                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span>In-house: <span className="line-through">${cost.inHouse.toLocaleString('en-US')}</span></span>
                          <span className="text-emerald-500 font-semibold">Ahorro {cost.savings}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right — Summary sticky panel */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border bg-muted/20">
                  <div className="flex items-center gap-2 mb-1">
                    <ShoppingCart size={16} className="text-[hsl(215_80%_55%)]" />
                    <h3 className="font-semibold text-foreground text-sm">Resumen de cotización</h3>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {enabledCount} servicio{enabledCount !== 1 ? 's' : ''} seleccionado{enabledCount !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="p-5 space-y-2">
                  {enabledList.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      Activa al menos un servicio para ver la estimación.
                    </p>
                  ) : (
                    <>
                      {enabledList.map(s => (
                        <div key={s.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <s.icon size={12} style={{ color: s.color }} />
                            <span className="text-xs text-foreground">{s.shortLabel}</span>
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            ${costs[s.id].managed.toLocaleString('en-US')}
                          </span>
                        </div>
                      ))}

                      {bundleDiscount > 0 && (
                        <>
                          <div className="border-t border-border/50 my-2" />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Subtotal</span>
                            <span className="text-xs text-muted-foreground">${subtotal.toLocaleString('en-US')}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                              <Package size={10} /> Descuento paquete
                            </span>
                            <span className="text-xs text-emerald-600 font-bold">-{bundleDiscount}%</span>
                          </div>
                        </>
                      )}

                      <div className="border-t border-border pt-3 mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">In-house estimado</span>
                          <span className="text-xs text-muted-foreground line-through">${totalInHouse.toLocaleString('en-US')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-foreground">Con Cyberpeace</span>
                          <span className="text-lg font-bold text-[hsl(215_80%_55%)]">
                            ${totalManaged.toLocaleString('en-US')}
                            <span className="text-[10px] font-normal text-muted-foreground">/mes</span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-muted-foreground">Ahorro total</span>
                          <span className="text-sm font-bold text-emerald-500">{totalSavings}%</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const cartData = {
                            items: enabledList.map(s => ({
                              id: s.id,
                              label: s.label,
                              shortLabel: s.shortLabel,
                              cost: costs[s.id].managed,
                              params: serviceValues[s.id] || {},
                              defaultServiceType: s.defaultServiceType,
                            })),
                            subtotal,
                            discount: bundleDiscount,
                            total: totalManaged,
                            totalInHouse,
                          };
                          navigate('/checkout', { state: cartData });
                        }}
                        className={`w-full flex items-center justify-center gap-2 ${accent.bg} text-white py-3 rounded-xl text-sm font-bold transition-all duration-300 mt-4 hover:shadow-lg hover:shadow-[hsl(215_80%_55%/0.25)]`}
                      >
                        <ShoppingCart size={14} />
                        Comprar
                        <ArrowRight size={14} />
                      </button>

                      {/* Quick-add all */}
                      {enabledCount < services.length && (
                        <button
                          onClick={() => {
                            const all: Record<string, boolean> = {};
                            services.forEach(s => { all[s.id] = true; });
                            setEnabledServices(all);
                          }}
                          className="w-full flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground py-2 transition-colors"
                        >
                          <Plus size={12} /> Activar todos los servicios
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              <p className="text-center text-[10px] text-muted-foreground/50 mt-3">
                * Estimaciones referenciales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-20 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
              Comparativa de capacidades
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Entiende claramente qué incluye cada servicio.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground py-4 pr-4 w-[240px]">Capacidad</th>
                  {comparisonColumns.map(col => (
                    <th key={col.key} className="text-center text-xs font-semibold py-4 px-2 text-foreground">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-muted/10' : ''}`}>
                    <td className="text-sm text-foreground py-3.5 pr-4">{row.feature}</td>
                    {comparisonColumns.map(col => {
                      const val = row[col.key as keyof typeof row];
                      return (
                        <td key={col.key} className="text-center py-3.5 px-2">
                          {val ? (
                            <Check size={18} className="mx-auto text-emerald-500" />
                          ) : (
                            <Minus size={16} className="mx-auto text-muted-foreground/40" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            ¿Listo para optimizar tu inversión en ciberseguridad?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm">
            Solicita una cotización personalizada y descubre cuánto puedes ahorrar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#calculadora" className={`group inline-flex items-center gap-3 ${accent.bg} text-white px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(215_80%_55%/0.25)] transition-all duration-500`}>
              Configurar paquete
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link to="/contacto" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
              Hablar con un especialista
            </Link>
          </div>
        </div>
      </section>

      {/* Lead form modal */}
      {showForm && enabledList.length > 0 && (
        <BundleLeadForm
          enabledServices={enabledForForm}
          totalCost={totalManaged}
          onClose={() => setShowForm(false)}
        />
      )}
    </PageLayout>
  );
};

export default Pricing;
