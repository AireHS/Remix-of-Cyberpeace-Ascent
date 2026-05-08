import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, AlertTriangle, Crosshair, Eye, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Shield,
    label: 'SOC / MDR Gestionado',
    headline: 'Reducción radical de tiempos de detección y respuesta.',
    desc: 'Monitoreo 24/7 con threat hunting, ingeniería de detección y contención automatizada.',
    features: ['Monitoreo SIEM 24x7', 'Threat Hunting', 'Ingeniería de Detección', 'Contención Inicial'],
    link: '/soc-360',
  },
  {
    icon: AlertTriangle,
    label: 'Incident Response',
    headline: 'Contención, evidencia y recuperación operativa.',
    desc: 'Preservación forense, gestión de crisis y restauración con trazabilidad completa.',
    features: ['Incident Response', 'DFIR / Forense', 'Tabletop Exercises', 'Gestión de Crisis'],
    link: '/cpcsirt',
  },
  {
    icon: Crosshair,
    label: 'Exposición y Validación',
    headline: 'Identificamos rutas de ataque antes de que las exploten.',
    desc: 'Validación ofensiva, gestión de superficie de ataque y seguridad cloud.',
    features: ['Pentesting', 'Attack Surface Mgmt', 'Seguridad Cloud', 'Threat Modeling'],
    link: '/red-teaming',
  },
  {
    icon: Eye,
    label: 'Threat Intelligence',
    headline: 'Tu marca bajo vigilancia continua.',
    desc: 'Monitoreamos actores, exposición en dark web y fraude digital que pueda impactar tu operación.',
    features: ['Threat Intel', 'Brand Protection', 'Dark Web', 'Fraude e Impersonación'],
    link: '/brand-protection',
  },
  {
    icon: Scale,
    label: 'Cumplimiento y Madurez',
    headline: 'Cumplimiento sin fricción.',
    desc: 'Alineamos seguridad con regulaciones, auditorías y continuidad del negocio.',
    features: ['Assessments de Madurez', 'Gap Regulatorio', 'Riesgo de Terceros', 'vCISO'],
    link: '/compliance',
  },
];

const HowWeHelp = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.hwh-header',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.hwh-header', start: 'top 88%', once: true } }
      );

      // Cards stagger
      const cards = sectionRef.current?.querySelectorAll('.hwh-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
            delay: i * 0.08
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="hwh-header text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Cómo ayudamos
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
            Cinco pilares de resiliencia cibernética
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Del monitoreo al cumplimiento. De la detección a la respuesta. Todo integrado.
          </p>
        </div>

        {/* Top row: 3 cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {pillars.slice(0, 3).map((p) => (
            <PillarCard key={p.label} pillar={p} />
          ))}
        </div>

        {/* Bottom row: 2 cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {pillars.slice(3).map((p) => (
            <PillarCard key={p.label} pillar={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PillarCardProps {
  pillar: typeof pillars[number];
}

const PillarCard = ({ pillar }: PillarCardProps) => {
  const Icon = pillar.icon;
  return (
    <div className="hwh-card group relative bg-card border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.06] transition-all duration-500">
      {/* Icon + label */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-500">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs font-bold text-primary uppercase tracking-[0.12em]">{pillar.label}</span>
      </div>

      {/* Headline */}
      <h3 className="font-display font-bold text-foreground text-lg mb-3 tracking-tight leading-snug group-hover:text-primary transition-colors duration-500">
        {pillar.headline}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        {pillar.desc}
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {pillar.features.map((f) => (
          <span key={f} className="text-[11px] font-medium text-foreground/60 px-2.5 py-1 rounded-md bg-muted/60 border border-border/50">
            {f}
          </span>
        ))}
      </div>

      {/* Link */}
      <Link
        to={pillar.link}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-300"
      >
        Explorar
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-primary/0 group-hover:bg-primary/30 transition-all duration-500 rounded-full" />
    </div>
  );
};

export default HowWeHelp;
