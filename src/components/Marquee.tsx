import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  'Gobierno Federal', 'Sector Financiero', 'Telecomunicaciones', 'Energía',
  'Retail', 'Healthcare', 'Manufactura', 'Seguros', 'Educación', 'Tecnología',
];

const MarqueeSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.marquee-label',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 95%' }
        }
      );
      gsap.fromTo('.marquee-track',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 92%' }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const row = clients.map((item, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span className="flex items-center gap-2.5">
        <Shield className="w-3.5 h-3.5 text-primary/40" />
        <span className="text-foreground/50 uppercase tracking-[0.2em] text-[11px] font-semibold">
          {item}
        </span>
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
    </span>
  ));

  return (
    <div ref={ref} className="w-full overflow-hidden py-10 bg-muted/40">
      <div className="section-divider mb-8" />
      <p className="marquee-label text-center text-[11px] text-foreground/40 uppercase tracking-[0.25em] font-semibold mb-6">
        Equipos de seguridad que confían en nosotros
      </p>
      <div className="marquee-track flex gap-8 animate-marquee w-max">
        {row}
        {row}
      </div>
      <div className="section-divider mt-8" />
    </div>
  );
};

export default MarqueeSection;
