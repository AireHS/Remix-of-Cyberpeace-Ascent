import { Shield, Award, Users, Zap, Globe, HeadphonesIcon, ChevronRight, Star, CheckCircle, TrendingUp, Building2, Handshake, BarChart3, ArrowRight, Network, Lock, Eye } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import partnerHero from '@/assets/partner-hero.jpg';
import partnerSoc from '@/assets/partner-soc.jpg';
import partnerGlobal from '@/assets/partner-global.jpg';
import partnerTiers from '@/assets/partner-tiers.png';

const tiers = [
  {
    name: 'Authorized',
    icon: Shield,
    color: 'text-muted-foreground',
    borderColor: 'border-border',
    bgGradient: 'from-muted/30 to-transparent',
    benefits: [
      'Acceso al portal de partners',
      'Material de marketing básico',
      'Deal registration',
      'Soporte técnico estándar',
      'Comisiones base',
    ],
  },
  {
    name: 'Gold',
    icon: Award,
    color: 'text-yellow-500',
    borderColor: 'border-yellow-500/30',
    bgGradient: 'from-yellow-500/5 to-transparent',
    benefits: [
      'Todo lo de Authorized',
      'Leads compartidos',
      'Co-marketing campaigns',
      'Training avanzado y certificaciones',
      'Comisiones incrementadas (+15%)',
      'Account Manager dedicado',
    ],
  },
  {
    name: 'Platinum',
    icon: Star,
    color: 'text-primary',
    borderColor: 'border-primary/30',
    bgGradient: 'from-primary/5 to-transparent',
    benefits: [
      'Todo lo de Gold',
      'Acceso a NFR licenses',
      'Joint business planning',
      'Executive sponsorship',
      'Comisiones máximas (+30%)',
      'Soporte técnico prioritario 24/7',
      'Co-branded solutions',
    ],
  },
];

const benefits = [
  { icon: TrendingUp, title: 'Ingresos Recurrentes', desc: 'Genera revenue continuo con servicios de ciberseguridad gestionados y modelos de suscripción.' },
  { icon: Users, title: 'Enablement Completo', desc: 'Accede a trainings, certificaciones, documentación técnica y sandbox environments.' },
  { icon: Globe, title: 'Alcance Global', desc: 'Presencia en LATAM y Europa. Soporte multilingüe y adaptado a regulaciones locales.' },
  { icon: HeadphonesIcon, title: 'Soporte Dedicado', desc: 'Channel Manager asignado, soporte preventa y asistencia en implementaciones.' },
];

const integrations = [
  { name: 'Microsoft Sentinel', category: 'SIEM', icon: Network },
  { name: 'CrowdStrike', category: 'EDR', icon: Shield },
  { name: 'Palo Alto Networks', category: 'Firewall', icon: Lock },
  { name: 'Splunk', category: 'SIEM', icon: BarChart3 },
  { name: 'SentinelOne', category: 'EDR', icon: Eye },
  { name: 'Fortinet', category: 'Firewall', icon: Lock },
  { name: 'AWS Security Hub', category: 'Cloud', icon: Globe },
  { name: 'Google Chronicle', category: 'SIEM', icon: Network },
  { name: 'Tenable', category: 'Vulnerability', icon: Shield },
  { name: 'Qualys', category: 'Vulnerability', icon: Shield },
  { name: 'Okta', category: 'Identity', icon: Users },
  { name: 'Zscaler', category: 'Zero Trust', icon: Lock },
];

const stats = [
  { value: '150+', label: 'Partners Activos' },
  { value: '12', label: 'Países' },
  { value: '98%', label: 'Retención' },
  { value: '$2.4M', label: 'Revenue Generado' },
];

const PartnerPortal = () => (
  <PageLayout>
    {/* Hero with Image */}
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
              <Handshake className="w-3.5 h-3.5" />
              Partner Program
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-[-0.03em] leading-[1.05]">
              Crece con <span className="gradient-text">Cyberpeace</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed">
              Únete a nuestro programa de partners y ofrece soluciones de ciberseguridad de clase mundial a tus clientes.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="/partner-login" className="bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center gap-2">
                Acceder al Portal <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#beneficios" className="border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-colors">
                Ver Beneficios
              </a>
            </div>
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-extrabold text-2xl text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-2xl" />
            <img
              src={partnerHero}
              alt="Cyberpeace Partner Program"
              className="relative rounded-2xl shadow-2xl shadow-primary/10 w-full object-cover aspect-[16/11]"
            />
            <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl px-5 py-3 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">ISO 27001</p>
                <p className="text-xs text-muted-foreground">Certificado</p>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 bg-background border border-border rounded-xl px-4 py-2.5 shadow-lg">
              <p className="text-xs font-semibold text-primary">24/7 SOC</p>
              <p className="text-[10px] text-muted-foreground">Follow the Sun</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Trusted logos marquee */}
    <section className="py-8 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-12 flex-wrap opacity-50">
          {['Microsoft', 'CrowdStrike', 'Palo Alto', 'Splunk', 'AWS', 'Fortinet', 'Google Cloud', 'SentinelOne'].map((name) => (
            <span key={name} className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">{name}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits with Image */}
    <section id="beneficios" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={partnerSoc}
              alt="Centro de Operaciones de Seguridad"
              className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-foreground/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex gap-3">
              {[
                { val: '< 5 min', label: 'MTTD' },
                { val: '< 30 min', label: 'MTTR' },
                { val: '99.9%', label: 'Uptime' },
              ].map((m) => (
                <div key={m.label} className="bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2.5 flex-1 text-center border border-border/50">
                  <p className="text-sm font-bold text-foreground">{m.val}</p>
                  <p className="text-[10px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
              <Zap className="w-3.5 h-3.5" />
              Beneficios
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-6 tracking-[-0.02em]">
              ¿Por qué ser <span className="gradient-text">Partner</span>?
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Beneficios diseñados para impulsar tu negocio de ciberseguridad con tecnología de clase mundial.
            </p>
            <div className="space-y-5">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card hover:border-border hover:shadow-sm transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-xl bg-primary/[0.06] flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Tiers with badge image */}
    <section className="py-24 lg:py-32 bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
            <Award className="w-3.5 h-3.5" />
            Niveles
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-4 tracking-[-0.02em]">
            Niveles del Programa
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tres niveles con beneficios crecientes según tu compromiso y volumen.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative bg-background border ${tier.borderColor} rounded-2xl p-8 hover:shadow-lg transition-all duration-500 ${i === 2 ? 'ring-2 ring-primary/20' : ''}`}
            >
              {i === 2 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Recomendado
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.bgGradient} flex items-center justify-center mb-5`}>
                <tier.icon className={`w-7 h-7 ${tier.color}`} />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">{tier.name}</h3>
              <p className="text-xs text-muted-foreground mb-6">
                {i === 0 ? 'Ideal para comenzar' : i === 1 ? 'Para partners en crecimiento' : 'Para líderes del mercado'}
              </p>
              <div className="w-full h-px bg-border mb-6" />
              <ul className="space-y-3">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.color}`} />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a href="#registro" className={`mt-8 block text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${i === 2 ? 'bg-primary text-primary-foreground hover:opacity-90' : 'border border-border text-foreground hover:bg-card'}`}>
                Comenzar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Global Reach with Map */}
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
              <Globe className="w-3.5 h-3.5" />
              Presencia Global
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-6 tracking-[-0.02em]">
              Presencia en <span className="gradient-text">12 países</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Red de partners en LATAM y Europa con soporte local, adaptado a regulaciones y necesidades de cada mercado.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Building2, title: 'Oficinas', desc: 'México, España, Chile' },
                { icon: Users, title: 'Partners', desc: '150+ activos globalmente' },
                { icon: HeadphonesIcon, title: 'Soporte', desc: 'Multilingüe 24/7' },
                { icon: BarChart3, title: 'Crecimiento', desc: '+45% YoY en canal' },
              ].map((item) => (
                <div key={item.title} className="bg-card/50 border border-border/50 rounded-xl p-4 hover:bg-card transition-all">
                  <item.icon className="w-5 h-5 text-primary mb-2.5" />
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={partnerGlobal}
              alt="Red global de partners Cyberpeace"
              className="rounded-2xl w-full object-cover aspect-[4/3] border border-border/30"
            />
            {/* Floating location pins */}
            {[
              { label: 'CDMX', top: '45%', left: '20%' },
              { label: 'Madrid', top: '30%', left: '60%' },
              { label: 'Santiago', top: '70%', left: '28%' },
            ].map((pin) => (
              <div
                key={pin.label}
                className="absolute bg-primary text-primary-foreground text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse"
                style={{ top: pin.top, left: pin.left }}
              >
                {pin.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>



    {/* Registration Form */}
    <section id="registro" className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
              Únete
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-6 tracking-[-0.02em]">
              Aplica al <span className="gradient-text">Programa</span>
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Completa el formulario y nuestro equipo de Channel se pondrá en contacto contigo en menos de 48 horas.
            </p>

            {/* Trust signals */}
            <div className="space-y-4">
              {[
                'Sin costos de afiliación',
                'Onboarding personalizado en 2 semanas',
                'Portal de partners con recursos exclusivos',
                'Certificaciones y trainings sin costo',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-foreground mb-6">Información de Contacto</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Nombre</label>
                  <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Apellido</label>
                  <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Empresa</label>
                <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Corporativo</label>
                <input type="email" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">País</label>
                <select className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all">
                  <option>México</option>
                  <option>España</option>
                  <option>Chile</option>
                  <option>Colombia</option>
                  <option>Argentina</option>
                  <option>Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">¿Por qué quieres ser Partner?</label>
                <textarea rows={3} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none" />
              </div>
              <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 text-sm font-semibold rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                Enviar Solicitud <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-muted-foreground text-center">
                Al enviar aceptas nuestra política de privacidad
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default PartnerPortal;
