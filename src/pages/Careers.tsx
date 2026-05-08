import { Briefcase, MapPin, Clock, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const positions = [
  { title: 'SOC Analyst L2', location: 'CDMX / Remoto', type: 'Full-time', dept: 'SOC' },
  { title: 'Threat Intelligence Analyst', location: 'Remoto', type: 'Full-time', dept: 'CTI' },
  { title: 'Penetration Tester Senior', location: 'Remoto', type: 'Full-time', dept: 'Offensive Security' },
  { title: 'GRC Consultant', location: 'Madrid / Remoto', type: 'Full-time', dept: 'ISG' },
  { title: 'Cloud Security Engineer', location: 'Remoto', type: 'Full-time', dept: 'Engineering' },
  { title: 'DevSecOps Engineer', location: 'CDMX / Remoto', type: 'Full-time', dept: 'Engineering' },
];

const perks = [
  '100% Remoto', 'Salario competitivo USD', 'Capacitación y certificaciones', 'Hardware de tu elección',
  'Horario flexible', 'Seguro médico', 'Días ilimitados de vacaciones', 'Equity participation',
];

const Careers = () => (
  <PageLayout>
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Carreras
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
          Construye el futuro de la <span className="gradient-text">ciberseguridad</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Únete a un equipo de expertos apasionados. Trabajo remoto, crecimiento acelerado y la misión de proteger a miles de organizaciones.
        </p>
      </div>
    </section>

    {/* Perks */}
    <section className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {perks.map((perk) => (
            <span key={perk} className="text-sm text-muted-foreground border border-border px-4 py-2 rounded-full bg-card/50">
              {perk}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* Open Positions */}
    <section className="py-20 border-t border-border">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-12 text-center">Posiciones Abiertas</h2>
        <div className="space-y-4">
          {positions.map((pos) => (
            <div key={pos.title} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-colors cursor-pointer group">
              <div>
                <span className="text-xs text-primary font-medium">{pos.dept}</span>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{pos.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {pos.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {pos.type}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Careers;
