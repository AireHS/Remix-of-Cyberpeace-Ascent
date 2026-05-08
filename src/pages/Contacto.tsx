import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const Contacto = () => (
  <PageLayout>
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Contacto
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
          <span className="gradient-text">Contáctanos</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          ¿Listo para fortalecer tu postura de seguridad? Nuestro equipo está aquí para ayudarte.
        </p>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Mail, title: 'Email', desc: 'contacto@cyberpeace.com', link: 'mailto:contacto@cyberpeace.com' },
            { icon: Phone, title: 'Teléfono', desc: '+52 (55) 1234-5678', link: 'tel:+525512345678' },
            { icon: MapPin, title: 'Oficinas', desc: 'Ciudad de México, CDMX', link: '#' },
          ].map((c) => (
            <a key={c.title} href={c.link} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors text-center">
              <c.icon className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </a>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
              <input type="email" placeholder="Email" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <input type="text" placeholder="Empresa" className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            <textarea placeholder="¿Cómo podemos ayudarte?" rows={4} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none" />
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
              Enviar Mensaje <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Contacto;
