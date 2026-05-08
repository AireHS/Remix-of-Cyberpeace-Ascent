import { BookOpen, Calendar, FileText, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const blogPosts = [
  { title: 'Tendencias de Ransomware en 2026: Lo que debes saber', category: 'Threat Intel', date: 'Mar 15, 2026', readTime: '8 min' },
  { title: 'Cómo implementar Zero Trust en tu organización', category: 'Guía', date: 'Mar 10, 2026', readTime: '12 min' },
  { title: 'El costo real de una brecha de seguridad en LATAM', category: 'Investigación', date: 'Mar 5, 2026', readTime: '6 min' },
  { title: 'SOC as a Service vs SOC interno: Guía de decisión', category: 'Comparativa', date: 'Feb 28, 2026', readTime: '10 min' },
  { title: 'Protegiendo tu cadena de suministro digital', category: 'Best Practices', date: 'Feb 20, 2026', readTime: '7 min' },
  { title: 'NIST CSF 2.0: Cambios clave y cómo adaptarte', category: 'Compliance', date: 'Feb 15, 2026', readTime: '9 min' },
];

const whitepapers = [
  { title: 'Estado de la Ciberseguridad en LATAM 2026', desc: 'Reporte anual con datos de 500+ organizaciones sobre madurez, inversión y principales amenazas.' },
  { title: 'Guía Completa de Respuesta a Ransomware', desc: 'Playbook paso a paso para prevenir, detectar y recuperarse de ataques de ransomware.' },
  { title: 'ROI de un SOC Gestionado', desc: 'Análisis financiero comparativo entre SOC interno, híbrido y fully managed.' },
];

const webinars = [
  { title: 'Threat Hunting 101: De Reactivo a Proactivo', date: 'Mar 25, 2026', status: 'Próximo' },
  { title: 'Implementando ISO 27001 en startups', date: 'Mar 18, 2026', status: 'Grabado' },
  { title: 'IA en Ciberseguridad: Hype vs Realidad', date: 'Mar 4, 2026', status: 'Grabado' },
];

const caseStudies = [
  { industry: 'Fintech', title: 'Reducción de 90% en tiempo de detección', desc: 'Cómo una fintech líder en México logró detección sub-minuto con nuestro SOC 360.' },
  { industry: 'Retail', title: 'Cumplimiento PCI DSS en 90 días', desc: 'Cadena de retail multinacional alcanzó certificación PCI DSS con nuestro acompañamiento.' },
  { industry: 'Gobierno', title: 'Protección de infraestructura crítica', desc: 'Implementación de seguridad OT/IT convergente para entidad gubernamental.' },
];

const Resources = () => (
  <PageLayout>
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Recursos
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
          Centro de <span className="gradient-text">Conocimiento</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Artículos, investigaciones, webinars y casos de éxito para mantenerte al día en ciberseguridad.
        </p>
      </div>
    </section>

    {/* Blog */}
    <section id="blog" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-12">Blog</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-primary font-medium px-2 py-0.5 rounded bg-primary/10">{post.category}</span>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Whitepapers */}
    <section id="whitepapers" className="py-20 bg-card/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-12">Whitepapers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {whitepapers.map((wp) => (
            <div key={wp.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{wp.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{wp.desc}</p>
              <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                Descargar PDF <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Webinars */}
    <section id="webinars" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-12">Webinars</h2>
        <div className="space-y-4">
          {webinars.map((w) => (
            <div key={w.title} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.date}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full self-start ${w.status === 'Próximo' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                {w.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Case Studies */}
    <section id="casos" className="py-20 bg-card/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-12">Casos de Éxito</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div key={cs.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
              <span className="text-xs text-primary font-medium px-2 py-0.5 rounded bg-primary/10">{cs.industry}</span>
              <h3 className="font-semibold text-foreground mt-3 mb-2">{cs.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cs.desc}</p>
              <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                Leer Caso Completo <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Resources;
