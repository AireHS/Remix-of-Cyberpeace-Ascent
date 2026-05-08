import { useEffect, useRef } from 'react';
import { ArrowRight, Shield, AlertTriangle, Crosshair, Eye, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Shield,
    title: 'Detección e Investigación Continua',
    tagline: 'Detección e investigación continua 24/7 para reducir dwell time y acelerar contención.',
    bullets: ['Monitoreo y Operación de SIEM', 'Triage e Investigación de Alertas', 'Threat Hunting', 'Ingeniería de Detección', 'Contención y Respuesta Inicial'],
    link: '/soc-360',
    linkLabel: 'Conocer SOC/MDR',
    accent: 'from-primary/20 to-primary/5',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response y Forense',
    tagline: 'Contención de incidentes, preservación de evidencia y recuperación operativa.',
    bullets: ['Incident Response', 'DFIR / Forense Digital', 'Retainer de Respuesta', 'Tabletop Exercises', 'Gestión de Crisis Cibernética'],
    link: '/cpcsirt',
    linkLabel: 'Conocer IR & DFIR',
    accent: 'from-orange-500/15 to-orange-500/5',
  },
  {
    icon: Crosshair,
    title: 'Exposición, Validación y Remediación',
    tagline: 'Rutas de ataque reales, priorización de riesgos explotables y remediación acompañada.',
    bullets: ['Pentesting', 'Attack Surface Management', 'Gestión de Vulnerabilidades', 'Seguridad en Nube y APIs', 'Threat Modeling'],
    link: '/red-teaming',
    linkLabel: 'Conocer Offensive Security',
    accent: 'from-red-500/15 to-red-500/5',
  },
  {
    icon: Eye,
    title: 'Threat Intelligence y Riesgo Externo',
    tagline: 'Monitoreo de amenazas, actores y exposición externa que impactan tu operación.',
    bullets: ['Threat Intelligence', 'Brand Protection', 'Dark Web Monitoring', 'Fraude e Impersonación', 'Exposición Externa'],
    link: '/brand-protection',
    linkLabel: 'Conocer Threat Intel',
    accent: 'from-cyan-500/15 to-cyan-500/5',
  },
  {
    icon: Scale,
    title: 'Cumplimiento, Riesgo y Madurez',
    tagline: 'Seguridad alineada con regulaciones, auditorías y continuidad del negocio.',
    bullets: ['Assessments de Madurez', 'Gap Assessments Regulatorios', 'Roadmaps de Remediación', 'Riesgo de Terceros', 'Preparación para Auditorías'],
    link: '/compliance',
    linkLabel: 'Conocer GRC',
    accent: 'from-emerald-500/15 to-emerald-500/5',
  },
];

const ProductsSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.products-title',
        { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: '.products-title', start: 'top 88%', once: true } }
      );

      const cards = ref.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50, rotateX: 8, filter: 'blur(4px)' },
          { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current?.querySelector('.products-grid'), start: 'top 82%', once: true } }
        );
      }

      ref.current?.querySelectorAll('.product-card').forEach((card) => {
        const el = card as HTMLElement;
        const glare = el.querySelector('.product-glare') as HTMLElement;
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(el, { rotateY: x * 10, rotateX: -y * 10, duration: 0.4, ease: 'power2.out' });
          if (glare) {
            gsap.to(glare, {
              opacity: 1,
              background: `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, hsl(215 80% 50% / 0.08), transparent 60%)`,
              duration: 0.3,
            });
          }
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
          if (glare) gsap.to(glare, { opacity: 0, duration: 0.4 });
        });
      });

      gsap.to('.products-orb', {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-28 border-t border-border relative overflow-hidden aurora-bg" style={{ perspective: '1200px' }}>
      <div className="products-orb absolute -top-32 right-[5%] w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[100px] pointer-events-none" />
      <div className="products-orb absolute -bottom-20 left-[10%] w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-[0.2em]">
            Resultados, no catálogos
          </span>
          <h2 className="products-title font-display font-bold text-3xl md:text-5xl text-foreground text-center mb-6 tracking-tight">
            Cómo ayudamos a tu organización
          </h2>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
            Cinco pilares diseñados para cubrir todo el ciclo de vida de la ciberseguridad — desde la prevención hasta la recuperación.
          </p>
        </div>

        {/* Top row: 3 cards */}
        <div className="products-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {pillars.slice(0, 3).map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="product-card relative bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors duration-500 flex flex-col group overflow-hidden gradient-border-card shine-on-hover card-glow-hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="product-glare absolute inset-0 rounded-2xl opacity-0 pointer-events-none transition-opacity duration-300" />
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.accent} rounded-t-2xl`} />

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground">{p.title}</h3>
                  </div>
                  <p className="text-[13px] text-muted-foreground mb-5">{p.tagline}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.bullets.map((b) => (
                      <li key={b} className="text-sm text-muted-foreground flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={p.link}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    {p.linkLabel}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="products-grid grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pillars.slice(3).map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="product-card relative bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors duration-500 flex flex-col group overflow-hidden gradient-border-card shine-on-hover card-glow-hover"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="product-glare absolute inset-0 rounded-2xl opacity-0 pointer-events-none transition-opacity duration-300" />
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.accent} rounded-t-2xl`} />

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground">{p.title}</h3>
                  </div>
                  <p className="text-[13px] text-muted-foreground mb-5">{p.tagline}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.bullets.map((b) => (
                      <li key={b} className="text-sm text-muted-foreground flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={p.link}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    {p.linkLabel}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
