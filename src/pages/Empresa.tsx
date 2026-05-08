import { Users, Target, Award, MapPin, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

const Empresa = () => (
  <PageLayout>
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Empresa
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
          Sobre <span className="gradient-text">Cyberpeace</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Somos una empresa de ciberseguridad fundada con la misión de proteger a organizaciones en Latinoamérica y Europa contra amenazas digitales.
        </p>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Users, title: 'Nuestro Equipo', desc: 'Profesionales certificados con experiencia en defensa y ataque.' },
            { icon: Target, title: 'Misión', desc: 'Democratizar la ciberseguridad de clase mundial para LATAM.' },
            { icon: Award, title: 'Certificaciones', desc: 'ISO 27001, SOC 2 Type II, CREST, y más.' },
            { icon: MapPin, title: 'Presencia', desc: 'Operaciones en México, Colombia, Chile y España.' },
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

    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl text-foreground mb-6">¿Quieres ser parte del equipo?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Estamos buscando talento apasionado por la ciberseguridad.</p>
        <Link to="/carreras" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
          Ver Vacantes <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </PageLayout>
);

export default Empresa;
