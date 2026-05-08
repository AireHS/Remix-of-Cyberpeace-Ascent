import { Shield, AlertTriangle, RefreshCcw, Lock, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const Ransomware = () => (
  <PageLayout>
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-destructive mb-6 px-4 py-1.5 rounded-full border border-destructive/20 bg-destructive/5 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" /> Soluciones
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
          Protección <span className="gradient-text">Ransomware</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
          Prevención, detección y recuperación ante ataques de ransomware. No pagues rescates — prepárate.
        </p>
        <a href="#contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
          Evaluar Mi Riesgo <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-12 text-center">Enfoque de 3 Fases</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Prevención', items: ['Hardening de endpoints y servidores', 'Segmentación de red', 'Email security avanzado', 'Backup immutable storage', 'Security awareness training'] },
            { icon: AlertTriangle, title: 'Detección', items: ['EDR/XDR con behavioral analytics', 'Detección de lateral movement', 'Monitoreo de file integrity', 'Alertas de encryption anómalas', 'Threat intelligence de ransomware groups'] },
            { icon: RefreshCcw, title: 'Recuperación', items: ['Incident response inmediato', 'Contención y aislamiento', 'Restauración de backups', 'Análisis forense', 'Lessons learned y hardening'] },
          ].map((phase) => (
            <div key={phase.title} className="bg-card border border-border rounded-xl p-8">
              <phase.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-4">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Ransomware;
