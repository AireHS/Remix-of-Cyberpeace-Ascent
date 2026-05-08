import { Target, Shield, Crosshair, Bug, Users, Eye, Cloud, Lock, Cpu, ArrowRight, Check, Globe, Layers, Settings, ScanSearch, Server, Code, Activity } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

/* ═══ Accent: Red tones — hsl(0 72% 51%) ═══ */
const accent = {
  text: 'text-[hsl(0_72%_51%)]',
  bg: 'bg-[hsl(0_72%_51%)]',
  bgLight: 'bg-[hsl(0_72%_51%/0.08)]',
  bgLighter: 'bg-[hsl(0_72%_51%/0.03)]',
  border: 'border-[hsl(0_72%_51%/0.15)]',
  hoverBorder: 'hover:border-[hsl(0_72%_51%/0.3)]',
  shadow: 'hover:shadow-[0_8px_30px_-8px_hsl(0_72%_51%/0.12)]',
  glow: 'radial-gradient(circle, hsl(0 72% 51% / 0.06), transparent 65%)',
};

/* ═══ Mega menu content ═══ */
const benefits = [
  'Visibilidad continua de la superficie de ataque expuesta',
  'Identificación de vulnerabilidades con riesgo explotable real',
  'Priorización basada en impacto técnico y de negocio',
  'Reducción de exposición antes de la materialización del ataque',
  'Cumplimiento de requerimientos regulatorios y auditorías técnicas',
];

const differentiators = [
  'Integración de ASM, Red Team y AppSec en un solo modelo operativo',
  'Validación mediante explotación real, no solo escaneo',
  'Enfoque continuo, no limitado a ejercicios puntuales',
  'Cobertura de infraestructura, aplicaciones y superficie externa',
  'Priorización basada en explotabilidad, no solo severidad (CVSS)',
];

const capabilitiesList = [
  { icon: ScanSearch, title: 'Attack Surface Management (ASM)', desc: 'Descubrimiento continuo de tu superficie de ataque externa, shadow IT, subdominios expuestos y activos olvidados.' },
  { icon: Target, title: 'Pruebas de penetración regulatorias', desc: 'PCI DSS, auditorías sectoriales y cumplimiento regulatorio con informes técnicos y ejecutivos.' },
  { icon: Crosshair, title: 'Pentesting one-shot, recurrente y continuo', desc: 'Black, Grey & White Box en infraestructura, aplicaciones web/móvil, APIs y redes.' },
  { icon: Shield, title: 'Red Teaming y simulación de adversarios', desc: 'Emulación de adversarios reales con TTPs específicos de tu industria y geografía.' },
  { icon: Code, title: 'Seguridad de aplicaciones (SAST, DAST, MAST)', desc: 'Revisión de código, pruebas dinámicas, SCA e integraciones DevSecOps para CI/CD.' },
];

const stats = [
  { value: '+1,200', label: 'Pentests realizados' },
  { value: '94%', label: 'Clientes con vulnerabilidades críticas no detectadas' },
  { value: '<72h', label: 'Entrega de informe preliminar' },
  { value: '100%', label: 'Retesting incluido sin costo' },
];

const methodology = [
  { step: '01', title: 'Reconocimiento', desc: 'OSINT, enumeración de activos, descubrimiento de superficie de ataque y mapeo de infraestructura.' },
  { step: '02', title: 'Análisis de Vulnerabilidades', desc: 'Identificación automatizada y manual con clasificación por impacto y explotabilidad.' },
  { step: '03', title: 'Explotación Controlada', desc: 'Ejecución de ataques reales: escalamiento de privilegios, movimiento lateral, extracción de datos.' },
  { step: '04', title: 'Post-Explotación', desc: 'Evaluación de impacto real, persistencia y capacidad de detección de tus controles actuales.' },
  { step: '05', title: 'Reporte y Remediación', desc: 'Informe ejecutivo + técnico con evidencias, impacto de negocio y plan de remediación priorizado.' },
  { step: '06', title: 'Retesting', desc: 'Verificación de que las remediaciones fueron implementadas correctamente. Sin costo adicional.' },
];

const frameworks = ['MITRE ATT&CK', 'OWASP Top 10', 'OWASP ASVS', 'PTES', 'OSSTMM', 'NIST SP 800-115', 'CREST', 'TIBER-EU', 'CIS Benchmarks'];

const RedTeaming = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute pointer-events-none" style={{ width: 800, height: 800, borderRadius: '50%', background: accent.glow, top: '-25%', left: '50%', transform: 'translateX(-50%)' }} />
      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(0_72%_51%/0.35)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className={`inline-flex items-center gap-3 text-[11px] font-semibold ${accent.text} mb-8 px-5 py-2 rounded-full ${accent.border} ${accent.bgLight} uppercase tracking-[0.15em]`}>
          Exposición · Validación · Remediación
        </div>

        <h1 className="font-display font-extrabold text-foreground mb-6 tracking-[-0.035em] max-w-4xl mx-auto" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: 1.08 }}>
          Encontramos tus vulnerabilidades<br />
          <span className="bg-gradient-to-r from-[hsl(0_72%_51%)] to-[hsl(20_80%_55%)] bg-clip-text text-transparent">antes que los atacantes.</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          Identificamos rutas de ataque reales, priorizamos riesgos explotables y te acompañamos 
          en la remediación — antes de que se conviertan en incidentes.
        </p>
        <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10">
          No solo escaneamos. Atacamos como un adversario real, reportamos como un consultor 
          y te ayudamos a remediar como un partner.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className={`group inline-flex items-center gap-3 ${accent.bg} text-white px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(0_72%_51%/0.25)] transition-all duration-500`}>
            Solicitar evaluación
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a href="#beneficios" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
            Ver beneficios
          </a>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 border-t border-border bg-card/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className={`bg-card border border-border rounded-xl p-5 text-center ${accent.hoverBorder} transition-colors`}>
              <p className={`text-2xl font-extrabold ${accent.text} mb-1`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ BENEFITS + DIFFERENTIATORS ═══ */}
    <section id="beneficios" className="py-24 border-t border-border">
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
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`text-xs font-medium ${accent.text} uppercase tracking-widest mb-3 block`}>Capacidades</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Lo que ejecutamos</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilitiesList.map((cap) => (
            <div key={cap.title} className={`bg-card border border-border rounded-xl p-6 ${accent.hoverBorder} ${accent.shadow} transition-all duration-300 group`}>
              <div className={`w-11 h-11 rounded-lg ${accent.bgLight} flex items-center justify-center mb-4`}>
                <cap.icon className={`w-5 h-5 ${accent.text}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Methodology */}
    <section className="py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Metodología</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Proceso estructurado que garantiza consistencia y profundidad.</p>
        </div>
        <div className="space-y-4">
          {methodology.map((m) => (
            <div key={m.step} className={`bg-card border border-border rounded-xl p-5 flex items-start gap-4 ${accent.hoverBorder} transition-colors`}>
              <span className="text-2xl font-extrabold text-[hsl(0_72%_51%/0.25)]">{m.step}</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Frameworks */}
    <section className="py-20 border-t border-border bg-card/30">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">Frameworks y estándares</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {frameworks.map((fw) => (
            <span key={fw} className={`bg-card border border-border rounded-full px-5 py-2.5 text-sm font-medium text-foreground ${accent.hoverBorder} transition-colors`}>{fw}</span>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          ¿Sabes cuáles son tus vulnerabilidades más críticas hoy?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          El 60% de las brechas explotan vulnerabilidades conocidas que no fueron remediadas a tiempo.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className={`group inline-flex items-center gap-3 ${accent.bg} text-white px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(0_72%_51%/0.25)] transition-all duration-500`}>
            Solicitar pentest
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

export default RedTeaming;
