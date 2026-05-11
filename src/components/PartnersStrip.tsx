import React from 'react';
import logoWatchguard from '@/assets/logos/watchguard.svg';
import logoWazuh from '@/assets/logos/wazuh.svg';
import logoMicrosoft from '@/assets/logos/microsoft.svg';
import logoGoogle from '@/assets/logos/google.svg';
import logoSentinelone from '@/assets/logos/sentinelone.svg';
import logoTrendmicro from '@/assets/logos/trendmicro.png';
import logoLumu from '@/assets/logos/lumu.jpeg';
import logoAxur from '@/assets/logos/axur.svg';
import logoPaloalto from '@/assets/logos/paloalto.svg';

const logos = [
  { name: "Palo Alto", url: logoPaloalto },
  { name: "SentinelOne", url: logoSentinelone },
  { name: "Trend Micro", url: logoTrendmicro },
  { name: "WatchGuard", url: logoWatchguard },
  { name: "Wazuh", url: logoWazuh },
  { name: "Axur", url: logoAxur },
  { name: "Lumu", url: logoLumu },
  { name: "Microsoft", url: logoMicrosoft },
  { name: "Google", url: logoGoogle },
];

const PartnersStrip = () => {
  // Duplicamos la lista para un scroll infinito fluido
  const displayLogos = [...logos, ...logos];

  return (
    <section className="partners-section">
      <div className="container mx-auto px-6 mb-10 text-center">
        <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">
          Nuestras Alianzas
        </h2>
        <h3 className="text-3xl font-bold text-foreground">Tecnología de Clase Mundial</h3>
      </div>

      <div className="partners-carousel">
        <div className="partners-track">
          {displayLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="partner-card">
              <img 
                src={logo.url} 
                alt={logo.name} 
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
