import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import logoCyberpeace from '@/assets/logo-cyberpeace-hero.png';
import { Link } from 'react-router-dom';
import HeroVisual from './HeroVisual';

gsap.registerPlugin(ScrollTrigger);



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
      <HeroVisual />
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
