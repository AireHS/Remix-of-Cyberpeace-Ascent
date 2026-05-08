import { Shield, Eye, Crosshair, AlertTriangle, Scale, ChevronRight, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

const pillars = [
  {
    icon: Shield,
    title: 'Detección e Investigación Continua',
    tagline: 'Reducción drástica de MTTD y MTTR.',
    desc: 'Detección e investigación continua para reducir dwell time, acelerar contención y fortalecer la resiliencia operativa. Threat Intelligence integrado y monitoreo basado en riesgo.',
    href: '/soc-360',
    highlights: ['Monitoreo y Operación de SIEM', 'Triage e Investigación de Alertas', 'Threat Hunting proactivo', 'Ingeniería de Detección', 'Contención y Respuesta Inicial', 'Scoring de Riesgo en Tiempo Real'],
    color: 'primary',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response y Forense Digital',
    tagline: 'Cuando cada minuto cuenta.',
    desc: 'Contenemos incidentes, preservamos evidencia y recuperamos tu operación con rapidez, control y trazabilidad forense.',
    href: '/cpcsirt',
    highlights: ['Incident Response 24/7', 'DFIR / Forense Digital', 'Retainer de Respuesta', 'Tabletop Exercises', 'Gestión de Crisis Cibernética', 'Post-Incident Review'],
    color: 'destructive',
  },
  {
    icon: Crosshair,
    title: 'Exposición, Validación y Remediación',
    tagline: 'Atacamos antes que ellos.',
    desc: 'Identificamos rutas de ataque reales, priorizamos riesgos explotables y acompañamos la remediación antes de que se conviertan en incidentes.',
    href: '/red-teaming',
    highlights: ['Pentesting (Black/Grey/White)', 'Attack Surface Management', 'Gestión de Vulnerabilidades', 'Seguridad en Nube', 'Seguridad de Apps y APIs', 'Remediation Advisory'],
    color: 'primary',
  },
  {
    icon: Eye,
    title: 'Threat Intelligence y Riesgo Externo',
    tagline: 'Lo que no ves sí puede afectarte.',
    desc: 'Monitoreamos amenazas, actores y exposición externa que pueden impactar tu marca, tus usuarios y tu operación.',
    href: '/brand-protection',
    highlights: ['Threat Intelligence', 'Brand Protection', 'Dark Web Monitoring', 'Monitoreo de Fraude', 'Inteligencia de Exposición Externa'],
    color: 'primary',
  },
  {
    icon: Scale,
    title: 'Cumplimiento, Riesgo y Madurez',
    tagline: 'Seguridad que el negocio entiende.',
    desc: 'Alineamos capacidades de seguridad con requerimientos regulatorios, auditorías, terceros y objetivos de continuidad del negocio.',
    href: '/compliance',
    highlights: ['Assessments de Madurez', 'Gap Assessments Regulatorios', 'Roadmaps de Remediación', 'Riesgo de Terceros', 'Preparación para Auditorías', 'Gobierno de Seguridad'],
    color: 'primary',
  },
];

const Capacidades = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-8 px-5 py-2 rounded-full border border-primary/20 bg-primary/[0.06] uppercase tracking-[0.15em]">
          Cómo ayudamos
        </div>
        <h1 className="font-display font-extrabold text-foreground mb-6 tracking-[-0.035em] max-w-4xl mx-auto" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: 1.08 }}>
          Cinco pilares para proteger<br />
          <span className="gradient-text">lo que más importa.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Cobertura completa del ciclo de ciberseguridad: desde la detección continua 
          hasta el cumplimiento regulatorio. Resultados medibles, no promesas.
        </p>
      </div>
    </section>

    {/* Pillars */}
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {pillars.map((pillar, idx) => (
          <div key={pillar.title} className={`flex flex-col lg:flex-row gap-10 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.color === 'destructive' ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                  <pillar.icon className={`w-6 h-6 ${pillar.color === 'destructive' ? 'text-destructive' : 'text-primary'}`} />
                </div>
              </div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{pillar.tagline}</p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">{pillar.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{pillar.desc}</p>
              <Link
                to={pillar.href}
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Conocer más
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Lo que incluye</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pillar.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${pillar.color === 'destructive' ? 'bg-destructive' : 'bg-primary'}`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          ¿Por dónde empezar?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Cada organización tiene un punto de partida diferente. Conversemos sobre 
          tus prioridades y diseñemos un plan a tu medida.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-500">
            Hablar con un especialista
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/soc-360" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
            Conocer SOC360
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Capacidades;
