import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import heroShield from '@/assets/hero-shield.jpg';

gsap.registerPlugin(ScrollTrigger);

const CTABanner = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.cta-orb', { y: -80, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 2 } });
      gsap.to('.cta-parallax-img', { yPercent: -20, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });

      // Apple-style blur reveal for entire section
      gsap.fromTo(ref.current,
        { opacity: 0, filter: 'blur(15px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }
      );

      // Illuminate title words
      const ctaWords = ref.current?.querySelectorAll('.cta-illuminate');
      if (ctaWords) {
        gsap.fromTo(ctaWords,
          { color: 'hsl(220 15% 45%)', opacity: 0.55 },
          { color: 'hsl(var(--foreground))', opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: ctaWords[0], start: 'top 90%', once: true } }
        );
      }

      gsap.fromTo('.cta-desc', { opacity: 0, y: 30, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.cta-desc', start: 'top 90%', once: true } });
      gsap.fromTo('.cta-buttons', { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: '.cta-buttons', start: 'top 92%', once: true } });
      gsap.fromTo('.cta-img-wrapper', { opacity: 0, scale: 0.85, rotate: -3, filter: 'blur(10px)' }, { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.cta-img-wrapper', start: 'top 88%', once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contacto" className="py-32 px-6 lg:px-8 relative overflow-hidden aurora-bg">
      <div className="absolute inset-0 animated-grid opacity-20 pointer-events-none" />
      <div className="cta-orb absolute pointer-events-none" style={{ width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, hsl(215 90% 42% / 0.1), transparent 65%)', top: '-20%', left: '-10%' }} />
      <div className="cta-orb absolute pointer-events-none" style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, hsl(230 70% 50% / 0.07), transparent 65%)', bottom: '-10%', right: '-10%' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 text-center lg:text-left">
            <h2 className="text-foreground font-display font-extrabold mb-6 tracking-[-0.03em]" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.05 }}>
              {'Nuestros expertos están listos'.split(' ').map((word, i) => (
                <span key={i} className="cta-illuminate inline-block mr-[0.3em]">{word}</span>
              ))}
              {' '}<span className="gradient-text">para ayudarte</span>
            </h2>
            <p className="cta-desc text-muted-foreground max-w-lg mb-10 text-lg leading-relaxed">
              Usa el formulario para demos, consultas de partnership o cualquier pregunta relacionada con la seguridad de tu negocio.
            </p>
            <div className="cta-buttons flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="mailto:ventas@cyberpeace.tech?subject=Me gustaría conocer sus servicios" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 text-sm font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 shine-on-hover active:scale-[0.97]">
                Contactar Ahora
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="tel:+525581115800" className="inline-flex items-center border border-border text-foreground px-10 py-4 text-sm font-semibold rounded-xl hover:bg-muted transition-all duration-300 active:scale-[0.97]">
                +52 55 8111 5800
              </a>
            </div>
          </div>
          <div className="cta-img-wrapper lg:col-span-2 relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-primary/6 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/30 gradient-border-card">
              <img src={heroShield} alt="Cybersecurity Shield" className="cta-parallax-img w-full aspect-square object-cover scale-120" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
