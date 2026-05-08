import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Eye, Search, AlertTriangle, Lock, Zap, ArrowUpRight } from 'lucide-react';
import heroShield from '@/assets/hero-shield.jpg';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Shield, title: 'Detección e Investigación Continua 24/7', desc: 'No recibas alertas. Recibe respuestas claras sobre qué, cuándo y dónde sucedió.' },
  { icon: Eye, title: 'Equipo Experto Concierge', desc: 'Acceso 24/7 a analistas galardonados para investigar, priorizar y remediar.' },
  { icon: Zap, title: 'Automatización de Respuesta', desc: 'Aísla y neutraliza amenazas en minutos con playbooks y enriquecimiento de IA.' },
  { icon: Lock, title: 'Automatización de Cumplimiento', desc: 'Simplifica el proceso con templates pre-construidos para SOC 2, ISO 27001 y más.' },
  { icon: Search, title: 'Superficie de Ataque', desc: 'Monitorea tu exposición externa, credenciales comprometidas y menciones en Dark Web.' },
  { icon: AlertTriangle, title: 'Postura de Seguridad', desc: 'Dashboards intuitivos y reportes ejecutivos que demuestran el ROI a tu C-level.' },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.services-parallax-img', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });

      gsap.fromTo('.services-title', 
        { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' }, 
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: '.services-title', start: 'top 90%' }
        }
      );

      const cards = sectionRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(cards, 
          { opacity: 0, y: 80, scale: 0.95 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current?.querySelector('.services-grid'), start: 'top 85%' },
          }
        );
      }

      gsap.fromTo('.services-cta', 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-cta', start: 'top 92%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="py-32 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
            Nuestros Servicios
          </span>
          <h2 className="services-title text-foreground font-display font-extrabold tracking-[-0.03em] max-w-2xl" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
            Seguridad integral en una <span className="gradient-text">sola plataforma</span>
          </h2>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/30 max-w-md ml-auto hidden lg:block gradient-border-card">
          <img src={heroShield} alt="Cybersecurity" className="services-parallax-img w-full aspect-square object-cover scale-125" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
        </div>
      </div>

      <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border/40 rounded-2xl overflow-hidden">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="service-card p-8 lg:p-10 bg-background hover:bg-muted/40 transition-all duration-500 group relative shine-on-hover">
              <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-primary/15 group-hover:scale-110">
                <Icon size={18} className="text-primary" />
              </div>
              <h3 className="text-foreground font-semibold text-base mb-3 flex items-center gap-2">
                {s.title}
                <ArrowUpRight size={14} className="text-transparent group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="services-cta mt-12">
        <a href="#contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 shine-on-hover active:scale-[0.97]">
          Conocer más
        </a>
      </div>
    </section>
  );
};

export default Services;
