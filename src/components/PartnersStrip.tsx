import React from 'react';
import logoWatchguard from '@/assets/logo-watchguard.png';
import logoWazuh from '@/assets/logo-wazuh.png';
import logoMicrosoft from '@/assets/logo-microsoft.png';
import logoGoogle from '@/assets/logo-google.png';
import logoSentinelone from '@/assets/logo-sentinelone.png';
import logoTrendmicro from '@/assets/logo-trendmicro.png';
import logoLumu from '@/assets/logo-lumu.png';
import logoAxur from '@/assets/logo-axur.png';
import logoPaloalto from '@/assets/logo-paloalto.png';

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
        <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2">
          Nuestras Alianzas
        </h2>
        <h3 className="text-3xl font-bold text-white">Tecnología de Clase Mundial</h3>
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
