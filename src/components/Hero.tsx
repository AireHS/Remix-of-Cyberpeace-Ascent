import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import logoCyberpeace from '@/assets/logo-cyberpeace-hero.png';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);




/* ═══ Interactive Cyberpeace Logo ═══ */
const AnimatedLogo = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!logoRef.current) return;
    const el = logoRef.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current = {
        x: (e.clientX - cx) / rect.width,
        y: (e.clientY - cy) / rect.height,
      };
    };
    window.addEventListener('mousemove', handleMove);

    const ctx = gsap.context(() => {
      // Logo entrance
      gsap.fromTo('.logo-main-img',
        { opacity: 0, scale: 0.6, filter: 'blur(20px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, delay: 0.4, ease: 'power3.out' }
      );

      // Data nodes entrance
      gsap.fromTo('.data-node',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.8, ease: 'back.out(2)' }
      );

      // Pulse rings
      gsap.to('.pulse-ring', {
        scale: 1.8,
        opacity: 0,
        duration: 3,
        repeat: -1,
        stagger: { each: 1, repeat: -1 },
        ease: 'power1.out',
      });

      // Orbit rings rotate
      gsap.to('.orbit-ring-1', { rotation: 360, duration: 25, repeat: -1, ease: 'none' });
      gsap.to('.orbit-ring-2', { rotation: -360, duration: 35, repeat: -1, ease: 'none' });
      gsap.to('.orbit-ring-3', { rotation: 360, duration: 45, repeat: -1, ease: 'none' });

      // Orbiting dots
      gsap.to('.orbit-dot', {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
        stagger: { each: 1.5, from: 'start' },
      });

      // Interactive tilt on mouse
      gsap.ticker.add(() => {
        const { x, y } = mouseRef.current;
        gsap.to('.logo-tilt-layer', { rotateY: x * 12, rotateX: -y * 12, duration: 0.8, ease: 'power2.out' });
        gsap.to('.rings-parallax', { x: x * 15, y: y * 15, duration: 1, ease: 'power2.out' });
        gsap.to('.nodes-parallax', { x: x * -10, y: y * -10, duration: 1.2, ease: 'power2.out' });
      });

      // Floating
      gsap.to('.logo-float-wrap', { y: -10, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, el);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={logoRef} className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map(i => (
          <div key={i} className="pulse-ring absolute w-48 h-48 rounded-full border-2 border-primary/20" />
        ))}
      </div>

      {/* Orbit rings with parallax */}
      <div className="rings-parallax absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="orbit-ring-1 absolute w-[340px] h-[340px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--primary) / 0.12)" strokeWidth="0.8" strokeDasharray="6 4" />
          <circle cx="100" cy="10" r="3" fill="hsl(var(--primary) / 0.5)" />
        </svg>
        <svg className="orbit-ring-2 absolute w-[260px] h-[260px]" viewBox="0 0 200 200">
          <polygon points="100,15 175,57 175,143 100,185 25,143 25,57" fill="none" stroke="hsl(var(--primary) / 0.10)" strokeWidth="0.6" strokeDasharray="4 6" />
          <circle cx="100" cy="15" r="2.5" fill="hsl(var(--primary) / 0.4)" />
        </svg>
        <svg className="orbit-ring-3 absolute w-[420px] h-[420px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="92" fill="none" stroke="hsl(var(--primary) / 0.06)" strokeWidth="0.5" strokeDasharray="2 8" />
          <circle cx="100" cy="8" r="2" fill="hsl(var(--primary) / 0.3)" />
        </svg>
      </div>

      {/* Orbiting dots */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="orbit-dot absolute" style={{ width: 180 + i * 30, height: 180 + i * 30, transformOrigin: 'center' }}>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-primary/30" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 10px hsl(var(--primary) / 0.3)' }} />
          </div>
        ))}
      </div>

      {/* Main logo — static, large, with tilt */}
      <div className="logo-float-wrap relative z-10">
        <div className="logo-tilt-layer" style={{ transformStyle: 'preserve-3d' }}>
          {/* Glow behind logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-56 rounded-full bg-primary/[0.08] blur-[60px]" />
          </div>
          <img
            src={logoCyberpeace}
            alt="Cyberpeace"
            className="logo-main-img w-64 md:w-72 lg:w-80 object-contain relative z-10 drop-shadow-[0_0_40px_hsl(var(--primary)/0.25)]"
          />
        </div>
      </div>


      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[25%] right-[25%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" style={{ animation: 'logo-scan 4s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes logo-scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo('.hero-badge', { opacity: 0, y: 15, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.hero-title', { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, delay: 0.2, ease: 'power4.out' });
      gsap.fromTo('.hero-sub', { opacity: 0, y: 20, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, delay: 0.45, ease: 'power3.out' });
      gsap.fromTo('.hero-btns', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.55, ease: 'power3.out' });
      gsap.fromTo('.hero-logo-panel', { opacity: 0, scale: 0.85, filter: 'blur(15px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.4, delay: 0.3, ease: 'power3.out' });

      // Scroll-driven fade out — quick
      gsap.to('.hero-content-parallax', {
        y: -50, opacity: 0, filter: 'blur(6px)', scale: 0.97,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: '10% top', end: '40% top', scrub: 0.5 }
      });

      // Parallax orbs
      gsap.to('.parallax-orb-1', { y: -120, rotation: 15, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 } });
      gsap.to('.parallax-orb-2', { y: -80, x: 30, rotation: -10, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 2 } });
      gsap.to('.hero-animated-grid', { backgroundPositionY: '160px', ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex items-center overflow-hidden pt-16">
      <div className="hero-animated-grid absolute inset-0 animated-grid opacity-30 pointer-events-none" />
      <div className="parallax-orb-1 absolute pointer-events-none" style={{ width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, hsl(215 90% 42% / 0.08), transparent 65%)', top: '-25%', left: '-20%' }} />
      <div className="parallax-orb-2 absolute pointer-events-none" style={{ width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, hsl(230 70% 55% / 0.06), transparent 65%)', bottom: '-15%', right: '-15%' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full hero-content-parallax">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="hero-badge inline-flex items-center gap-2.5 text-[11px] font-semibold text-primary mb-10 px-4 py-2 rounded-full border border-primary/20 bg-primary/[0.06] opacity-0 uppercase tracking-[0.15em]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Nuevo estándar en ciberseguridad gestionada
            </span>

            <h1 className="hero-title font-display font-extrabold tracking-[-0.04em] mb-8 opacity-0" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1.02 }}>
              <span className="text-foreground">Operar bajo<br />ataque es la nueva </span>
              <span className="gradient-text">normalidad.</span>
            </h1>

            <p className="hero-sub text-muted-foreground max-w-lg mb-10 opacity-0 text-lg leading-[1.75]">
              La diferencia entre un incidente y una crisis es el tiempo de detección y respuesta.
            </p>

            <div className="hero-btns flex flex-wrap gap-4 mb-8 opacity-0">
              <Link to="/partners#registro" className="group bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-500 inline-flex items-center gap-2 shine-on-hover active:scale-[0.97]">
                Solicitar demo
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/capacidades" className="border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-muted transition-all duration-300 active:scale-[0.97]">
                Ver capacidades
              </Link>
            </div>
          </div>

          <div className="hero-logo-panel opacity-0 relative min-h-[400px] lg:min-h-[500px]">
            <AnimatedLogo />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
