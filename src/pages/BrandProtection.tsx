import { Eye, Shield, Globe, AlertTriangle, Search, ArrowRight, Check, Lock, Target, Brain, Activity, Users, Mail, Server, Radio, FileWarning, TrendingDown } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

/* ═══ Accent: Amber/Yellow tones — hsl(45 90% 48%) ═══ */
const accent = {
  text: 'text-[hsl(45_90%_48%)]',
  bg: 'bg-[hsl(45_90%_48%)]',
  bgLight: 'bg-[hsl(45_90%_48%/0.1)]',
  bgLighter: 'bg-[hsl(45_90%_48%/0.04)]',
  border: 'border-[hsl(45_90%_48%/0.2)]',
  hoverBorder: 'hover:border-[hsl(45_90%_48%/0.35)]',
  shadow: 'hover:shadow-[0_8px_30px_-8px_hsl(45_90%_48%/0.15)]',
  glow: 'radial-gradient(circle, hsl(45 90% 48% / 0.06), transparent 65%)',
};

/* ═══ Mega menu content ═══ */
const benefits = [
  'Detección temprana de fraude, suplantación y filtraciones',
  'Reducción de impacto financiero y reputacional',
  'Identificación de campañas y patrones de fraude',
  'Visibilidad sobre exposición de usuarios y activos críticos',
  'Contención y eliminación de infraestructura maliciosa',
];

const differentiators = [
  'Detección, investigación y acción (no solo monitoreo)',
  'Análisis de campañas: actores, infraestructura y modus operandi',
  'Capacidad de atribución y entendimiento del fraude',
  'Integración de inteligencia externa con hunting interno',
  'Ejecución de takedown y respuesta operativa',
];

const capabilitiesList = [
  { icon: Search, title: 'Detección de fraude, phishing e impersonación', desc: 'Vigilancia integral de phishing sites, dominios similares y uso no autorizado de tu identidad corporativa.' },
  { icon: Lock, title: 'Credenciales comprometidas e infostealers', desc: 'Monitoreo continuo de credenciales filtradas en dark web markets y canales de infostealers.' },
  { icon: Brain, title: 'Hunting e investigación de campañas', desc: 'Investigación de actores, infraestructura de ataque y patrones operativos del fraude.' },
  { icon: Globe, title: 'Exposición en deep/dark web', desc: 'Análisis de foros, marketplaces y canales de comunicación en deep y dark web.' },
  { icon: Shield, title: 'Takedown de infraestructura maliciosa', desc: 'Eliminación de contenido fraudulento, notificación a registrars y seguimiento hasta resolución.' },
  { icon: Target, title: 'Análisis de causa raíz', desc: 'Patrones operativos del fraude, atribución y recomendaciones de prevención.' },
];

const stats = [
  { value: '<24h', label: 'Takedown promedio' },
  { value: '97%', label: 'Tasa de éxito en eliminaciones' },
  { value: '+150', label: 'Fuentes monitoreadas' },
  { value: '24/7', label: 'Monitoreo continuo' },
];

const useCases = [
  { title: 'Protección de marca', desc: 'Una empresa de retail detectó 43 sitios de phishing imitando su tienda online. Todos eliminados en menos de 48h.', icon: Shield },
  { title: 'Credenciales filtradas', desc: 'Un banco identificó 12,000 credenciales de empleados en dark web markets. Rotación proactiva antes del abuso.', icon: Lock },
  { title: 'Fraude ejecutivo', desc: 'Una aseguradora detectó perfiles falsos de su CEO en LinkedIn y WhatsApp usados para estafas de inversión.', icon: Users },
  { title: 'Supply chain intel', desc: 'Una farmacéutica recibió alertas tempranas de un compromiso en un proveedor crítico 72h antes de la divulgación pública.', icon: Target },
];

const BrandProtection = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute pointer-events-none" style={{ width: 800, height: 800, borderRadius: '50%', background: accent.glow, top: '-25%', left: '50%', transform: 'translateX(-50%)' }} />
      {/* Amber accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(45_90%_48%/0.35)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className={`inline-flex items-center gap-3 text-[11px] font-semibold ${accent.text} mb-8 px-5 py-2 rounded-full ${accent.border} ${accent.bgLight} uppercase tracking-[0.15em]`}>
          Protección de Marca · Riesgo Digital
        </div>

        <h1 className="font-display font-extrabold text-foreground mb-6 tracking-[-0.035em] max-w-4xl mx-auto" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: 1.08 }}>
          Lo que no puedes ver<br />
          <span className="bg-gradient-to-r from-[hsl(45_90%_48%)] to-[hsl(35_85%_52%)] bg-clip-text text-transparent">sí puede afectarte.</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          Monitoreamos amenazas, actores y exposición externa que pueden impactar tu marca, 
          tus usuarios y tu operación — antes de que se conviertan en incidentes.
        </p>
        <p className="text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10">
          Inteligencia accionable. No reportes genéricos. Alertas contextualizadas 
          para tu industria, tu geografía y tu perfil de riesgo.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className="group inline-flex items-center gap-3 bg-[hsl(45_90%_48%)] text-[hsl(45_10%_10%)] px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(45_90%_48%/0.25)] transition-all duration-500">
            Solicitar assessment
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
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Lo que monitoreamos y ejecutamos</h2>
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

    {/* Use Cases */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">Casos reales</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Resultados concretos que demuestran el valor de la inteligencia proactiva.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((uc) => (
            <div key={uc.title} className={`bg-card border border-border rounded-xl p-6 ${accent.hoverBorder} transition-colors`}>
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-lg ${accent.bgLight} flex items-center justify-center shrink-0`}>
                  <uc.icon className={`w-5 h-5 ${accent.text}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
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
          ¿Sabes qué se dice de tu organización en la dark web?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Solicita un assessment de exposición externa y descubre lo que los atacantes ya saben sobre ti.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contacto" className="group inline-flex items-center gap-3 bg-[hsl(45_90%_48%)] text-[hsl(45_10%_10%)] px-8 py-3.5 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[hsl(45_90%_48%/0.25)] transition-all duration-500">
            Solicitar assessment gratuito
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

export default BrandProtection;
