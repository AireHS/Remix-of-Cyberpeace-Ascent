import { Eye, Globe, AlertTriangle, Database, ChevronRight, ArrowRight, Search, Radio, Shield, FileText } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

const capabilities = [
  { icon: Eye, title: 'Dark Web Monitoring', desc: 'Rastreamos foros, marketplaces y canales de Telegram en busca de credenciales filtradas, datos robados y menciones a tu organización.' },
  { icon: Globe, title: 'Brand Monitoring', desc: 'Detección de dominios de phishing, cuentas falsas en redes sociales y suplantación de identidad corporativa en tiempo real.' },
  { icon: AlertTriangle, title: 'IOC Feeds', desc: 'Feeds de Indicadores de Compromiso personalizados e integrados directamente a tu SIEM/EDR para detección automatizada.' },
  { icon: Database, title: 'Reportes de Inteligencia', desc: 'Informes semanales y ad-hoc sobre amenazas relevantes a tu sector, con recomendaciones accionables y contexto.' },
  { icon: Search, title: 'Threat Hunting', desc: 'Búsqueda proactiva de amenazas en tu infraestructura basada en inteligencia de TTPs y campañas activas.' },
  { icon: Radio, title: 'Early Warning System', desc: 'Alertas tempranas sobre vulnerabilidades zero-day, campañas dirigidas a tu sector y filtraciones de datos.' },
];

const sources = [
  'Dark Web Forums', 'Telegram Channels', 'Paste Sites', 'Code Repositories',
  'Social Media', 'Threat Actor Infrastructure', 'Malware Sandboxes', 'OSINT Feeds',
];

const deliverables = [
  { title: 'Daily Brief', desc: 'Resumen diario de amenazas relevantes a tu organización y sector.' },
  { title: 'Weekly Report', desc: 'Informe semanal con análisis de tendencias, IOCs y recomendaciones.' },
  { title: 'Flash Alerts', desc: 'Alertas inmediatas ante amenazas críticas que requieren acción urgente.' },
  { title: 'Monthly Executive', desc: 'Reporte ejecutivo mensual con métricas, tendencias y postura de riesgo.' },
];

const ThreatIntelligence = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Capacidades
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6 leading-[1.1]">
          Anticípate a las amenazas.<br />
          <span className="gradient-text">Inteligencia en tiempo real.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
          Monitorea la dark web, detecta filtraciones y obtén contexto sobre los actores de amenaza que apuntan a tu organización.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm">
            Solicitar acceso CTI <ChevronRight className="w-4 h-4" />
          </Link>
          <a href="#capacidades" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-muted/60 transition-all duration-300">
            Ver capacidades
          </a>
        </div>
      </div>
    </section>

    {/* Capabilities */}
    <section id="capacidades" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4 text-center">Capacidades CTI</h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">Inteligencia accionable para decisiones informadas</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors duration-300 group">
              <c.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-105 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-foreground mb-3">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Sources */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl text-foreground mb-4">Fuentes de inteligencia</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12">+150 fuentes monitoreadas en tiempo real</p>
        <div className="flex flex-wrap justify-center gap-3">
          {sources.map((s) => (
            <span key={s} className="px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:border-primary/30 transition-colors duration-300">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* Deliverables */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-4 text-center">Entregables</h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Información estructurada con cadencia definida</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverables.map((d) => (
            <div key={d.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors duration-300">
              <FileText className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
          ¿Sabes si tus credenciales ya están filtradas?
        </h2>
        <p className="text-muted-foreground mb-10">
          Solicita un análisis de exposición gratuito y descubre qué información de tu organización circula en la dark web.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300">
            Solicitar análisis gratuito <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/contacto" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-muted/60 transition-all duration-300">
            Hablar con un especialista CTI
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default ThreatIntelligence;
