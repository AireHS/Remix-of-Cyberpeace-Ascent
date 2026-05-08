import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoWatchguard from '@/assets/logo-watchguard.png';
import logoWazuh from '@/assets/logo-wazuh.png';
import logoMicrosoft from '@/assets/logo-microsoft.png';
import logoGoogle from '@/assets/logo-google.png';
import logoSentinelone from '@/assets/logo-sentinelone.png';
import logoTrendmicro from '@/assets/logo-trendmicro.png';
import logoLumu from '@/assets/logo-lumu.png';
import logoAxur from '@/assets/logo-axur.png';
import logoPaloalto from '@/assets/logo-paloalto.png';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'Microsoft', logo: logoMicrosoft },
  { name: 'Google', logo: logoGoogle },
  { name: 'SentinelOne', logo: logoSentinelone },
  { name: 'Trend Micro', logo: logoTrendmicro },
  { name: 'Palo Alto Networks', logo: logoPaloalto },
  { name: 'Wazuh', logo: logoWazuh },
  { name: 'WatchGuard', logo: logoWatchguard },
  { name: 'Lumu', logo: logoLumu },
  { name: 'Axur', logo: logoAxur },
];

const PartnersStrip = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 border-y border-border bg-muted/20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-[11px] text-foreground/40 uppercase tracking-[0.25em] font-semibold mb-10">
          Partners &amp; Alianzas Tecnológicas
        </p>

        <div className="flex items-center justify-center gap-10 md:gap-14 flex-wrap">
          {partners.map((p) => (
            <div key={p.name} className="group flex items-center justify-center">
              <img
                src={p.logo}
                alt={p.name}
                className="h-7 md:h-9 object-contain grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersStrip;
