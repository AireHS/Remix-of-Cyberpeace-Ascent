import { useEffect, useRef, useState } from 'react';
import { Users, Target, Award, MapPin, ChevronRight, Shield, Zap, Globe, Handshake, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Shield, title: 'Integridad', desc: 'Transparencia total con nuestros clientes. Sin letra pequeña.', color: 'from-primary/20 to-primary/5' },
  { icon: Zap, title: 'Excelencia', desc: 'Certificaciones internacionales y mejora continua.', color: 'from-primary/15 to-primary/5' },
  { icon: Globe, title: 'Innovación', desc: 'IA y automatización al servicio de la seguridad.', color: 'from-primary/20 to-primary/5' },
  { icon: Handshake, title: 'Colaboración', desc: 'Trabajamos como extensión de tu equipo.', color: 'from-primary/15 to-primary/5' },
];

const certs = ['ISO 27001', 'SOC 2 Type II', 'FIRST Member', 'Gartner Recognized', 'CREST Certified', 'PCI QSA'];

const offices = [
  { city: 'Ciudad de México', country: 'México', desc: 'Sede principal. Hub de operaciones SOC para LATAM.', flag: '🇲🇽', tz: 'GMT-6' },
  { city: 'Madrid', country: 'España', desc: 'Centro de operaciones para Europa y cumplimiento GDPR.', flag: '🇪🇸', tz: 'GMT+1' },
  { city: 'Santiago', country: 'Chile', desc: 'Oficina regional para Sudamérica.', flag: '🇨🇱', tz: 'GMT-4' },
];

const timeline = [
  { year: '2018', event: 'Fundación en Ciudad de México' },
  { year: '2019', event: 'Primer SOC operativo 24/7' },
  { year: '2020', event: 'Expansión a España y Chile' },
  { year: '2021', event: 'Certificación ISO 27001' },
  { year: '2022', event: 'Miembro de FIRST' },
  { year: '2023', event: 'SOC 2 Type II & 100+ clientes' },
  { year: '2024', event: 'Lanzamiento SOC 360 con IA' },
];

/* Animated grid background component */
const AnimatedGrid = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid-about" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      </pattern>
      <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="70%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <mask id="grid-mask">
        <rect width="100%" height="100%" fill="url(#grid-fade)" />
      </mask>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-about)" mask="url(#grid-mask)" />
  </svg>
);

/* Glowing line separator */
const GlowLine = () => (
  <div className="relative h-px w-full max-w-5xl mx-auto overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-pulse-glow opacity-50" />
  </div>
);

/* Floating particles */
const Particles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `float-slow ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const About = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero clip-path reveal ── */
      const heroContent = heroRef.current?.querySelector('.hero-content') as HTMLElement;
      if (heroContent) {
        gsap.fromTo(heroContent,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.out' }
        );
      }

      const heroEls = heroRef.current?.querySelectorAll('.hero-animate');
      if (heroEls) {
        gsap.fromTo(heroEls,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
        );
      }

      /* ── Orbs parallax ── */
      heroRef.current?.querySelectorAll('.hero-orb').forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -80 : -50,
          rotation: i % 2 === 0 ? 10 : -10,
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 2 },
        });
      });

      /* ── Horizontal line draw ── */
      document.querySelectorAll('.draw-line').forEach((line) => {
        gsap.fromTo(line,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: { trigger: line, start: 'top 90%', once: true } }
        );
      });

      /* ── Section reveals with direction ── */
      document.querySelectorAll('.reveal-section').forEach((section) => {
        const children = section.querySelectorAll('.reveal-child');
        if (children.length) {
          gsap.fromTo(children,
            { opacity: 0, y: 30, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 80%', once: true } }
          );
        }
      });

      /* ── Left-slide reveals ── */
      document.querySelectorAll('.reveal-left').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -50, filter: 'blur(6px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
        );
      });

      /* ── Right-slide reveals ── */
      document.querySelectorAll('.reveal-right').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: 50, filter: 'blur(6px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
        );
      });

      /* ── 3D tilt cards ── */
      document.querySelectorAll('.tilt-card').forEach((card) => {
        const el = card as HTMLElement;
        const glare = el.querySelector('.card-glare') as HTMLElement;
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(el, { rotateY: x * 12, rotateX: -y * 12, duration: 0.4, ease: 'power2.out' });
          if (glare) {
            gsap.to(glare, {
              opacity: 0.15,
              background: `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, hsl(215 80% 50% / 0.15), transparent 60%)`,
              duration: 0.3,
            });
          }
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
          if (glare) gsap.to(glare, { opacity: 0, duration: 0.4 });
        });
      });

      /* ── Counter animations ── */
      const stats = [
        { value: 147, suffix: '+' },
        { value: 12, suffix: '' },
        { value: 99.7, suffix: '%', decimals: 1 },
        { value: 4, suffix: '' },
      ];
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stats[i].value, duration: 2.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = (stats[i].decimals ? obj.val.toFixed(stats[i].decimals) : Math.floor(obj.val)) + stats[i].suffix;
          },
        });
      });

      /* ── Cert tags bounce in ── */
      gsap.fromTo('.cert-tag',
        { opacity: 0, scale: 0.8, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.cert-grid', start: 'top 85%', once: true } }
      );

      /* ── Timeline progressive reveal ── */
      document.querySelectorAll('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: {
              trigger: item, start: 'top 85%', once: true,
              onEnter: () => setActiveTimelineIdx((prev) => Math.max(prev, i)),
            }
          }
        );
      });

      /* ── CTA section scale reveal ── */
      const ctaSection = document.querySelector('.cta-reveal');
      if (ctaSection) {
        gsap.fromTo(ctaSection,
          { opacity: 0, scale: 0.95, filter: 'blur(8px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: ctaSection, start: 'top 82%', once: true } }
        );
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <div ref={pageRef}>
        {/* ═══ HERO ═══ */}
        <section ref={heroRef} className="relative py-36 md:py-48 overflow-hidden">
          <AnimatedGrid />
          <Particles />
          {/* Orbs */}
          <div className="hero-orb absolute top-10 left-[10%] w-80 h-80 rounded-full bg-primary/[0.07] blur-[100px] animate-float-slow" />
          <div className="hero-orb absolute bottom-0 right-[8%] w-[28rem] h-[28rem] rounded-full bg-primary/[0.05] blur-[120px] animate-float-slow-reverse" />
          <div className="hero-orb absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px]" />

          <div className="hero-content relative z-10 max-w-7xl mx-auto px-6 text-center">
            <span className="hero-animate inline-flex items-center gap-2 text-xs font-medium text-primary mb-8 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Empresa
            </span>

            <h1 className="hero-animate font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-[0.92] tracking-tight">
              Sobre{' '}
              <span className="relative inline-block">
                <span className="gradient-text">Cyberpeace</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent rounded-full" />
              </span>
            </h1>

            <p className="hero-animate text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ textWrap: 'balance' } as React.CSSProperties}>
              Somos una empresa de ciberseguridad fundada con la misión de proteger a organizaciones en Latinoamérica y Europa contra amenazas digitales.
            </p>

            <div className="hero-animate flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]">
                Conocer más <ChevronRight className="w-4 h-4" />
              </Link>
              <a href="#historia" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-muted/60 transition-all duration-300 active:scale-[0.97]">
                Nuestra historia
              </a>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ═══ STATS ═══ */}
        <section className="relative reveal-section">
          <div className="draw-line origin-left h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { label: 'Clientes protegidos' },
              { label: 'Países' },
              { label: 'SLA Uptime' },
              { label: 'SOCs globales' },
            ].map((stat, i) => (
              <div key={stat.label} className="reveal-child text-center group">
                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                  className="block font-display font-bold text-5xl md:text-6xl text-foreground tabular-nums group-hover:text-primary transition-colors duration-500"
                >
                  0
                </span>
                <span className="text-sm text-muted-foreground mt-2 block uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="draw-line origin-right h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* ═══ MISSION & VISION ═══ */}
        <section className="py-28 reveal-section">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal-child">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4 tracking-tight">Propósito</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">Lo que nos impulsa cada día</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Target, title: 'Misión', text: 'Democratizar el acceso a ciberseguridad de clase mundial, permitiendo que organizaciones de todos los tamaños se protejan eficazmente contra amenazas digitales avanzadas.' },
                { icon: Users, title: 'Visión', text: 'Ser el referente en ciberseguridad gestionada en el mundo hispanohablante, construyendo un ecosistema digital más seguro para empresas, gobiernos y ciudadanos.' },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`tilt-card ${i === 0 ? 'reveal-left' : 'reveal-right'} group relative bg-card border border-border rounded-2xl p-10 md:p-12 hover:border-primary/25 transition-colors duration-500 overflow-hidden`}
                  style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
                >
                  {/* Glare overlay */}
                  <div className="card-glare absolute inset-0 rounded-2xl opacity-0 pointer-events-none transition-opacity duration-300" />
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/[0.06] to-transparent rounded-bl-[3rem] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-5">{item.title}</h2>
                    <p className="text-muted-foreground leading-relaxed text-base">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ VALUES ═══ */}
        <section className="py-28 bg-card/30 border-t border-border reveal-section overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal-child">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4 tracking-tight">Nuestros Valores</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">Los principios que guían cada decisión y operación</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="reveal-child group relative bg-background border border-border rounded-2xl p-8 text-center hover:border-primary/25 transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${v.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                  {/* Top line accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary/0 group-hover:bg-primary/40 group-hover:w-20 transition-all duration-500 rounded-full" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-500">
                      <v.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-3 text-lg">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TIMELINE ═══ */}
        <section id="historia" className="py-28 border-t border-border relative overflow-hidden">
          <Particles />
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20 reveal-child">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4 tracking-tight">Nuestra Historia</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">El camino que nos trajo hasta aquí</p>
            </div>
            <div ref={timelineRef} className="relative">
              {/* Central line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
              <div
                className="absolute left-1/2 top-0 w-px bg-primary/50 -translate-x-1/2 transition-all duration-700"
                style={{ height: activeTimelineIdx >= 0 ? `${((activeTimelineIdx + 1) / timeline.length) * 100}%` : '0%' }}
              />

              <div className="space-y-12 md:space-y-0">
                {timeline.map((t, i) => (
                  <div
                    key={t.year}
                    className={`timeline-item relative flex items-center md:py-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} pl-12 md:pl-0`}>
                      <span className="font-display font-bold text-2xl text-primary">{t.year}</span>
                      <p className="text-muted-foreground mt-1">{t.event}</p>
                    </div>
                    {/* Dot */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-[3px] border-background bg-primary/30 z-10 transition-colors duration-500"
                      style={{ backgroundColor: i <= activeTimelineIdx ? 'hsl(215 90% 42%)' : undefined }}
                    >
                      {i <= activeTimelineIdx && (
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                      )}
                    </div>
                    {/* Spacer */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CERTIFICATIONS ═══ */}
        <section id="certificaciones" className="py-28 bg-card/30 border-t border-border reveal-section">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="reveal-child mb-16">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4 tracking-tight">Certificaciones</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">Estándares internacionales que respaldan nuestras capacidades</p>
            </div>
            <div className="cert-grid flex flex-wrap justify-center gap-5">
              {certs.map((cert) => (
                <div
                  key={cert}
                  className="cert-tag group relative bg-background border border-border rounded-2xl px-8 py-6 hover:border-primary/30 transition-all duration-400 cursor-default overflow-hidden"
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{cert}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ OFFICES ═══ */}
        <section className="py-28 border-t border-border reveal-section relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal-child">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4 tracking-tight">Presencia Global</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">Operaciones estratégicas en tres continentes</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {offices.map((office, i) => (
                <div
                  key={office.city}
                  className="tilt-card reveal-child group relative bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/25 transition-all duration-500 overflow-hidden"
                  style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
                >
                  <div className="card-glare absolute inset-0 rounded-2xl opacity-0 pointer-events-none" />
                  {/* Timezone badge */}
                  <span className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">{office.tz}</span>
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block">{office.flag}</span>
                    <h3 className="font-display font-semibold text-foreground text-xl mb-1">{office.city}</h3>
                    <p className="text-sm text-primary font-medium mb-4">{office.country}</p>
                    <div className="w-10 h-px bg-border group-hover:bg-primary/30 group-hover:w-16 transition-all duration-500 mb-4" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{office.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-32 border-t border-border relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
          </div>
          <div className="cta-reveal relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6 tracking-tight leading-[1.1]">
              Únete al Equipo
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Buscamos talento apasionado por la ciberseguridad. Trabajo remoto, salarios competitivos y un equipo increíble.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/carreras"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
              >
                Ver Posiciones Abiertas <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 border border-border text-foreground px-10 py-4 text-sm font-semibold rounded-lg hover:bg-muted/60 transition-all duration-300 active:scale-[0.97]"
              >
                Contactar
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default About;
