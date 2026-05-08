import { Activity, Shield, Cpu, Globe, BarChart3, Lock, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const Plataforma = () => (
  <PageLayout>
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Plataforma
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
          Nuestra <span className="gradient-text">Plataforma</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
          Tecnología propia que integra detección, respuesta y visibilidad en un solo ecosistema de seguridad.
        </p>
        <a href="#contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
          Solicitar Demo <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Activity, title: 'Monitoreo en Tiempo Real', desc: 'Correlación de eventos de múltiples fuentes con detección basada en IA.' },
            { icon: Shield, title: 'Respuesta Automatizada', desc: 'Playbooks SOAR que reducen el tiempo de contención de horas a minutos.' },
            { icon: Cpu, title: 'Machine Learning', desc: 'Modelos de detección de anomalías entrenados con millones de eventos.' },
            { icon: Globe, title: 'Multi-Cloud', desc: 'Visibilidad unificada de AWS, Azure, GCP y entornos on-premise.' },
            { icon: BarChart3, title: 'Dashboards Ejecutivos', desc: 'Métricas de seguridad: MTTD, MTTR, trending de amenazas.' },
            { icon: Lock, title: 'Integración Nativa', desc: 'Conecta con tu stack de seguridad existente sin fricciones.' },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
              <f.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Plataforma;
