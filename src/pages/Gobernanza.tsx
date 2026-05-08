import { FileCheck, Shield, BarChart3, Lock, Users, Target, ClipboardList, ArrowRight, Check, Award, Scale, Globe, Eye, Settings, Layers } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

/* ═══ Accent: Clean / Executive — neutral slate with subtle cool ═══ */
const accent = {
  text: 'text-foreground',
  textSub: 'text-muted-foreground',
  bgLight: 'bg-muted/40',
  bgLighter: 'bg-muted/20',
  border: 'border-border',
  hoverBorder: 'hover:border-foreground/20',
  shadow: 'hover:shadow-[0_8px_30px_-8px_hsl(220_10%_20%/0.08)]',
};

/* ═══ Mega menu content ═══ */
const benefits = [
  'Visibilidad clara del riesgo cibernético y su impacto en el negocio',
  'Priorización de iniciativas de seguridad con base en riesgo real',
  'Alineación de capacidades con requerimientos regulatorios y auditorías',
  'Mejora continua de la postura de seguridad y madurez organizacional',
  'Soporte en la toma de decisiones a nivel CISO y dirección',
];

const differentiators = [
  'Enfoque en riesgo operativo y no solo cumplimiento documental',
  'Integración de hallazgos técnicos (SOC, IR, exposición) en la gestión de riesgo',
  'Evaluación de madurez alineada a capacidades reales, no solo frameworks',
  'Traducción de riesgos técnicos a impacto de negocio',
  'Acompañamiento estratégico en evolución de capacidades de seguridad',
];

const capabilitiesList = [
  { icon: BarChart3, title: 'Evaluación de riesgo cibernético y priorización', desc: 'Scoring claro de riesgo con impacto de negocio y priorización ejecutiva.' },
  { icon: Target, title: 'Assessment de madurez (NIST, ISO, CIS)', desc: 'Evaluación contra frameworks líderes con gaps identificados y roadmap.' },
  { icon: Scale, title: 'Gap analysis regulatorio', desc: 'ISO 27001, PCI DSS, SOC 2, GDPR, LFPDPPP y regulaciones sectoriales.' },
  { icon: ClipboardList, title: 'Roadmap de seguridad y remediación', desc: 'Plan priorizado por riesgo con estimados de esfuerzo y quick wins.' },
  { icon: Users, title: 'Riesgo de terceros (Third-Party Risk)', desc: 'Evaluación de proveedores críticos con scoring automatizado.' },
  { icon: Shield, title: 'Preparación y acompañamiento en auditorías', desc: 'Mock audits, gestión de evidencias y soporte durante la auditoría.' },
];

const frameworks = [
  { name: 'NIST CSF 2.0', desc: 'Framework de ciberseguridad para evaluación de madurez y mejora continua.' },
  { name: 'ISO 27001:2022', desc: 'Sistema de gestión de seguridad de la información. Diseño hasta certificación.' },
  { name: 'SOC 2 Type II', desc: 'Controles de seguridad para proveedores SaaS y servicios cloud.' },
  { name: 'PCI DSS v4.0', desc: 'Cumplimiento para procesamiento y almacenamiento de datos de tarjetas.' },
  { name: 'GDPR / LFPDPPP', desc: 'Protección de datos personales. Evaluación de impacto y cumplimiento.' },
  { name: 'NIS2 Directive', desc: 'Regulación europea de ciberseguridad para entidades esenciales.' },
  { name: 'CIS Controls v8', desc: 'Controles de seguridad priorizados para defensa efectiva.' },
  { name: 'COBIT 2019', desc: 'Gobierno corporativo de TI y alineación con objetivos de negocio.' },
];

const process = [
  { step: '01', title: 'Assessment', desc: 'Evaluamos tu estado actual contra el framework seleccionado, tu contexto regulatorio y tus objetivos de negocio.' },
  { step: '02', title: 'Análisis de Brechas', desc: 'Identificamos gaps críticos, riesgos residuales y áreas de oportunidad con scoring de priorización.' },
  { step: '03', title: 'Roadmap', desc: 'Plan de remediación priorizado por riesgo con estimados de esfuerzo, quick wins y proyectos estratégicos.' },
  { step: '04', title: 'Implementación', desc: 'Diseño de políticas, procedimientos, controles y evidencias. Capacitación del equipo.' },
  { step: '05', title: 'Auditoría y Mejora', desc: 'Mock audits, acompañamiento en certificación y ciclo de mejora continua post-auditoría.' },
];

const Gobernanza = () => (
  <PageLayout>
    {/* Hero — clean executive feel */}
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
      {/* Minimal top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-3 text-[11px] font-semibold text-foreground/70 mb-8 px-5 py-2 rounded-full border border-border bg-muted/30 uppercase tracking-[0.15em]">
          Riesgo · Madurez · Gobierno
        </div>

        <h1 className="font-display font-extrabold text-foreground mb-6 tracking-[-0.035em] max-w-4xl mx-auto" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: 1.08 }}>
          Seguridad que el negocio entiende.<br />
          <span className="text-muted-foreground">Cumplimiento que demuestra valor.</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          Evaluamos tu postura de riesgo, medimos madurez y alineamos capacidades 
          con requerimientos regulatorios, auditorías y objetivos de negocio.
        </p>
        <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10">
          No solo te preparamos para la auditoría. Construimos un programa de seguridad 
          que se sostiene después de ella.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-foreground/10 transition-all duration-500">
            Solicitar evaluación
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a href="#beneficios" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
            Ver beneficios
          </a>
        </div>
      </div>
    </section>

    {/* ═══ BENEFITS + DIFFERENTIATORS ═══ */}
    <section id="beneficios" className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-medium text-foreground/60 uppercase tracking-widest mb-3 block">Por qué elegirnos</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Beneficios y diferenciadores</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-muted/15 border border-border rounded-2xl p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 mb-6">Beneficios</h3>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-foreground/50 shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/15 border border-border rounded-2xl p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 mb-6">Diferenciadores</h3>
            <ul className="space-y-3">
              {differentiators.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 shrink-0 mt-2" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* ═══ CAPABILITIES ═══ */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-medium text-foreground/60 uppercase tracking-widest mb-3 block">Capacidades</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Lo que ejecutamos</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilitiesList.map((cap) => (
            <div key={cap.title} className={`bg-card border border-border rounded-xl p-6 ${accent.hoverBorder} ${accent.shadow} transition-all duration-300 group`}>
              <div className="w-11 h-11 rounded-lg bg-muted/50 flex items-center justify-center mb-4">
                <cap.icon className="w-5 h-5 text-foreground/60" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Frameworks */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Frameworks y regulaciones</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Experiencia comprobada en los estándares más exigentes.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {frameworks.map((fw) => (
            <div key={fw.name} className={`bg-card border border-border rounded-xl p-5 ${accent.hoverBorder} transition-colors`}>
              <h3 className="font-semibold text-foreground mb-1 text-sm">{fw.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{fw.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Proceso</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Del assessment a la certificación. Acompañamiento completo.</p>
        </div>
        <div className="space-y-4">
          {process.map((p) => (
            <div key={p.step} className={`bg-card border border-border rounded-xl p-5 flex items-start gap-4 ${accent.hoverBorder} transition-colors`}>
              <span className="text-2xl font-extrabold text-foreground/15">{p.step}</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          ¿Tu programa de seguridad está listo para la próxima auditoría?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Solicita un assessment de madurez y obtén un roadmap claro para cerrar gaps.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-foreground/10 transition-all duration-500">
            Solicitar assessment
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/contacto" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
            Hablar con un consultor
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Gobernanza;
