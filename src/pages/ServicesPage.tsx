import { Shield, Eye, Search, Lock, FileCheck, AlertTriangle, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

const services = [
  {
    slug: 'soc-mdr',
    icon: Shield,
    title: 'SOC / MDR',
    subtitle: 'Security Operations Center & Managed Detection & Response',
    desc: 'Centro de operaciones de seguridad 24/7/365 con Threat Intelligence y monitoreo basado en riesgo. Analistas expertos que detectan, investigan y responden en tiempo real.',
    features: ['Monitoreo SOC 24/7/365', 'Threat Hunting proactivo', 'Respuesta automatizada con SOAR', 'Cyber Threat Intelligence integrado', 'Dark Web & IOC monitoring', 'Evaluación continua de ciberriesgo', 'Scoring de riesgo en tiempo real', 'SLA de respuesta < 15 minutos'],
    useCases: ['Empresas sin equipo de seguridad interno', 'Organizaciones que necesitan cobertura 24/7', 'Monitoreo basado en riesgo para C-level'],
  },
  {
    slug: 'brand-protection',
    icon: Eye,
    title: 'Brand Protection',
    subtitle: 'Protección de Marca Digital',
    desc: 'Detectamos suplantación, phishing y uso no autorizado de tu identidad corporativa antes de que afecten a tus clientes y reputación.',
    features: ['Anti-phishing & takedown < 24h', 'Domain & typosquatting monitoring', 'Social media intelligence', 'App Store protection', 'Monitoreo de marca en Dark Web', 'Reportes de exposición de marca'],
    useCases: ['Sector financiero y bancario', 'E-commerce y retail', 'Protección de propiedad intelectual'],
  },
  {
    slug: 'red-team',
    icon: Lock,
    title: 'Red Team',
    subtitle: 'Offensive Security',
    desc: 'Simulación de ataques reales para identificar vulnerabilidades antes que los atacantes. Incluye pentesting, SAST, DAST y más.',
    features: ['Pentesting (Black, Grey & White Box)', 'SAST — Análisis estático de código', 'DAST — Análisis dinámico de aplicaciones', 'Pentesting de infraestructura y red', 'Pruebas de ingeniería social', 'Red Team operations', 'Retesting post-remediación'],
    useCases: ['Validación pre-lanzamiento de apps', 'Cumplimiento PCI DSS', 'Evaluación periódica de seguridad'],
  },
  {
    slug: 'cpcsirt',
    icon: AlertTriangle,
    title: 'Respuesta a Incidentes',
    subtitle: 'Computer Security Incident Response Team',
    desc: 'Equipo dedicado de respuesta a incidentes listo para actuar ante cualquier brecha de seguridad, minimizando impacto y tiempo de recuperación.',
    features: ['Respuesta de emergencia 24/7', 'Contención y erradicación', 'Análisis forense digital', 'Recuperación y restauración', 'Lecciones aprendidas', 'Plan de respuesta a incidentes'],
    useCases: ['Ataques de ransomware activos', 'Brechas de datos confirmadas', 'Compromiso de cuentas privilegiadas'],
  },
  {
    slug: 'isg',
    icon: FileCheck,
    title: 'Gobernanza de Seguridad',
    subtitle: 'Information Security Governance',
    desc: 'Alineamos la seguridad de la información con los objetivos estratégicos de tu negocio mediante frameworks reconocidos.',
    features: ['Diseño de SGSI (ISO 27001)', 'Políticas y procedimientos', 'Gestión de riesgos', 'Awareness y capacitación', 'vCISO — CISO virtual', 'Preparación para certificaciones'],
    useCases: ['Certificación ISO 27001', 'Cumplimiento regulatorio', 'Empresas en crecimiento sin CISO'],
  },
];

const ServicesPage = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Servicios
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
          Ciberseguridad <span className="gradient-text">integral</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Seis servicios core que cubren el ciclo completo de ciberseguridad: desde la prevención hasta la respuesta a incidentes.
        </p>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {services.map((svc, idx) => (
          <div key={svc.slug} id={svc.slug} className={`flex flex-col lg:flex-row gap-12 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svc.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{svc.subtitle}</p>
                </div>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">{svc.title}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{svc.desc}</p>
              <a href="#contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Solicitar Información <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-card border border-border rounded-xl p-6 mb-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Características</h3>
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Casos de Uso</h3>
                <ul className="space-y-2">
                  {svc.useCases.map((u) => (
                    <li key={u} className="text-sm text-muted-foreground">→ {u}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default ServicesPage;
