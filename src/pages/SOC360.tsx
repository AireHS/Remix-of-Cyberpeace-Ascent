import { Check, ArrowRight, Globe, Shield, Eye, Brain, Cpu, Zap, Activity, BarChart3, Workflow, Monitor, Layers, Settings, Target, Lock, ScanSearch, Server, Clock, Users, Radio, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

/* ═══ Accent color: Blue — hsl(215 80% 55%) ═══ */
const accent = {
  gradient: 'from-[hsl(215_80%_55%)] to-[hsl(200_70%_50%)]',
  text: 'text-[hsl(215_80%_55%)]',
  bg: 'bg-[hsl(215_80%_55%)]',
  bgLight: 'bg-[hsl(215_80%_55%/0.08)]',
  bgLighter: 'bg-[hsl(215_80%_55%/0.04)]',
  border: 'border-[hsl(215_80%_55%/0.2)]',
  hoverBorder: 'hover:border-[hsl(215_80%_55%/0.35)]',
  shadow: 'hover:shadow-[0_8px_30px_-8px_hsl(215_80%_55%/0.15)]',
  glow: 'radial-gradient(circle, hsl(215 80% 55% / 0.08), transparent 65%)',
};

/* ═══ Benefits / Differentiators / Capabilities from mega menu ═══ */
const benefits = [
  'Reducción de MTTD, MTTI y MTTR',
  'Reducción del Dwell Time (tiempo de permanencia del atacante)',
  'Investigación desde el primer indicio, no solo alertas',
  'Identificación temprana de actividad anómala',
  'Visibilidad continua del riesgo operativo',
];

const differentiators = [
  'SecOps impulsado por IA orientado a investigación y respuesta',
  'Integración nativa de detección, inteligencia y operación',
  'Arquitectura abierta y extensible (sin dependencia de un solo fabricante)',
  'Cobertura y validación continua basada en MITRE ATT&CK',
  'Operación orientada a reducción real de riesgo, no solo alertas',
];

const capabilities = [
  { icon: Monitor, title: 'Detección basada en correlación de telemetría multi-fuente', desc: 'Correlación en tiempo real de +100 fuentes con reglas personalizadas y enriquecimiento automático.' },
  { icon: ScanSearch, title: 'Threat Hunting basado en hipótesis y cobertura MITRE ATT&CK', desc: 'Ciclos semanales con reglas Sigma/YARA y análisis de TTPs.' },
  { icon: Activity, title: 'Investigación de alertas con análisis de causa raíz', desc: 'Clasificación inteligente con scoring de riesgo contextual.' },
  { icon: Brain, title: 'Desarrollo y tuning de reglas de detección', desc: 'Ingeniería de detección continua evolucionando con el panorama de amenazas.' },
  { icon: Shield, title: 'Enriquecimiento con inteligencia táctica y operacional', desc: 'Feeds STIX/TAXII con fuentes abiertas y comerciales. Enriquecimiento automatizado de IOCs.' },
  { icon: Zap, title: 'Contención coordinada (EDR, IAM, red)', desc: 'Aislamiento automatizado, bloqueo de IOCs y ejecución de playbooks en minutos.' },
  { icon: BarChart3, title: 'Gestión continua de exposición (CTEM)', desc: 'Evaluación continua de postura con dashboards ejecutivos y roadmap priorizado.' },
];

/* ═══ Metrics ═══ */

/* ═══ Platform Tech ═══ */
const platformSections = [
  {
    id: 'stack',
    title: 'Capacidades Técnicas',
    subtitle: 'Stack de seguridad integrado y modular',
    items: [
      { icon: BarChart3, name: 'SIEM', desc: 'Correlación de eventos con ingesta <200ms. Splunk ES, Microsoft Sentinel, Wazuh.' },
      { icon: Monitor, name: 'EDR / XDR', desc: 'CrowdStrike Falcon, SentinelOne, Cortex XDR, Trend Micro Vision One.' },
      { icon: Workflow, name: 'SOAR', desc: 'Playbooks automatizados. 90% de casos L1 ejecutados sin intervención humana.' },
      { icon: Brain, name: 'Threat Intelligence', desc: 'Feeds STIX/TAXII con fuentes abiertas y comerciales. Enriquecimiento automatizado de IOCs.' },
      { icon: Cpu, name: 'Machine Learning', desc: 'Modelos supervisados y UEBA para detectar anomalías y movimiento lateral.' },
      { icon: Shield, name: 'NDR', desc: 'Detección de tráfico malicioso, C2 callbacks y exfiltración de datos en red.' },
    ],
  },
  {
    id: 'integraciones',
    title: 'Integraciones',
    subtitle: 'BYO-SIEM: trae tu stack o usa el nuestro',
    items: [
      { icon: Server, name: 'Cloud Providers', desc: 'AWS, Azure, GCP — ingestión nativa de CloudTrail, Activity Logs y Audit Logs.' },
      { icon: Lock, name: 'Identity Platforms', desc: 'Azure AD, Okta, Google Workspace — detección de accesos anómalos y MFA bypass.' },
      { icon: Settings, name: 'Ticketing', desc: 'ServiceNow, Jira, PagerDuty — escalamiento automático bidireccional.' },
      { icon: Layers, name: 'Infraestructura', desc: 'Firewalls, proxies, WAFs, switches — correlación de logs de red perimetral.' },
      { icon: Radio, name: 'OT/IoT', desc: 'Protocolos SCADA (Modbus, OPC UA), ICS (DNP3, IEC 61850) para infraestructura crítica.' },
      { icon: Globe, name: 'SaaS Apps', desc: 'Microsoft 365, Salesforce, Slack — visibilidad completa de tu ecosistema SaaS.' },
    ],
  },
];

/* ═══ Follow-the-Sun ═══ */
const locations = [
  { city: 'México', cities: 'CDMX · Guadalajara', zone: 'GMT-6', hours: '06:00–14:00 UTC' },
  { city: 'España', cities: 'Madrid · Barcelona', zone: 'GMT+1', hours: '14:00–22:00 UTC' },
  { city: 'Chile', cities: 'Santiago', zone: 'GMT-3', hours: '22:00–06:00 UTC' },
  { city: 'Brasil', cities: 'São Paulo', zone: 'GMT-3', hours: 'Redundancia y overflow' },
];

/* ═══ Certifications ═══ */
const teamCerts = [
  { category: 'Defensa & Operación', certs: ['CISSP', 'CISM', 'GSOC', 'GSOM', 'GRID', 'GREM', 'GCCC', 'CHFI'] },
  { category: 'Ofensiva & Hunting', certs: ['OSCE³', 'OSCP', 'OSEP', 'OSED', 'GPEN', 'CEH', 'OSWE'] },
  { category: 'Frameworks & GRC', certs: ['ISO 27001 LA', 'CISA', 'CRISC', 'CCSP', 'COBIT', 'ITIL'] },
];

const SOC360 = () => (
  <PageLayout>
    {/* ═══ HERO ═══ */}
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute pointer-events-none" style={{ width: 800, height: 800, borderRadius: '50%', background: accent.glow, top: '-25%', left: '50%', transform: 'translateX(-50%)' }} />
      {/* Subtle blue accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(215_80%_55%/0.3)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-3 text-[11px] font-semibold ${accent.text} mb-8 px-5 py-2 rounded-full ${accent.border} ${accent.bgLight} uppercase tracking-[0.15em]`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${accent.bg} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${accent.bg}`} />
            </span>
            SOC / MDR Gestionado · 24/7/365
          </div>

          <h1 className="font-display font-extrabold text-foreground mb-6 tracking-[-0.035em]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: 1.08 }}>
            Tu equipo de seguridad,<br />
            <span className="bg-gradient-to-r from-[hsl(215_80%_55%)] to-[hsl(200_70%_50%)] bg-clip-text text-transparent">operando desde el minuto uno.</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            Reducción drástica de MTTD y MTTR. 
            Nuestro SOC opera como extensión de tu equipo, con Threat Intelligence integrado 
            y monitoreo basado en riesgo.
          </p>
          <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10">
            Sin capex en infraestructura. Sin meses de implementación. Sin rotación de talento. 
            Solo resultados medibles desde la primera semana.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacto" className="group inline-flex items-center gap-3 bg-[hsl(215_80%_55%)] text-white px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(215_80%_55%/0.25)] transition-all duration-500">
              Solicitar demo SOC 360
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a href="#capacidades" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
              Ver capacidades
            </a>
          </div>
        </div>
      </div>
    </section>


    {/* ═══ BENEFITS + DIFFERENTIATORS (3 cols) ═══ */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`text-xs font-medium ${accent.text} uppercase tracking-widest mb-3 block`}>Por qué elegirnos</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Beneficios y diferenciadores</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className={`${accent.bgLighter} border ${accent.border} rounded-2xl p-8`}>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${accent.text} mb-6`}>Beneficios</h3>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className={`w-4 h-4 ${accent.text} shrink-0 mt-0.5`} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${accent.bgLighter} border ${accent.border} rounded-2xl p-8`}>
            <h3 className={`text-sm font-bold uppercase tracking-widest ${accent.text} mb-6`}>Diferenciadores</h3>
            <ul className="space-y-3">
              {differentiators.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-foreground">
                  <div className={`w-1.5 h-1.5 rounded-full ${accent.bg} shrink-0 mt-2`} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* ═══ CAPABILITIES ═══ */}
    <section id="capacidades" className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`text-xs font-medium ${accent.text} uppercase tracking-widest mb-3 block`}>Capacidades</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Lo que operamos para ti
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada capacidad está diseñada para reducir el dwell time, acelerar la contención y fortalecer tu resiliencia operativa.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div key={cap.title} className={`bg-card border border-border rounded-xl p-6 ${accent.hoverBorder} ${accent.shadow} transition-all duration-300 group`}>
              <div className={`w-11 h-11 rounded-lg ${accent.bgLight} flex items-center justify-center mb-4 transition-colors`}>
                <cap.icon className={`w-5 h-5 ${accent.text}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ PLATFORM TECH STACK & INTEGRATIONS ═══ */}
    {platformSections.map((section) => (
      <section key={section.id} id={section.id} className="py-24 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">{section.title}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{section.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.items.map((item) => (
              <div key={item.name} className={`bg-card border border-border rounded-xl p-5 ${accent.hoverBorder} transition-colors`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg ${accent.bgLight} flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 ${accent.text}`} />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    ))}

    {/* ═══ PORTAL & REPORTING ═══ */}
    <section id="portal" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className={`text-xs font-medium ${accent.text} uppercase tracking-widest mb-3 block`}>Portal SOC360</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Visibilidad total. Reportes que tu C-level necesita para tomar decisiones.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Portal dedicado con dashboards ejecutivos, KPIs operativos y reportes mensuales 
              que traducen la operación técnica en lenguaje de negocio.
            </p>
            <ul className="space-y-3">
              {[
                'Dashboard ejecutivo en tiempo real',
                'Reportes mensuales automatizados (PDF/PowerPoint)',
                'Scoring de riesgo por activo y por unidad de negocio',
                'Histórico de incidentes con timeline visual',
                'Métricas MTTD, MTTR, y tendencias',
                'Acceso role-based para CISO, CTO y equipo técnico',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className={`w-4 h-4 ${accent.text} shrink-0 mt-0.5`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`bg-card border ${accent.border} rounded-2xl p-8`}>
            <div className="space-y-4">
              <div className="h-3 bg-[hsl(215_80%_55%/0.2)] rounded-full w-3/4" />
              <div className="h-3 bg-muted rounded-full w-1/2" />
              <div className="grid grid-cols-3 gap-3 mt-6">
                {['MTTD', 'MTTR', 'SLA'].map((label) => (
                  <div key={label} className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className={`text-lg font-bold ${accent.text}`}>{label === 'MTTD' ? '4.2m' : label === 'MTTR' ? '18m' : '99.8%'}</p>
                    <p className="text-xs text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                {[40, 65, 30, 80, 55, 70, 45, 60, 75, 50, 85, 35].map((h, i) => (
                  <div key={i} className="flex-1 bg-[hsl(215_80%_55%/0.2)] rounded-sm" style={{ height: h }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══ FOLLOW-THE-SUN ═══ */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
          Operación global Follow-the-Sun
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          4 centros SOC coordinados en 3 zonas horarias. Sin interrupciones, sin fatiga de analista.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((loc) => (
            <div key={loc.city} className={`bg-card border border-border rounded-xl p-5 ${accent.hoverBorder} transition-colors text-left`}>
              <div className="flex items-center gap-3 mb-3">
                <Globe className={`w-5 h-5 ${accent.text}`} />
                <p className="font-semibold text-foreground">{loc.city}</p>
              </div>
              <p className="text-sm text-muted-foreground">{loc.cities}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{loc.zone} · {loc.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ TEAM CERTS ═══ */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Equipo certificado</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">+80 profesionales con las certificaciones más exigentes de la industria.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {teamCerts.map((group) => (
            <div key={group.category} className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.certs.map((cert) => (
                  <span key={cert} className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-full">{cert}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ CTA ═══ */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          ¿Tu organización está preparada para detectar y responder a tiempo?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Agenda una demostración y descubre cómo SOC 360 puede transformar tu operación de seguridad.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className="group inline-flex items-center gap-3 bg-[hsl(215_80%_55%)] text-white px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(215_80%_55%/0.25)] transition-all duration-500">
            Solicitar demo
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/contacto" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
            Hablar con un especialista
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default SOC360;
