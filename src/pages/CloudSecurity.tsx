import { Cloud, Shield, Lock, FileCheck, ChevronRight, ArrowRight, Server, Eye, Settings } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

const capabilities = [
  { icon: Cloud, title: 'CSPM', desc: 'Cloud Security Posture Management: detecta misconfigurations, compliance drifts y vulnerabilidades en tu infraestructura cloud.' },
  { icon: Shield, title: 'CWPP', desc: 'Cloud Workload Protection: protección runtime para containers, serverless y VMs con detección de comportamientos anómalos.' },
  { icon: Lock, title: 'CIEM', desc: 'Cloud Infrastructure Entitlement Management: gestiona permisos excesivos y aplica least privilege de forma automatizada.' },
  { icon: FileCheck, title: 'Cloud Compliance', desc: 'Evaluación continua contra CIS Benchmarks, SOC 2, ISO 27001, PCI DSS y GDPR con remediación guiada.' },
  { icon: Eye, title: 'Cloud Detection & Response', desc: 'Detección de amenazas en tiempo real con correlación de eventos multi-cloud y respuesta automatizada.' },
  { icon: Server, title: 'Container Security', desc: 'Seguridad para Kubernetes, Docker y registries. Escaneo de imágenes, runtime protection y network policies.' },
];

const clouds = [
  { name: 'AWS', services: 'GuardDuty, Security Hub, CloudTrail, IAM Access Analyzer' },
  { name: 'Azure', services: 'Defender for Cloud, Sentinel, Entra ID, Policy' },
  { name: 'GCP', services: 'Security Command Center, Chronicle, IAM, Cloud Armor' },
];

const process = [
  { step: '01', title: 'Descubrimiento', desc: 'Inventario completo de recursos cloud, configuraciones e identidades.' },
  { step: '02', title: 'Assessment', desc: 'Evaluación de postura contra CIS Benchmarks y best practices del proveedor.' },
  { step: '03', title: 'Remediación', desc: 'Corrección priorizada con infrastructure-as-code y automatización.' },
  { step: '04', title: 'Monitoreo continuo', desc: 'Detección de drift, nuevas vulnerabilidades y cambios de configuración 24/7.' },
];

const CloudSecurity = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Capacidades
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6 leading-[1.1]">
          Seguridad nativa para<br />
          <span className="gradient-text">multi-cloud.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
          Visibilidad, cumplimiento y detección de amenazas para AWS, Azure y GCP. Un solo equipo, todos tus entornos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm">
            Solicitar evaluación cloud <ChevronRight className="w-4 h-4" />
          </Link>
          <a href="#capacidades" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-muted/60 transition-all duration-300">
            Ver capacidades
          </a>
        </div>
      </div>
    </section>

    {/* Capabilities */}
    <section id="capacidades" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4 text-center">Capacidades cloud</h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">Protección completa para tu infraestructura en la nube</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors duration-300 group">
              <c.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-105 transition-transform duration-300" />
              <h3 className="text-lg font-semibold text-foreground mb-3">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Multi-cloud */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-4 text-center">Cobertura multi-cloud</h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">Integración nativa con los tres proveedores principales</p>
        <div className="grid md:grid-cols-3 gap-6">
          {clouds.map((c) => (
            <div key={c.name} className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-foreground mb-4">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.services}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-foreground mb-16 text-center">Proceso de aseguramiento</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {process.map((p, i) => (
            <div key={p.step} className="relative text-center">
              <span className="text-5xl font-bold gradient-text opacity-60">{p.step}</span>
              <h3 className="font-semibold text-foreground mt-3 mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              {i < process.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-6 -right-4 w-5 h-5 text-muted-foreground/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
          ¿Conoces la postura de seguridad de tu cloud?
        </h2>
        <p className="text-muted-foreground mb-10">
          Solicita una evaluación gratuita y descubre misconfigurations, permisos excesivos y brechas de cumplimiento.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300">
            Solicitar evaluación <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/contacto" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-muted/60 transition-all duration-300">
            Hablar con un arquitecto cloud
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default CloudSecurity;
