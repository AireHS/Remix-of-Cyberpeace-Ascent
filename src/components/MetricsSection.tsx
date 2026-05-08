import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: '95', unit: '%', label: 'Reducción MTTD', sub: 'vs. promedio industria' },
  { value: '80', unit: '%', label: 'Reducción MTTR', sub: 'Respuesta acelerada' },
  { value: '99.9', unit: '%', label: 'Uptime', sub: 'Disponibilidad' },
  { value: '24', unit: '/7', label: 'Operación', sub: 'Follow-the-Sun' },
];

const MetricsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;

      // Scroll-driven opacity for the giant number
      gsap.fromTo('.hero-metric-value', 
        { scale: 0.3, opacity: 0, filter: 'blur(30px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%', once: true }
        }
      );

      // Stagger the label
      gsap.fromTo('.hero-metric-label',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%', once: true }
        }
      );

      // Scroll-driven parallax scale on the number
      gsap.to('.hero-metric-value', {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top center', end: 'bottom top', scrub: 2 },
      });

      // Bottom metrics grid — stagger reveal
      gsap.fromTo('.metric-item',
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.metrics-row', start: 'top 85%', once: true }
        }
      );

      // Horizontal line grow
      gsap.fromTo('.metric-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.metrics-row', start: 'top 85%', once: true }
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Giant hero metric */}
      <div className="min-h-[70vh] flex flex-col items-center justify-center relative py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.04] blur-[150px]" />
        </div>

        <div className="relative z-10 text-center">
          <div className="hero-metric-value">
            <span className="font-display font-black tracking-[-0.06em] gradient-text" style={{ fontSize: 'clamp(6rem, 18vw, 16rem)', lineHeight: 0.85 }}>
              95%
            </span>
          </div>
          <div className="hero-metric-label mt-6">
            <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto leading-relaxed">
              Reducción en tiempo de detección.
              <br />
              <span className="text-foreground font-semibold">Mientras la industria tarda semanas, nosotros actuamos de inmediato.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="relative pb-20">
        <div className="metric-line origin-left h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-border to-transparent mb-16" />
        
        <div className="metrics-row max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-0">
          {metrics.map((m, i) => (
            <div key={m.label} className={`metric-item text-center py-10 px-6 ${i < metrics.length - 1 ? 'lg:border-r lg:border-border/40' : ''}`}>
              <div className="flex items-baseline justify-center gap-0.5 mb-3">
                <span className="font-display font-black text-5xl md:text-6xl text-foreground tracking-[-0.04em]">{m.value}</span>
                <span className="font-display font-bold text-2xl md:text-3xl text-primary">{m.unit}</span>
              </div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">{m.label}</p>
              <p className="text-[11px] text-muted-foreground/50">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
