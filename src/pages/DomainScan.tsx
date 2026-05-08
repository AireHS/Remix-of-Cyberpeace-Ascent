import { Search, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const DomainScan = () => (
  <PageLayout>
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Herramienta Gratuita
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
          Escanea tu <span className="gradient-text">Dominio</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          Descubre tu superficie de ataque en minutos. Análisis gratuito de subdominios, puertos expuestos, certificados SSL y más.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="tuempresa.com"
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            Escanear <ChevronRight className="w-4 h-4" />
          </button>
        </form>
        <p className="text-xs text-muted-foreground">Resultados en menos de 60 segundos. No se requiere registro.</p>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-12 text-center">¿Qué analizamos?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Subdominios', desc: 'Descubrimos todos los subdominios asociados a tu dominio principal.' },
            { title: 'Puertos Abiertos', desc: 'Identificamos servicios expuestos a internet que podrían ser vectores de ataque.' },
            { title: 'Certificados SSL', desc: 'Verificamos validez, configuración y fortaleza de tus certificados.' },
            { title: 'DNS & Email', desc: 'SPF, DKIM, DMARC y configuraciones que previenen spoofing.' },
          ].map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default DomainScan;
