import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ChevronRight, Menu, X, Shield, Eye, Lock, FileCheck, AlertTriangle, Cloud, Scale, Cpu, Radio, Bug, Globe, Users, Rocket, Award, Briefcase, BookOpen, FileText, Video, Trophy, Handshake, UserPlus, Crosshair, ScanSearch, BarChart3, Layers, Settings, Zap, Brain, Calculator, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoColor from '@/assets/logo-color.png';

/* ═══ Mega Item type ═══ */
type HighlightGroup = {
  title: string;
  items: string[];
};

type MegaItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  desc: string;
  highlights: string[];
  highlightGroups?: HighlightGroup[];
  ctaText?: string;
};

/* ═══ Menu Section type ═══ */
type MenuSection = {
  label: string;
  sectionTitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  items: MegaItem[];
};

const menuSections: MenuSection[] = [
  {
    label: 'Cómo ayudamos',
    sectionTitle: 'Cómo ayudamos',
    ctaLabel: 'Ver todas las capacidades',
    ctaHref: '/capacidades',
    items: [
      {
        icon: Shield, label: 'Detección e Investigación Continua', href: '/soc-360',
        desc: 'Operamos la detección, el análisis y la respuesta continua para reducir el tiempo de exposición, contener amenazas y fortalecer tu postura de riesgo.',
        highlights: ['Threat Detection', 'Threat Hunting', 'Threat Intelligence Operacional', 'Triage e Investigación de Alertas', 'Ingeniería de Detección', 'Contención y Respuesta', 'Gestión Continua de Exposición', 'Gestión de Riesgo Cibernético'],
        highlightGroups: [
          {
            title: 'Beneficios',
            items: ['Reducción de MTTD, MTTI y MTTR', 'Reducción del Dwell Time (tiempo de permanencia del atacante)', 'Investigación desde el primer indicio, no solo alertas', 'Identificación temprana de actividad anómala', 'Visibilidad continua del riesgo operativo'],
          },
          {
            title: 'Diferenciadores',
            items: ['SecOps impulsado por IA orientado a investigación y respuesta', 'Integración nativa de detección, inteligencia y operación', 'Arquitectura abierta y extensible (sin dependencia de un solo fabricante)', 'Cobertura y validación continua basada en MITRE ATT&CK', 'Operación orientada a reducción real de riesgo, no solo alertas'],
          },
          {
            title: 'Capacidades',
            items: ['Detección basada en correlación de telemetría multi-fuente', 'Threat Hunting basado en hipótesis y cobertura MITRE ATT&CK', 'Investigación de alertas con análisis de causa raíz', 'Desarrollo y tuning de reglas de detección', 'Enriquecimiento con inteligencia táctica y operacional', 'Contención coordinada (EDR, IAM, red)', 'Gestión continua de exposición (CTEM)'],
          },
        ],
      },
      {
        icon: AlertTriangle, label: 'Respuesta a Incidentes', href: '/cpcsirt',
        desc: 'Apoyamos a tu organización a contener incidentes, preservar evidencia y recuperar operación con rapidez, control y trazabilidad.',
        highlights: ['Incident Response', 'DFIR / Forense Digital', 'Retainer de Respuesta a Incidentes', 'Tabletop Exercises', 'Gestión de Crisis Cibernética'],
        highlightGroups: [
          {
            title: 'Beneficios',
            items: ['Contención rápida para limitar el blast radius', 'Diagnóstico claro del alcance y sistemas comprometidos', 'Identificación del vector de acceso inicial', 'Recuperación controlada con menor riesgo de reinfección', 'Restablecimiento de operación en el menor tiempo posible'],
          },
          {
            title: 'Diferenciadores',
            items: ['Experiencia en incidentes de alto impacto (ransomware, fraude, intrusiones)', 'Gestión de crisis con ejecución técnica directa, no solo advisory', 'Enfoque basado en evidencia: timeline y análisis de artefactos', 'Operación en entornos productivos sin interrumpir operación crítica', 'Soporte en notificación y reporte a reguladores y aseguradoras'],
          },
          {
            title: 'Capacidades',
            items: ['Contención y erradicación en endpoint, red e identidad', 'Adquisición y análisis forense (memoria, disco, logs)', 'Reconstrucción del ataque (timeline, TTPs / kill chain)', 'Identificación de persistencia, movimiento lateral y exfiltración', 'Análisis de compromiso de credenciales e identidad (AD / IAM)', 'Validación de limpieza, hardening y mejora post-incidente'],
          },
        ],
      },
      {
        icon: Crosshair, label: 'Exposición, Validación y Remediación', href: '/red-teaming',
        desc: 'Identificamos rutas de ataque reales, priorizamos riesgos explotables y acompañamos la remediación antes de que se conviertan en incidentes.',
        highlights: ['Red Teaming', 'Pentesting', 'SAST / DAST', 'Attack Surface Management', 'Gestión de Vulnerabilidades', 'Validación de Controles', 'Threat Modeling', 'Remediation Advisory', 'Seguridad en Nube', 'Seguridad de Apps y APIs'],
        highlightGroups: [
          {
            title: 'Beneficios',
            items: ['Visibilidad continua de la superficie de ataque expuesta', 'Identificación de vulnerabilidades con riesgo explotable real', 'Priorización basada en impacto técnico y de negocio', 'Reducción de exposición antes de la materialización del ataque', 'Cumplimiento de requerimientos regulatorios y auditorías técnicas'],
          },
          {
            title: 'Diferenciadores',
            items: ['Integración de ASM, Red Team y AppSec en un solo modelo operativo', 'Validación mediante explotación real, no solo escaneo', 'Enfoque continuo, no limitado a ejercicios puntuales', 'Cobertura de infraestructura, aplicaciones y superficie externa', 'Priorización basada en explotabilidad, no solo severidad (CVSS)'],
          },
          {
            title: 'Capacidades',
            items: ['Attack Surface Management (ASM) y descubrimiento de activos', 'Pruebas de penetración regulatorias (PCI DSS, auditorías)', 'Pentesting one-shot, recurrente y continuo', 'Red Teaming y simulación de adversarios', 'Seguridad de aplicaciones (SAST, DAST, MAST)'],
          },
        ],
      },
      {
        icon: Eye, label: 'Protección de Marca y Riesgo Digital', href: '/brand-protection',
        desc: 'Monitoreamos la exposición externa, protegemos tu marca y detectamos fraude, impersonación y filtraciones antes de que escalen.',
        highlights: [],
        highlightGroups: [
          {
            title: 'Beneficios',
            items: [
              'Detección temprana de fraude, suplantación y filtraciones',
              'Reducción de impacto financiero y reputacional',
              'Identificación de campañas y patrones de fraude',
              'Visibilidad sobre exposición de usuarios y activos críticos',
              'Contención y eliminación de infraestructura maliciosa',
            ],
          },
          {
            title: 'Diferenciadores',
            items: [
              'Detección, investigación y acción (no solo monitoreo)',
              'Análisis de campañas: actores, infraestructura y modus operandi',
              'Capacidad de atribución y entendimiento del fraude',
              'Integración de inteligencia externa con hunting interno',
              'Ejecución de takedown y respuesta operativa',
            ],
          },
          {
            title: 'Capacidades',
            items: [
              'Detección de fraude, phishing, impersonación y filtraciones',
              'Detección de credenciales comprometidas e infostealers',
              'Hunting e investigación de campañas de fraude',
              'Análisis de exposición en deep/dark web y fuentes abiertas',
              'Identificación y takedown de infraestructura maliciosa',
              'Análisis de causa raíz y patrones operativos del fraude',
            ],
          },
        ],
      },
      {
        icon: Scale, label: 'Riesgo, Madurez y Gobierno', href: '/compliance',
        desc: 'Evaluamos tu postura de riesgo, medimos madurez y alineamos capacidades con requerimientos regulatorios, auditorías y objetivos de negocio.',
        highlights: [],
        highlightGroups: [
          {
            title: 'Beneficios',
            items: [
              'Visibilidad clara del riesgo cibernético y su impacto en el negocio',
              'Priorización de iniciativas de seguridad con base en riesgo real',
              'Alineación de capacidades con requerimientos regulatorios y auditorías',
              'Mejora continua de la postura de seguridad y madurez organizacional',
              'Soporte en la toma de decisiones a nivel CISO y dirección',
            ],
          },
          {
            title: 'Diferenciadores',
            items: [
              'Enfoque en riesgo operativo y no solo cumplimiento documental',
              'Integración de hallazgos técnicos (SOC, IR, exposición) en la gestión de riesgo',
              'Evaluación de madurez alineada a capacidades reales, no solo frameworks',
              'Traducción de riesgos técnicos a impacto de negocio',
              'Acompañamiento estratégico en evolución de capacidades de seguridad',
            ],
          },
          {
            title: 'Capacidades',
            items: [
              'Evaluación de riesgo cibernético y priorización',
              'Assessment de madurez (NIST, ISO, CIS)',
              'Gap analysis regulatorio (ISO 27001, PCI, etc.)',
              'Definición de roadmap de seguridad y remediación',
              'Gestión de riesgo de terceros (Third-Party Risk)',
              'Preparación y acompañamiento en auditorías',
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'SOC360',
    sectionTitle: 'Plataforma SOC360',
    ctaLabel: 'Conocer SOC360',
    ctaHref: '/soc-360',
    items: [
      {
        icon: Layers, label: 'Visión general', href: '/soc-360',
        desc: 'Plataforma unificada de operaciones de seguridad con visibilidad completa.',
        highlights: ['Arquitectura multi-tenant', 'Dashboard ejecutivo', 'SLA garantizados', 'Modelo Follow-the-Sun'],
      },
      {
        icon: Shield, label: 'Capacidades', href: '/soc-360#capacidades',
        desc: 'Stack tecnológico y capacidades técnicas del SOC360.',
        highlights: ['SIEM / SOAR', 'EDR / XDR', 'NDR', 'Threat Hunting engine'],
      },
      {
        icon: Globe, label: 'Integraciones', href: '/soc-360#integraciones',
        desc: 'Ecosistema de tecnologías compatibles con SOC360.',
        highlights: ['BYO-SIEM', 'Cloud providers', 'Identity platforms', 'Ticketing systems'],
      },
      {
        icon: BarChart3, label: 'Casos de uso', href: '/soc-360#casos',
        desc: 'Escenarios reales donde SOC360 genera valor.',
        highlights: ['Detección de ransomware', 'Insider threats', 'Cloud misconfigurations', 'Compliance monitoring'],
      },
      {
        icon: Settings, label: 'Portal y Reporting', href: '/soc-360#portal',
        desc: 'Portal de cliente con métricas, reportes y visibilidad en tiempo real.',
        highlights: ['Dashboards en tiempo real', 'Reportes ejecutivos', 'KPIs de seguridad', 'Audit trail'],
      },
      {
        icon: Zap, label: 'Automatización y Orquestación', href: '/soc-360#automatizacion',
        desc: 'SOAR y playbooks automatizados para respuesta acelerada.',
        highlights: ['Playbooks automatizados', 'Orquestación multi-tool', 'Auto-enrichment', 'Response workflows'],
      },
      {
        icon: Brain, label: 'Neuma', href: '/soc360/neuma',
        desc: 'Capa de decisión, investigación y automatización que potencia SOC360 con contexto, priorización y respuesta guiada.',
        highlights: ['Correlación contextual', 'Investigación guiada', 'Playbooks dinámicos', 'Trazabilidad y control'],
        ctaText: 'Conocer Neuma',
      },
    ],
  },

  {
    label: 'Empresa',
    sectionTitle: 'Sobre Cyberpeace',
    items: [
      {
        icon: Users, label: 'Nosotros', href: '/nosotros',
        desc: 'Conoce al equipo detrás de Cyberpeace.',
        highlights: ['Presencia global', 'Follow-the-Sun', '+200 profesionales', '5 países'],
      },
      {
        icon: Rocket, label: 'Misión y Visión', href: '/nosotros#mision',
        desc: 'Nuestra razón de ser y hacia dónde vamos.',
        highlights: ['Innovación continua', 'Impacto social', 'Ciberseguridad accesible', 'Resiliencia digital'],
      },
      {
        icon: Award, label: 'Certificaciones', href: '/nosotros#certificaciones',
        desc: 'Estándares internacionales que nos respaldan.',
        highlights: ['ISO 27001', 'SOC 2', 'Partners globales', 'Certificaciones técnicas'],
      },
      {
        icon: Briefcase, label: 'Carreras', href: '/carreras',
        desc: 'Únete a nuestro equipo.',
        highlights: ['Cultura remota', 'Formación continua', 'Proyectos retadores', 'Impacto real'],
      },
    ],
  },
  {
    label: 'Recursos',
    sectionTitle: 'Centro de Recursos',
    ctaLabel: 'Ver todos los recursos',
    ctaHref: '/recursos',
    items: [
      {
        icon: BookOpen, label: 'Blog', href: '/recursos#blog',
        desc: 'Artículos y análisis de ciberseguridad.',
        highlights: ['Tendencias', 'Análisis técnico', 'Opinión experta', 'Actualidad cyber'],
      },
      {
        icon: FileText, label: 'Whitepapers', href: '/recursos#whitepapers',
        desc: 'Investigaciones y reportes descargables.',
        highlights: ['Threat landscape', 'Guías técnicas', 'Benchmarks', 'Casos de estudio'],
      },
      {
        icon: Video, label: 'Webinars', href: '/recursos#webinars',
        desc: 'Eventos y capacitaciones en vivo.',
        highlights: ['Demos en vivo', 'Q&A con expertos', 'Grabaciones', 'Certificados'],
      },
      {
        icon: Trophy, label: 'Casos de Éxito', href: '/recursos#casos',
        desc: 'Historias de clientes que confían en nosotros.',
        highlights: ['Sector financiero', 'Retail', 'Salud', 'Gobierno'],
      },
    ],
  },
  {
    label: 'Partners',
    sectionTitle: 'Programa de Partners',
    items: [
      {
        icon: Handshake, label: 'Partner Program', href: '/partners',
        desc: 'Únete a nuestro ecosistema de socios.',
        highlights: ['Beneficios exclusivos', 'Co-marketing', 'Deal registration', 'Soporte dedicado'],
      },
      {
        icon: UserPlus, label: 'Aplicar como Partner', href: '/partners#registro',
        desc: 'Envía tu solicitud para ser partner.',
        highlights: ['Proceso ágil', 'Evaluación rápida', 'Onboarding guiado', 'Acceso inmediato'],
      },
    ],
  },
];

/* ═══ Generic Mega Menu Panel ═══ */
const GenericMegaPanel = ({ section, onClose }: { section: MenuSection; onClose: () => void }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered !== null ? section.items[hovered] : null;
  const isSmall = section.items.length <= 3;

  return (
    <div className={`absolute top-full left-0 pt-3 z-50 ${active?.highlightGroups ? 'w-[min(96vw,1100px)]' : isSmall ? 'w-[min(92vw,640px)]' : 'w-[min(92vw,860px)]'}`}>
      <div className="bg-background border border-border rounded-2xl shadow-[0_30px_60px_-15px_hsl(220_20%_10%/0.22)] overflow-hidden">
        <div className={`grid ${isSmall ? 'grid-cols-[200px_1fr]' : 'grid-cols-[240px_1fr]'}`}>
          {/* Left — Item list */}
          <div className="border-r border-border/60 py-3 px-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold px-3 py-2">
              {section.sectionTitle}
            </p>
            {section.items.map((item, i) => {
              const Icon = item.icon;
              const showIcon = section.label !== 'Cómo ayudamos';
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group menu-item-shine menu-item-glow ${
                    hovered === i ? 'bg-primary/[0.07]' : 'hover:bg-muted/50'
                  }`}
                  onMouseEnter={() => setHovered(i)}
                  onClick={onClose}
                >
                  {showIcon && (
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      hovered === i ? 'bg-primary/15' : 'bg-muted/60'
                    }`}>
                      <Icon size={15} className={`transition-colors duration-200 ${hovered === i ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  )}
                  <span className={`text-[12.5px] font-medium transition-colors duration-200 ${
                    hovered === i ? 'text-primary' : 'text-foreground'
                  }`}>
                    {item.label}
                  </span>
                  <ChevronRight size={12} className={`ml-auto shrink-0 transition-all duration-200 ${
                    hovered === i ? 'opacity-100 text-primary translate-x-0' : 'opacity-0 -translate-x-1'
                  }`} />
                </Link>
              );
            })}
            {section.ctaLabel && section.ctaHref && (
              <div className="px-3 pt-3 mt-1 border-t border-border/50">
                <Link
                  to={section.ctaHref}
                  className="text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  onClick={onClose}
                >
                  {section.ctaLabel} <ChevronRight size={11} />
                </Link>
              </div>
            )}
          </div>

          {/* Right — Detail panel */}
          <div className="p-6 min-h-[260px] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />

            {active ? (
              <div className="relative z-10 animate-fade-in" key={active.label}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mega-icon-glow">
                    <active.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{active.label}</h3>
                    <p className="text-[11px] text-muted-foreground">{active.desc}</p>
                  </div>
                </div>

                {active.highlightGroups ? (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {active.highlightGroups.map((group) => (
                      <div key={group.title}>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-primary font-semibold mb-2">{group.title}</p>
                        <div className="space-y-1.5">
                          {group.items.map((h) => (
                            <div key={h} className="group/chip mega-chip flex items-start gap-2 px-2.5 py-1.5 rounded-lg bg-muted/40 border border-border/40 transition-all duration-300 hover:scale-[1.15] origin-left cursor-default">
                              <span className="mega-chip-dot w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5 transition-all duration-300 group-hover/chip:w-2.5 group-hover/chip:h-2.5 group-hover/chip:shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                              <span className="text-[10.5px] text-foreground/80 leading-tight">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {active.highlights.map((h) => (
                      <div key={h} className="mega-chip flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/40">
                        <span className="mega-chip-dot w-1 h-1 rounded-full bg-primary shrink-0" />
                        <span className="text-[11.5px] text-foreground/80">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  to={active.href}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary mt-5 hover:text-primary/80 transition-colors"
                  onClick={onClose}
                >
                  {active.ctaText || 'Conocer más'} <ChevronRight size={12} />
                </Link>
              </div>
            ) : (
              <div className="relative z-10 text-center px-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {(() => { const FirstIcon = section.items[0]?.icon; return FirstIcon ? <FirstIcon size={20} className="text-primary" /> : null; })()}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{section.sectionTitle}</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  Pasa el cursor sobre una opción para ver el detalle.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 220);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-[hsl(222_30%_8%)] text-white ${
        scrolled
          ? 'border-b border-white/10 shadow-[0_2px_8px_0_hsl(220_20%_10%/0.4)]'
          : 'border-b border-white/5'
      }`}
    >
      {/* Patrón de fondo sutil estilo Footer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between relative z-10">
        <Link to="/" className="shrink-0">
          <img src={logoColor} alt="Cyberpeace" className="h-10 brightness-0 invert opacity-90" />
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {menuSections.map((section) => (
            <div
              key={section.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(section.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium text-white/75 hover:text-white transition-colors duration-200 rounded-lg menu-item-shine menu-item-glow">
                {section.label}
                <ChevronDown size={13} className={`transition-transform duration-300 ${openDropdown === section.label ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === section.label && (
                <GenericMegaPanel section={section} onClose={() => setOpenDropdown(null)} />
              )}
            </div>
          ))}
          <Link
            to="/pricing"
            className="flex items-center px-3.5 py-2 text-[13px] font-medium text-white/75 hover:text-white transition-colors duration-200 rounded-lg menu-item-shine menu-item-glow"
          >
            Pricing
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/csirt"
            className="group relative inline-flex items-center gap-2.5 text-[13px] font-semibold bg-destructive text-white rounded-lg px-4 py-2 hover:bg-destructive/90 transition-all duration-300 shadow-lg shadow-destructive/20 btn-emergency-sweep"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            Reportar Incidente
          </Link>
          <Link
            to="/contacto"
            className="bg-white text-[hsl(222_30%_8%)] px-5 py-2 text-[13px] font-bold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-sm"
          >
            Contacto
          </Link>
          <Link
            to="/partners#registro"
            className="bg-primary text-primary-foreground px-5 py-2 text-[13px] font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm btn-premium-shine"
          >
            Solicitar Demo
          </Link>
        </div>

        <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[hsl(222_30%_8%)] border-t border-white/10 max-h-[80vh] overflow-y-auto relative z-10">
          <div className="px-6 py-5 space-y-1">
            {menuSections.map((section) => (
              <div key={section.label}>
                <button
                  className="w-full flex items-center justify-between py-3 text-[13px] font-medium text-white/90 menu-item-shine rounded-lg px-3"
                  onClick={() => setMobileExpanded(mobileExpanded === section.label ? null : section.label)}
                >
                  {section.label}
                  <ChevronDown size={13} className={`transition-transform duration-300 ${mobileExpanded === section.label ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === section.label && (
                  <div className="pl-4 pb-2 space-y-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const subKey = `${section.label}-${item.label}`;
                      const hasGroups = item.highlightGroups && item.highlightGroups.length > 0;
                      return (
                        <div key={item.label}>
                          <div className="flex items-center gap-2 menu-item-shine menu-item-glow rounded-lg">
                            <Link
                              to={item.href}
                              className="flex-1 flex items-center gap-2 py-2.5 px-2 text-[13px] text-white/60 hover:text-primary transition-colors duration-200"
                              onClick={() => setMobileOpen(false)}
                            >
                              <Icon size={14} className="shrink-0" />
                              {item.label}
                            </Link>
                            {hasGroups && (
                              <button
                                onClick={() => setMobileSubExpanded(mobileSubExpanded === subKey ? null : subKey)}
                                className="p-1.5 text-white/50 hover:text-white transition-colors"
                              >
                                <ChevronDown size={12} className={`transition-transform duration-300 ${mobileSubExpanded === subKey ? 'rotate-180' : ''}`} />
                              </button>
                            )}
                          </div>
                          {hasGroups && mobileSubExpanded === subKey && (
                            <div className="pl-6 pb-3 space-y-3">
                              {item.highlightGroups!.map((group) => (
                                <div key={group.title}>
                                  <p className="text-[10px] uppercase tracking-[0.15em] text-primary font-semibold mb-1.5">{group.title}</p>
                                  <div className="space-y-1">
                                    {group.items.map((h) => (
                                      <div key={h} className="mega-chip flex items-start gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                        <span className="mega-chip-dot w-1 h-1 rounded-full bg-primary shrink-0 mt-1.5" />
                                        <span className="text-[10.5px] text-white/80 leading-tight">{h}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/pricing"
              className="block py-3 text-[13px] font-medium text-white/90 menu-item-shine rounded-lg px-3"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-5 border-t border-white/10 space-y-3">
              <Link to="/csirt" className="btn-emergency-sweep flex items-center justify-center gap-2 text-[13px] text-white bg-destructive font-semibold rounded-lg py-2.5 hover:bg-destructive/90 transition-colors shadow-lg shadow-destructive/20" onClick={() => setMobileOpen(false)}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                Reportar Incidente
              </Link>
              <Link to="/contacto" className="block bg-white text-[hsl(222_30%_8%)] px-5 py-2.5 text-[13px] font-bold rounded-lg text-center hover:bg-white/90 transition-colors shadow-sm" onClick={() => setMobileOpen(false)}>
                Contacto
              </Link>
              <Link to="/partners#registro" className="block bg-primary text-primary-foreground px-5 py-2.5 text-[13px] font-semibold rounded-lg text-center btn-premium-shine" onClick={() => setMobileOpen(false)}>
                Solicitar Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
