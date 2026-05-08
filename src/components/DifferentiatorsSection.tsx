import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    number: '01',
    title: 'Contexto, no solo alertas',
    body: 'No competimos en herramientas. Competimos en el análisis que convierte una alerta en una decisión ejecutiva con contexto de negocio.',
  },
  {
    number: '02',
    title: 'SOC que razona, no que escala',
    body: 'Analistas L3 con threat hunting proactivo. Identificamos lo que las reglas automatizadas no ven — antes de que genere impacto operativo.',
  },
  {
    number: '03',
    title: 'Cinco pilares, una plataforma',
    body: 'Del monitoreo al cumplimiento. De la detección a la respuesta. Todo integrado en SOC360.',
  },
];

const DifferentiatorsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal reveal — cards scroll horizontally on a sticky container
      const cards = ref.current?.querySelectorAll('.diff-sticky-card');
      if (!cards || cards.length === 0) return;

      // Each card fades in dramatically
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: 100, scale: 0.9, filter: 'blur(15px)', rotateY: 8 },
          { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', rotateY: 0,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            delay: i * 0.15
          }
        );
      });

      // Giant text parallax
      gsap.to('.diff-giant-text', {
        x: -200,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });

      // Number counter effect
      cards.forEach((card) => {
        const num = card.querySelector('.diff-number');
        if (num) {
          gsap.fromTo(num,
            { opacity: 0, scale: 3, filter: 'blur(20px)' },
            { opacity: 0.06, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 85%', once: true }
            }
          );
        }
      });

      // Line animation
      gsap.fromTo('.diff-accent-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power4.inOut',
          scrollTrigger: { trigger: '.diff-accent-line', start: 'top 90%', once: true }
        }
      );

      // Quote parallax
      gsap.fromTo('.quote-container',
        { opacity: 0, y: 80, filter: 'blur(20px)', scale: 0.9 },
        { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.quote-container', start: 'top 80%', once: true }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      {/* Differentiators — editorial style */}
      <section className="py-32 relative overflow-hidden" style={{ perspective: '1200px' }}>
        {/* Giant moving background text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none overflow-hidden w-full">
          <p className="diff-giant-text font-display font-black text-foreground/[0.02] whitespace-nowrap" style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}>
            CYBERPEACE · RESILIENCIA · CYBERPEACE · RESILIENCIA
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section header — minimal Apple style */}
          <div className="mb-20">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-4">Por qué nosotros</p>
            <h2 className="font-display font-bold text-foreground tracking-tight max-w-2xl" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.08 }}>
              Lo que nos hace <span className="gradient-text">diferentes.</span>
            </h2>
          </div>

          <div className="diff-accent-line origin-left h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent mb-16" />

          {/* Cards — large editorial layout */}
          <div className="space-y-0">
            {differentiators.map((d, i) => (
              <div
                key={d.number}
                className="diff-sticky-card group relative border-b border-border/40 py-12 md:py-16 cursor-default"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background number */}
                <span className="diff-number absolute -top-4 right-0 md:right-8 font-display font-black text-foreground/[0.03] select-none pointer-events-none" style={{ fontSize: 'clamp(6rem, 14vw, 12rem)', lineHeight: 1 }}>
                  {d.number}
                </span>

                <div className="relative z-10 grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-1">
                    <span className="text-primary font-display font-bold text-sm">{d.number}</span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display font-bold text-foreground text-xl md:text-2xl tracking-tight group-hover:text-primary transition-colors duration-500">
                      {d.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                      {d.body}
                    </p>
                    {/* Hover accent line */}
                    <div className="w-0 h-px bg-primary mt-6 group-hover:w-24 transition-all duration-700 ease-out" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote — cinematic */}
      <section className="py-24 dark-accent-section relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[140px] pointer-events-none" />
        </div>

        <div className="quote-container max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
          <div className="mb-8">
            <div className="w-12 h-px bg-primary/40 mx-auto mb-8" />
            <Quote className="w-6 h-6 text-primary/40 mx-auto" />
          </div>
          <blockquote className="text-xl md:text-2xl lg:text-3xl text-[hsl(0_0%_96%)] font-display font-medium leading-[1.4] mb-10" style={{ textWrap: 'balance' } as React.CSSProperties}>
            "Su capacidad de detección en minutos y la profundidad de sus analistas superan cualquier servicio MDR que hayamos evaluado."
          </blockquote>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20">
              <span className="text-xs font-bold text-primary">CF</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[hsl(0_0%_96%)]">CISO</p>
              <p className="text-[11px] text-[hsl(220_15%_65%)]">Sector Financiero · LATAM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DifferentiatorsSection;
