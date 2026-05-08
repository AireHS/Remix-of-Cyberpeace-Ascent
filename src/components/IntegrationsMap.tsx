import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const integrations = [
  { name: 'Splunk', abbr: 'SP', color: 'hsl(15 80% 55%)' },
  { name: 'CrowdStrike', abbr: 'CS', color: 'hsl(0 70% 55%)' },
  { name: 'SentinelOne', abbr: 'S1', color: 'hsl(270 60% 60%)' },
  { name: 'Microsoft Sentinel', abbr: 'MS', color: 'hsl(207 90% 55%)' },
  { name: 'Palo Alto', abbr: 'PA', color: 'hsl(25 85% 55%)' },
  { name: 'AWS', abbr: 'AWS', color: 'hsl(35 90% 55%)' },
  { name: 'Azure', abbr: 'AZ', color: 'hsl(207 90% 60%)' },
  { name: 'Google Cloud', abbr: 'GC', color: 'hsl(140 60% 48%)' },
  { name: 'Wazuh', abbr: 'WZ', color: 'hsl(210 70% 50%)' },
  { name: 'Trend Micro', abbr: 'TM', color: 'hsl(0 75% 50%)' },
  { name: 'Cortex XDR', abbr: 'CX', color: 'hsl(200 70% 50%)' },
  { name: 'MISP', abbr: 'MI', color: 'hsl(120 50% 45%)' },
  { name: 'Velociraptor', abbr: 'VR', color: 'hsl(180 60% 45%)' },
  
];

// Positions for the floating nodes (percentage-based)
const positions = [
  { top: '8%', left: '8%' },
  { top: '5%', left: '30%' },
  { top: '12%', right: '28%' },
  { top: '6%', right: '6%' },
  { top: '30%', left: '4%' },
  { top: '35%', right: '3%' },
  { top: '55%', left: '6%' },
  { top: '50%', right: '5%' },
  { top: '72%', left: '10%' },
  { top: '78%', left: '30%' },
  { top: '70%', right: '25%' },
  { top: '80%', right: '8%' },
  { top: '42%', left: '15%' },
  { top: '65%', right: '15%' },
];

const IntegrationsMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: 'hsl(220 25% 6%)' }}
    >
      {/* Circuit lines SVG background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        {/* Vertical lines */}
        <line x1="200" y1="0" x2="200" y2="800" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <line x1="400" y1="0" x2="400" y2="800" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <line x1="600" y1="0" x2="600" y2="800" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <line x1="800" y1="0" x2="800" y2="800" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <line x1="1000" y1="0" x2="1000" y2="800" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        {/* Horizontal lines */}
        <line x1="0" y1="160" x2="1200" y2="160" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <line x1="0" y1="320" x2="1200" y2="320" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <line x1="0" y1="480" x2="1200" y2="480" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <line x1="0" y1="640" x2="1200" y2="640" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        {/* Connector paths */}
        <path d="M200 160 L400 160 L400 320" stroke="hsl(210 60% 50%)" strokeWidth="0.5" fill="none" />
        <path d="M600 320 L800 320 L800 480" stroke="hsl(210 60% 50%)" strokeWidth="0.5" fill="none" />
        <path d="M400 480 L600 480 L600 640" stroke="hsl(210 60% 50%)" strokeWidth="0.5" fill="none" />
        <path d="M800 160 L1000 160 L1000 320" stroke="hsl(210 60% 50%)" strokeWidth="0.5" fill="none" />
        {/* Corner connectors */}
        <rect x="196" y="156" width="8" height="8" rx="2" fill="none" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <rect x="396" y="316" width="8" height="8" rx="2" fill="none" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <rect x="596" y="476" width="8" height="8" rx="2" fill="none" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <rect x="796" y="316" width="8" height="8" rx="2" fill="none" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <rect x="996" y="156" width="8" height="8" rx="2" fill="none" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
        <rect x="596" y="636" width="8" height="8" rx="2" fill="none" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
      </svg>

      {/* Floating integration nodes */}
      {integrations.map((item, i) => {
        const pos = positions[i];
        return (
          <div
            key={item.name}
            className="absolute group"
            style={{
              ...pos,
              animation: `float-node ${3 + (i % 3) * 0.8}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-[11px] font-bold text-white border border-white/10 shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${item.color}, hsl(220 25% 12%))`,
                boxShadow: `0 0 20px ${item.color}33, 0 4px 12px hsl(220 25% 6% / 0.5)`,
              }}
            >
              {item.abbr}
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/50 whitespace-nowrap font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.name}
            </span>
          </div>
        );
      })}

      {/* Center content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-16">
        <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
          Integraciones
        </span>
        <h2
          className="font-display font-extrabold text-white mb-6 tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
        >
          Integra tu stack de seguridad existente
        </h2>
        <p className="text-white/50 text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Nuestra plataforma se conecta con tus herramientas de seguridad y fuentes de datos sin necesidad de centralizar información ni desplegar nuevos agentes.
        </p>
        <Link
          to="/partners#registro"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-500"
        >
          Solicitar Demo <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes float-node {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
};

export default IntegrationsMap;
