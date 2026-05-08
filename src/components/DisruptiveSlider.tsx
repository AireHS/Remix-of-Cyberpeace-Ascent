import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, Shield, AlertTriangle, Crosshair, Eye, Scale, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    icon: Shield,
    label: 'SOC / MDR Gestionado',
    headline: 'Reducción\nradical.',
    subline: 'Monitoreo 24/7 con threat hunting, ingeniería de detección y contención automatizada. Tu SOC operando antes de que el atacante avance.',
    stat: { value: '95%', label: 'Reducción MTTD' },
    features: ['Monitoreo SIEM 24x7', 'Threat Hunting', 'Ingeniería de Detección', 'Contención Inicial'],
    link: '/soc-360',
  },
  {
    id: 2,
    icon: AlertTriangle,
    label: 'Incident Response',
    headline: 'Cada segundo\ncuenta.',
    subline: 'Contención de incidentes, preservación de evidencia y recuperación operativa con rapidez, control y trazabilidad forense.',
    stat: { value: '80%', label: 'Reducción MTTR' },
    features: ['Incident Response', 'DFIR / Forense', 'Tabletop Exercises', 'Gestión de Crisis'],
    link: '/cpcsirt',
  },
  {
    id: 3,
    icon: Crosshair,
    label: 'Exposición y Validación',
    headline: 'Atacamos antes\nde que lo hagan.',
    subline: 'Identificamos rutas de ataque reales, priorizamos riesgos explotables y acompañamos la remediación antes del incidente.',
    stat: { value: '0-day', label: 'Hunting' },
    features: ['Pentesting', 'Attack Surface Mgmt', 'Seguridad Cloud', 'Threat Modeling'],
    link: '/red-teaming',
  },
  {
    id: 4,
    icon: Eye,
    label: 'Threat Intelligence',
    headline: 'Tu marca.\nBajo vigilancia.',
    subline: 'Monitoreamos amenazas, actores y exposición externa que pueden impactar tu marca, tus usuarios y tu operación.',
    stat: { value: '24/7', label: 'Vigilancia' },
    features: ['Threat Intel', 'Brand Protection', 'Dark Web', 'Fraude e Impersonación'],
    link: '/brand-protection',
  },
  {
    id: 5,
    icon: Scale,
    label: 'Cumplimiento y Madurez',
    headline: 'Cumplimiento\nsin fricción.',
    subline: 'Alineamos capacidades de seguridad con regulaciones, auditorías y objetivos de continuidad del negocio.',
    stat: { value: '100%', label: 'Compliance' },
    features: ['Assessments de Madurez', 'Gap Regulatorio', 'Riesgo de Terceros', 'vCISO'],
    link: '/compliance',
  },
];

/* Animated concentric rings */
const ConcentricRings = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[320, 240, 160, 90].map((size, i) => (
      <div
        key={size}
        className="absolute rounded-full border transition-all duration-1000"
        style={{
          width: size,
          height: size,
          borderColor: i < 2 ? 'hsl(220 16% 84% / 0.4)' : 'hsl(215 90% 42% / 0.15)',
          transform: active ? `scale(1) rotate(${i * 15}deg)` : 'scale(0.8)',
          opacity: active ? 1 : 0,
          transitionDelay: `${i * 100}ms`,
        }}
      />
    ))}
    <div
      className="absolute w-20 h-20 rounded-full bg-primary/[0.08] transition-all duration-700"
      style={{ transform: active ? 'scale(1)' : 'scale(0)', opacity: active ? 1 : 0 }}
    >
      <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-40" />
    </div>
  </div>
);

const ScanLine = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
    <div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      style={{ animation: 'scan-line 4s ease-in-out infinite' }}
    />
  </div>
);

const PanelParticles = () => {
  const dots = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 10 + Math.random() * 80,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 4,
    dur: 6 + Math.random() * 8,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            animation: `float-slow ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const DisruptiveSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  const animateSlide = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || !slideRef.current) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tl.to(slideRef.current, {
      clipPath: direction === 'next' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
      filter: 'blur(16px)',
      scale: 0.97,
      duration: 0.5,
      ease: 'power3.in',
    });

    tl.call(() => {
      setCurrent((prev) => {
        if (direction === 'next') return (prev + 1) % slides.length;
        return (prev - 1 + slides.length) % slides.length;
      });
    });

    tl.fromTo(slideRef.current,
      {
        clipPath: direction === 'next' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
        filter: 'blur(16px)',
        scale: 1.03,
      },
      {
        clipPath: 'inset(0 0% 0 0%)',
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.65,
        ease: 'power3.out',
      }
    );

    tl.fromTo(
      slideRef.current.querySelectorAll('.slide-animate'),
      { opacity: 0, y: 25, filter: 'blur(4px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.07, ease: 'power3.out' },
      '-=0.35'
    );

    tl.fromTo('.stat-value',
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' },
      '-=0.4'
    );

    tl.fromTo('.feature-pill',
      { opacity: 0, x: 20, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out' },
      '-=0.3'
    );

  }, [isAnimating]);

  const goNext = useCallback(() => animateSlide('next'), [animateSlide]);
  const goPrev = useCallback(() => animateSlide('prev'), [animateSlide]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNav('next');
      if (e.key === 'ArrowLeft') handleNav('prev');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    autoplayRef.current = setInterval(goNext, 6000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [goNext]);

  const handleNav = (dir: 'next' | 'prev') => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    animateSlide(dir);
    autoplayRef.current = setInterval(goNext, 6000);
  };

  useEffect(() => {
    if (!progressRef.current) return;
    gsap.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 6, ease: 'none' }
    );
  }, [current]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Apple-style: blur + scale reveal
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 80, filter: 'blur(20px)', scale: 0.92 },
        { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 85%', once: true } }
      );

      // Parallax — slider card moves slightly on scroll
      gsap.to(containerRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
      });

      // Illuminate heading words
      const headingWords = containerRef.current?.querySelectorAll('.slider-illuminate');
      if (headingWords) {
        gsap.fromTo(headingWords,
          { color: 'hsl(220 12% 65%)', opacity: 0.3 },
          { color: 'hsl(var(--foreground))', opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: headingWords[0], start: 'top 90%', once: true } }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const slide = slides[current];
  const SlideIcon = slide.icon;
  const nextSlide = slides[(current + 1) % slides.length];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, hsl(215 90% 42% / 0.06) 0%, hsl(220 20% 98%) 30%, hsl(220 20% 98%) 60%, hsl(215 90% 42% / 0.08) 100%)',
      }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-full" style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 50%, hsl(215 90% 42% / 0.07), transparent), radial-gradient(ellipse 60% 80% at 80% 30%, hsl(230 70% 55% / 0.05), transparent)',
          animation: 'gradient-drift 12s ease-in-out infinite alternate',
        }} />
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes gradient-drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
          100% { transform: translate(-20px, 15px) scale(1.02); }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.04] blur-[150px] animate-float-slow" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[120px] animate-float-slow-reverse" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-[1] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Cómo ayudamos
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
            {'Cinco pilares de resiliencia cibernética'.split(' ').map((word, i) => (
              <span key={i} className="slider-illuminate inline-block mr-[0.3em]">{word}</span>
            ))}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Del monitoreo al cumplimiento. De la detección a la respuesta. Todo integrado.
          </p>
        </div>

        <div className="relative">
          <div
            ref={slideRef}
            className="relative bg-card border border-border rounded-3xl overflow-hidden min-h-[460px] md:min-h-[520px]"
          >
            <ScanLine />
            <div className="absolute top-4 right-6 md:top-6 md:right-10 font-display font-black text-[9rem] md:text-[14rem] leading-none text-foreground/[0.02] select-none pointer-events-none transition-all duration-700">
              {String(current + 1).padStart(2, '0')}
            </div>

            <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none overflow-hidden rounded-tr-3xl">
              <div className="absolute top-0 right-0 w-[400px] h-px bg-gradient-to-l from-primary/20 to-transparent rotate-[-35deg] origin-top-right" />
            </div>

            <div className="relative z-10 grid md:grid-cols-5 h-full">
              <div className="md:col-span-3 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="slide-animate flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
                    <SlideIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-[0.15em] block">{slide.label}</span>
                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Cyberpeace</span>
                  </div>
                </div>

                <h3 className="slide-animate font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-foreground tracking-tight leading-[0.92] mb-6 whitespace-pre-line">
                  {slide.headline}
                </h3>

                <p className="slide-animate text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mb-8">
                  {slide.subline}
                </p>

                <div className="slide-animate flex flex-wrap gap-2 mb-10">
                  {slide.features.map((f) => (
                    <span key={f} className="feature-pill inline-flex items-center gap-1.5 text-xs font-medium text-foreground/70 px-3.5 py-1.5 rounded-lg bg-muted/60 border border-border/60">
                      <CheckCircle className="w-3 h-3 text-primary/60" />
                      {f}
                    </span>
                  ))}
                </div>

                <div className="slide-animate flex items-center gap-4">
                  <Link
                    to={slide.link}
                    className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 active:scale-[0.97]"
                  >
                    Explorar
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contacto"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1"
                  >
                    Solicitar demo
                    <span className="text-primary">→</span>
                  </Link>
                </div>
              </div>

              <div ref={ringsRef} className="md:col-span-2 relative flex items-center justify-center p-8 md:p-12 border-l border-border/30">
                <PanelParticles />
                <ConcentricRings active={!isAnimating} />

                <div className="relative text-center z-10">
                  <span className="stat-value block font-display font-black text-6xl md:text-7xl lg:text-8xl gradient-text tabular-nums mb-2">
                    {slide.stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground uppercase tracking-[0.25em] font-medium block mb-6">
                    {slide.stat.label}
                  </span>
                  <div className="w-8 h-px bg-primary/30 mx-auto mb-4" />
                  <div className="flex items-center gap-2 justify-center opacity-40 hover:opacity-70 transition-opacity duration-300 cursor-pointer" onClick={() => handleNav('next')}>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Siguiente</span>
                    <span className="text-[10px] text-foreground/50 font-medium">{nextSlide.label}</span>
                  </div>
                </div>

                <div className="absolute top-6 right-6 grid grid-cols-4 gap-1 opacity-15">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-primary" />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/30">
              <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 origin-left rounded-full"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="hidden md:flex items-center gap-1">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    if (i === current || isAnimating) return;
                    if (autoplayRef.current) clearInterval(autoplayRef.current);
                    animateSlide(i > current ? 'next' : 'prev');
                    setCurrent(i);
                    autoplayRef.current = setInterval(goNext, 6000);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-400 ${
                    i === current
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex md:hidden items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i === current || isAnimating) return;
                    if (autoplayRef.current) clearInterval(autoplayRef.current);
                    animateSlide(i > current ? 'next' : 'prev');
                    setCurrent(i);
                    autoplayRef.current = setInterval(goNext, 6000);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground/30'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm font-mono">
                <span className="text-foreground font-bold text-lg">{String(current + 1).padStart(2, '0')}</span>
                <span className="text-border/60">/</span>
                <span className="text-muted-foreground/50">{String(slides.length).padStart(2, '0')}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleNav('prev')}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center hover:bg-muted hover:border-primary/20 transition-all duration-300 active:scale-[0.95] disabled:opacity-30"
                  aria-label="Previous"
                >
                  <ArrowLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => handleNav('next')}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-xl border border-border bg-primary/5 flex items-center justify-center hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 active:scale-[0.95] disabled:opacity-30"
                  aria-label="Next"
                >
                  <ArrowRight className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisruptiveSlider;
