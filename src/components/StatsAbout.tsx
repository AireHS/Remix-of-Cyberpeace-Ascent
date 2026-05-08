import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Shield } from 'lucide-react';
import dashboardImg from '@/assets/dashboard-threat.jpg';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  { title: 'Elige la tecnología que necesites', desc: 'Sin límites de herramientas. Nos das acceso a tu software de seguridad — nosotros lo hacemos funcionar mejor.' },
  { title: 'Gestiona amenazas con transparencia', desc: 'Total transparencia sobre qué pasó, cuándo, por qué y cómo prevenirlo en el futuro.' },
  { title: 'Reportes transparentes y ejecutivos', desc: 'Recibe reportes personalizados sobre la situación de seguridad dentro de tu organización.' },
  { title: 'Ahorra presupuesto', desc: 'Sin necesidad de crear tu propio equipo de expertos en ciberseguridad ni gastar en MDR in-house.' },
  { title: 'Threat Hunting proactivo', desc: 'No esperes alertas. Analizamos y buscamos continuamente indicadores que señalen nuevas amenazas.' },
  { title: 'Alcanza cumplimiento normativo', desc: 'Todas las certificaciones que necesitas: SOC 2, ISO 27001, PCI DSS y más.' },
  { title: 'Monitoreo en tiempo real 24/7', desc: 'Endpoints, red, infraestructura cloud, logs y más — las 24 horas, los 365 días.' },
  { title: 'Detecta y responde más rápido', desc: 'Reduce el tiempo de detección y respuesta en toda tu infraestructura de TI.' },
  { title: 'Automatiza la respuesta', desc: 'Responde inmediatamente a amenazas con playbooks de respuesta a incidentes predefinidos.' },
];

const StatsAbout = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to('.stats-parallax-img', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });

      // Title with clip-path wipe
      gsap.fromTo('.stats-title-block',
        { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: '.stats-title-block', start: 'top 88%' }
        }
      );

      // Cards with 3D-like perspective stagger
      const cards = ref.current?.querySelectorAll('.advantage-item');
      if (cards) {
        gsap.fromTo(cards, 
          { opacity: 0, y: 50, rotateX: 15 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current?.querySelector('.advantages-grid'), start: 'top 85%' },
          }
        );
      }

      // Floating metrics parallax
      gsap.to('.stats-metrics-float', {
        y: -20,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="porquecyberpeace" className="py-32 px-6 lg:px-8" style={{ perspective: '1000px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="stats-title-block">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
              <Shield className="w-3.5 h-3.5" />
              ¿Por qué Cyberpeace?
            </span>
            <h2 className="text-foreground font-display font-extrabold tracking-[-0.03em] mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
              Convierte tu ciberseguridad en una <span className="gradient-text">fortaleza</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              No te conviertas en víctima de ciberataques planificados. Construye una capa protectora sólida en tu nube, endpoints, red y todo tu stack de TI.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/30 hidden lg:block">
            <img src={dashboardImg} alt="Dashboard de seguridad" className="stats-parallax-img w-full aspect-[16/10] object-cover scale-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            <div className="stats-metrics-float absolute bottom-4 left-4 right-4 flex gap-2">
              {[
                { val: '99%', label: 'Reducción FP' },
                { val: '24/7', label: 'Monitoreo' },
                { val: '+150', label: 'Clientes' },
              ].map((m) => (
                <div key={m.label} className="flex-1 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center border border-border/50">
                  <p className="text-sm font-bold text-foreground">{m.val}</p>
                  <p className="text-[10px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="advantages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {advantages.map((a, i) => (
            <div key={i} className="advantage-item flex gap-4 p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card hover:border-primary/20 hover:shadow-sm transition-all duration-500 group" style={{ transformStyle: 'preserve-3d' }}>
              <div className="w-6 h-6 rounded-lg bg-primary/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/15 transition-colors duration-500">
                <Check size={12} className="text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm mb-1.5">{a.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsAbout;
