import { ArrowRight, Brain, Layers, Workflow, Search, ShieldCheck, GitBranch, BarChart3, Zap, Lock, Eye, Target, Radio, Clock, CheckCircle2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

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

const pillars = [
  {
    icon: Search,
    title: 'Correlación contextual',
    desc: 'Enriquecimiento automático de alertas con contexto de negocio, identidad, geolocalización y postura de riesgo. Cada señal se evalúa en función de su impacto real.',
  },
  {
    icon: Eye,
    title: 'Investigación guiada',
    desc: 'Flujos de investigación estructurados que aceleran el análisis de causa raíz, reduciendo la dependencia del conocimiento individual del especialista.',
  },
  {
    icon: Workflow,
    title: 'Playbooks dinámicos',
    desc: 'Orquestación de respuesta adaptativa que ajusta acciones en función del tipo de incidente, severidad y contexto operativo — sin rigidez de runbooks estáticos.',
  },
  {
    icon: GitBranch,
    title: 'Trazabilidad y control',
    desc: 'Registro completo de cada decisión, acción y escalamiento. Auditoría continua para cumplimiento regulatorio y visibilidad ejecutiva.',
  },
];

const capabilities = [
  { icon: Brain, title: 'Priorización basada en riesgo', desc: 'Scoring dinámico que pondera criticidad del activo, exposición y contexto de amenaza para que tu equipo se enfoque en lo que importa.' },
  { icon: Zap, title: 'Contención automatizada', desc: 'Ejecución de acciones de contención en EDR, firewall e IAM en menos de 60 segundos desde la confirmación del incidente.' },
  { icon: Layers, title: 'Normalización multi-fuente', desc: 'Ingesta y normalización de +100 fuentes de telemetría en un modelo de datos unificado para correlación cruzada.' },
  { icon: BarChart3, title: 'Dashboards operativos', desc: 'Visibilidad en tiempo real de métricas clave: MTTD, MTTI, MTTR, cobertura MITRE ATT&CK y tendencias de riesgo.' },
  { icon: ShieldCheck, title: 'Validación continua', desc: 'Verificación constante de que las reglas de detección cubren las tácticas y técnicas relevantes para tu industria.' },
  { icon: Lock, title: 'Decisiones auditables', desc: 'Cada acción automatizada queda documentada con justificación, contexto y resultado — lista para auditoría o revisión post-incidente.' },
];

const howItWorks = [
  { step: '01', title: 'Ingesta y normalización', desc: 'Neuma recibe telemetría de todas tus fuentes — SIEM, EDR, NDR, cloud, identidad — y la normaliza en un modelo de datos común.' },
  { step: '02', title: 'Enriquecimiento contextual', desc: 'Cada evento se enriquece con inteligencia de amenazas, contexto de negocio, criticidad de activo y postura de riesgo.' },
  { step: '03', title: 'Correlación y priorización', desc: 'Los algoritmos de Neuma correlacionan señales dispersas, eliminan falsos positivos y priorizan por impacto real al negocio.' },
  { step: '04', title: 'Investigación y respuesta', desc: 'Flujos guiados aceleran la investigación. Playbooks dinámicos ejecutan contención y remediación de forma coordinada.' },
];

const Neuma = () => (
  <PageLayout>
    {/* ═══ HERO ═══ */}
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute pointer-events-none" style={{ width: 900, height: 900, borderRadius: '50%', background: accent.glow, top: '-30%', left: '50%', transform: 'translateX(-50%)' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(215_80%_55%/0.3)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-3 text-[11px] font-semibold ${accent.text} mb-8 px-5 py-2 rounded-full ${accent.border} ${accent.bgLight} uppercase tracking-[0.15em]`}>
            <Brain className="w-3.5 h-3.5" />
            Capa de inteligencia de SOC360
          </div>

          <h1 className="font-display font-extrabold text-foreground mb-6 tracking-[-0.035em]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: 1.08 }}>
            Neuma: el motor que<br />
            <span className="bg-gradient-to-r from-[hsl(215_80%_55%)] to-[hsl(200_70%_50%)] bg-clip-text text-transparent">piensa, decide y actúa.</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            Capa de decisión, investigación y automatización que potencia SOC360
            con contexto, priorización inteligente y respuesta guiada.
          </p>
          <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10">
            Neuma no reemplaza a tu equipo — lo amplifica. Transforma datos dispersos
            en decisiones accionables y reduce el tiempo entre detección y contención.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacto" className="group inline-flex items-center gap-3 bg-[hsl(215_80%_55%)] text-white px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(215_80%_55%/0.25)] transition-all duration-500">
              Solicitar demo de Neuma
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/soc-360" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
              Ver SOC360 completo
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ═══ POSITIONING BANNER ═══ */}
    <section className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`${accent.bgLighter} border ${accent.border} rounded-2xl p-8 md:p-12 text-center`}>
          <p className={`text-xs font-medium ${accent.text} uppercase tracking-widest mb-4`}>Parte integral de SOC360</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4 max-w-3xl mx-auto">
            SOC360 opera. Neuma decide.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Mientras SOC360 gestiona la operación de seguridad 24/7, Neuma es la capa que aporta
            inteligencia contextual, automatización adaptativa y trazabilidad completa a cada decisión operativa.
          </p>
        </div>
      </div>
    </section>

    {/* ═══ 4 PILLARS ═══ */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`text-xs font-medium ${accent.text} uppercase tracking-widest mb-3 block`}>Pilares</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Cuatro capacidades estratégicas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Neuma se estructura en cuatro pilares que trabajan de forma integrada para reducir riesgo y acelerar la respuesta.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className={`bg-card border border-border rounded-xl p-8 ${accent.hoverBorder} ${accent.shadow} transition-all duration-300`}>
              <div className={`w-12 h-12 rounded-xl ${accent.bgLight} flex items-center justify-center mb-5`}>
                <p.icon className={`w-5 h-5 ${accent.text}`} />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ HOW IT WORKS ═══ */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`text-xs font-medium ${accent.text} uppercase tracking-widest mb-3 block`}>Proceso</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Cómo opera Neuma
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            De la telemetría cruda a la acción coordinada — en minutos, no en horas.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, i) => (
            <div key={step.step} className="relative">
              <div className={`text-5xl font-black bg-gradient-to-b ${accent.gradient} bg-clip-text text-transparent opacity-20 mb-4`}>
                {step.step}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-3 w-6 h-[2px] bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ CAPABILITIES GRID ═══ */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`text-xs font-medium ${accent.text} uppercase tracking-widest mb-3 block`}>Capacidades</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Lo que Neuma hace posible
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada capacidad está diseñada para amplificar a tu equipo de seguridad y reducir la brecha entre detección y respuesta.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div key={cap.title} className={`bg-card border border-border rounded-xl p-6 ${accent.hoverBorder} ${accent.shadow} transition-all duration-300`}>
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

    {/* ═══ DIFFERENTIATORS ═══ */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className={`text-xs font-medium ${accent.text} uppercase tracking-widest mb-3 block`}>Diferenciadores</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
              Por qué Neuma es diferente
            </h2>
            <ul className="space-y-4">
              {[
                'No es un SOAR tradicional — es una capa de decisión con contexto',
                'Adaptativa: los playbooks evolucionan con cada incidente',
                'Diseñada para equipos reales, no para laboratorios',
                'Integrada nativamente con SOC360, sin integraciones frágiles',
                'Trazabilidad completa para auditoría y cumplimiento',
                'Reduce carga operativa sin sacrificar control humano',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className={`w-4 h-4 ${accent.text} shrink-0 mt-0.5`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${accent.bgLighter} border ${accent.border} rounded-2xl p-8`}>
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl ${accent.bgLight} flex items-center justify-center`}>
                  <Brain className={`w-5 h-5 ${accent.text}`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Neuma Engine</p>
                  <p className="text-xs text-muted-foreground">Orquestación inteligente</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Contención', value: '<60s' },
                  { label: 'Cobertura ATT&CK', value: '94%' },
                  { label: 'Automatización L1', value: '90%' },
                  { label: 'Falsos positivos', value: '-85%' },
                ].map((m) => (
                  <div key={m.label} className="bg-card border border-border rounded-lg p-4 text-center">
                    <p className={`text-lg font-bold ${accent.text}`}>{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══ CTA ═══ */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          Potencia tu operación de seguridad con Neuma
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Descubre cómo la capa inteligente de SOC360 puede transformar la forma en que tu equipo detecta, investiga y responde.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className="group inline-flex items-center gap-3 bg-[hsl(215_80%_55%)] text-white px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(215_80%_55%/0.25)] transition-all duration-500">
            Solicitar demo
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/soc-360" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
            Explorar SOC360
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Neuma;
