import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, ShieldCheck, Zap, BarChart3, Globe, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Monitor,
    title: 'Visibilidad unificada',
    desc: 'Consolida alertas de SIEM, EDR, NDR, Cloud y SaaS en un solo dashboard. Eliminamos el 99% de falsos positivos para que tu equipo se enfoque en amenazas reales.',
    highlights: ['SIEM / EDR / NDR unificados', 'Correlación multi-fuente', 'Eliminación de falsos positivos'],
  },
  {
    icon: ShieldCheck,
    title: 'Analistas L3 como extensión tuya',
    desc: 'Equipo concierge 24/7 de analistas senior con experiencia en threat hunting proactivo, investigación de incidentes y asesoría ejecutiva.',
    highlights: ['Concierge team 24/7/365', 'Threat hunting proactivo', 'Investigación forense on-demand'],
  },
  {
    icon: Zap,
    title: 'Automatización y orquestación',
    desc: 'Playbooks automatizados para contención, aislamiento y remediación. Integración con Slack, Teams, Jira y tus herramientas de ticketing.',
    highlights: ['Playbooks SOAR', 'Auto-enrichment con IA', 'Notificaciones multi-canal'],
  },
  {
    icon: BarChart3,
    title: 'Portal y reporting ejecutivo',
    desc: 'Dashboards en tiempo real, reportes ejecutivos para C-level y KPIs de seguridad que demuestran el ROI de tu inversión en ciberseguridad.',
    highlights: ['Dashboards en tiempo real', 'Reportes para C-level', 'KPIs y SLA tracking'],
  },
  {
    icon: Globe,
    title: 'Integraciones BYO',
    desc: 'Conectamos con tu stack existente: AWS, Azure, GCP, CrowdStrike, SentinelOne, Microsoft Defender, Okta, Entra ID y +200 fuentes.',
    highlights: ['Cloud: AWS, Azure, GCP', 'EDR: CrowdStrike, S1, Defender', 'Identity: Okta, Entra ID'],
  },
  {
    icon: Layers,
    title: 'Casos de uso avanzados',
    desc: 'Desde detección de ransomware hasta insider threats, cloud misconfigurations y monitoreo de cumplimiento en tiempo real.',
    highlights: ['Detección de ransomware', 'Insider threats', 'Compliance monitoring'],
  },
];

const PinnedScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pinned-title',
        { opacity: 0, x: -60, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: '.pinned-title', start: 'top 88%' }
        }
      );

      const items = sectionRef.current?.querySelectorAll('.feature-row');
      items?.forEach((item, i) => {
        const fromX = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(item,
          { opacity: 0, x: fromX, scale: 0.97 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%' }
          }
        );
      });

      items?.forEach((item) => {
        const highlights = item.querySelectorAll('.highlight-pill');
        gsap.fromTo(highlights,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="soc360" className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="pinned-title mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
            Plataforma SOC360
          </span>
          <h2 className="text-foreground font-display font-extrabold tracking-[-0.03em] mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>
            El centro de operaciones que potencia <span className="gradient-text">tu resiliencia</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            SOC360 es la capa tecnológica y operativa que alimenta todas nuestras capacidades. Visibilidad total, respuesta automatizada y reporting ejecutivo — todo en una sola plataforma.
          </p>
        </div>

        <div className="space-y-5">
          {capabilities.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="feature-row group">
                <div className="flex flex-col lg:flex-row gap-8 p-8 lg:p-10 rounded-2xl border border-border/60 bg-card/30 hover:bg-card/60 hover:border-border transition-all duration-500">
                  <div className="lg:w-1/2">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center group-hover:bg-primary/15 transition-all duration-500">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <h3 className="text-foreground font-display font-semibold text-xl tracking-tight">{f.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="space-y-2.5">
                      {f.highlights.map((h, j) => (
                        <div key={j} className="highlight-pill flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-border/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-sm text-foreground font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link to="/soc-360" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            Explorar SOC360
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PinnedScroll;
