import { AlertTriangle, Shield, Clock, Users, FileText, ArrowRight, Check, Phone, Lock, Target, Cpu, Server, Mail, Activity, Eye, Layers, Brain, Zap, ClipboardList } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import firstLogo from '@/assets/first-logo.png';
import isoLogo from '@/assets/iso-27001-logo.png';

/* ═══ Accent: Red-blue dual tone ═══ */
const red = 'hsl(0 72% 51%)';
const blue = 'hsl(215 80% 55%)';

/* ═══ Benefits / Differentiators / Capabilities from mega menu ═══ */
const benefits = [
  'Contención rápida para limitar el blast radius',
  'Diagnóstico claro del alcance y sistemas comprometidos',
  'Identificación del vector de acceso inicial',
  'Recuperación controlada con menor riesgo de reinfección',
  'Restablecimiento de operación en el menor tiempo posible',
];

const differentiators = [
  'Experiencia en incidentes de alto impacto (ransomware, fraude, intrusiones)',
  'Gestión de crisis con ejecución técnica directa, no solo advisory',
  'Enfoque basado en evidencia: timeline y análisis de artefactos',
  'Operación en entornos productivos sin interrumpir operación crítica',
  'Soporte en notificación y reporte a reguladores y aseguradoras',
];

const capabilitiesList = [
  { icon: Zap, title: 'Contención y erradicación', desc: 'Aislamiento en endpoint, red e identidad con playbooks probados.' },
  { icon: Cpu, title: 'Adquisición y análisis forense', desc: 'Análisis de memoria, disco y logs con preservación de evidencia.' },
  { icon: Clock, title: 'Reconstrucción del ataque', desc: 'Timeline completo con TTPs y kill chain del adversario.' },
  { icon: Eye, title: 'Persistencia y movimiento lateral', desc: 'Identificación de lateralización, exfiltración y backdoors.' },
  { icon: Lock, title: 'Compromiso de credenciales', desc: 'Análisis de AD / IAM, Kerberoasting y privilege escalation.' },
  { icon: Shield, title: 'Hardening post-incidente', desc: 'Validación de limpieza, mejora de controles y lecciones aprendidas.' },
];

const metrics = [
  { value: '<1h', label: 'Activación', desc: 'Tiempo de movilización del equipo CSIRT' },
  { value: '24/7', label: 'Disponibilidad', desc: 'Equipo on-call para emergencias' },
  { value: '+500', label: 'Incidentes', desc: 'Gestionados en los últimos 3 años' },
  { value: '98%', label: 'Contención', desc: 'En las primeras 4 horas de activación' },
];

const process = [
  { step: '01', title: 'Preparación', desc: 'Onboarding del retainer, documentación de tu entorno, playbooks personalizados y canales de comunicación de emergencia.' },
  { step: '02', title: 'Detección y Análisis', desc: 'Triaje inicial, determinación de alcance, análisis de indicadores de compromiso y clasificación de severidad.' },
  { step: '03', title: 'Contención', desc: 'Aislamiento de sistemas afectados, bloqueo de vectores de ataque activos y preservación de evidencia digital.' },
  { step: '04', title: 'Erradicación', desc: 'Eliminación completa de la amenaza, verificación de persistencia y limpieza de artefactos maliciosos.' },
  { step: '05', title: 'Recuperación', desc: 'Restauración controlada de servicios, validación de integridad y monitoreo intensivo post-incidente.' },
  { step: '06', title: 'Lecciones Aprendidas', desc: 'RCA documentado, recomendaciones priorizadas y actualización de playbooks y controles.' },
];

const incidentTypes = [
  { title: 'Ransomware', desc: 'Contención de cifrado activo, negociación informada y recuperación con o sin pago.', icon: Lock },
  { title: 'Business Email Compromise', desc: 'Investigación de suplantación de identidad, fraude financiero y compromiso de cuentas.', icon: Mail },
  { title: 'Data Breach', desc: 'Análisis de exfiltración, determinación de alcance y acompañamiento en notificación regulatoria.', icon: Eye },
  { title: 'Supply Chain Attack', desc: 'Investigación de compromisos vía terceros, actualizaciones maliciosas y accesos no autorizados.', icon: Layers },
  { title: 'Insider Threat', desc: 'Análisis de actividad de usuarios privilegiados, exfiltración de IP y sabotaje interno.', icon: Target },
  { title: 'Cloud Compromise', desc: 'Investigación de accesos anómalos en AWS, Azure y GCP. Análisis de configuraciones expuestas.', icon: Server },
];

const frameworks = ['NIST SP 800-61r3', 'ISO 27035', 'MITRE ATT&CK', 'Cyber Kill Chain', 'SANS Incident Handling', 'FIRST CSIRT Standards'];

const CPCSIRT = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute pointer-events-none" style={{ width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle, ${red} / 0.05, transparent 65%)`, top: '-25%', left: '50%', transform: 'translateX(-50%)' }} />
      {/* Dual accent line: red to blue */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${red}, ${blue}, transparent)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-3 text-[11px] font-semibold text-destructive mb-8 px-5 py-2 rounded-full border border-destructive/20 bg-destructive/[0.06] uppercase tracking-[0.15em]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
          </span>
          Incident Response · CSIRT
        </div>

        <h1 className="font-display font-extrabold text-foreground mb-6 tracking-[-0.035em] max-w-4xl mx-auto" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: 1.08 }}>
          Cuando cada minuto cuenta,<br />
          <span className="bg-gradient-to-r from-[hsl(0_72%_51%)] to-[hsl(215_80%_55%)] bg-clip-text text-transparent">ya estamos respondiendo.</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          Equipo CSIRT dedicado listo para contener incidentes, preservar evidencia y recuperar 
          tu operación con rapidez, control y trazabilidad forense.
        </p>
        <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10">
          No esperes a tener un incidente para buscar ayuda. Con nuestro retainer, 
          cuando suceda, ya tendrás un equipo que conoce tu entorno.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className="group inline-flex items-center gap-3 bg-destructive text-destructive-foreground px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-destructive/25 transition-all duration-500">
            Reportar un incidente
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/contacto" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
            Contratar retainer
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="https://www.first.org/members/teams/cyberpeace_ir_unit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-card/80 border border-border rounded-xl px-5 py-3 hover:border-primary/30 transition-colors">
            <img src={firstLogo} alt="FIRST.org Member" className="h-8" />
            <div className="text-left">
              <p className="text-xs font-semibold text-foreground">Miembro de FIRST.org</p>
              <p className="text-[10px] text-muted-foreground">Forum of Incident Response and Security Teams</p>
            </div>
            <ArrowRight size={14} className="text-muted-foreground ml-1" />
          </a>
          <div className="flex items-center gap-3 bg-card/80 border border-border rounded-xl px-5 py-3">
            <img src={isoLogo} alt="ISO/IEC 27001" className="h-10" />
            <div className="text-left">
              <p className="text-xs font-semibold text-foreground">ISO/IEC 27001</p>
              <p className="text-[10px] text-muted-foreground">Organización Certificada en Seguridad de la Información</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Metrics */}
    <section className="py-16 border-t border-border bg-card/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-card border border-border rounded-xl p-5 text-center hover:border-destructive/30 transition-colors">
              <p className="text-2xl md:text-3xl font-extrabold text-destructive mb-1">{m.value}</p>
              <p className="text-sm font-semibold text-foreground mb-1">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══ BENEFITS + DIFFERENTIATORS ═══ */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-medium text-destructive uppercase tracking-widest mb-3 block">Por qué elegirnos</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Beneficios y diferenciadores</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-destructive/[0.03] border border-destructive/15 rounded-2xl p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-destructive mb-6">Beneficios</h3>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[hsl(215_80%_55%/0.03)] border border-[hsl(215_80%_55%/0.15)] rounded-2xl p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[hsl(215_80%_55%)] mb-6">Diferenciadores</h3>
            <ul className="space-y-3">
              {differentiators.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(215_80%_55%)] shrink-0 mt-2" />
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
          <span className="text-xs font-medium text-primary uppercase tracking-widest mb-3 block">Capacidades</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            Respuesta técnica integral
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilitiesList.map((cap) => (
            <div key={cap.title} className="bg-card border border-border rounded-xl p-6 hover:border-destructive/20 hover:shadow-[0_8px_30px_-8px_hsl(0_72%_51%/0.08)] transition-all duration-300 group">
              <div className="w-11 h-11 rounded-lg bg-destructive/8 flex items-center justify-center mb-4">
                <cap.icon className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Proceso de respuesta</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Basado en NIST SP 800-61r3, adaptado a tu contexto.</p>
        </div>
        <div className="space-y-4">
          {process.map((p) => (
            <div key={p.step} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 hover:border-destructive/20 transition-colors">
              <span className="text-2xl font-extrabold text-destructive/30">{p.step}</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Incident Types */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Tipos de incidentes que gestionamos</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {incidentTypes.map((inc) => (
            <div key={inc.title} className="bg-card border border-border rounded-xl p-5 hover:border-destructive/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                  <inc.icon className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{inc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{inc.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Frameworks */}
    <section className="py-20 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">Frameworks de referencia</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {frameworks.map((fw) => (
            <span key={fw} className="bg-card border border-border rounded-full px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/30 transition-colors">{fw}</span>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
          ¿Tienes un plan de respuesta a incidentes probado?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          El 77% de las organizaciones no tiene un plan de IR formalizado.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-500">
            Evaluar mi preparación
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link to="/contacto" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-card transition-all duration-300">
            Solicitar retainer
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default CPCSIRT;
