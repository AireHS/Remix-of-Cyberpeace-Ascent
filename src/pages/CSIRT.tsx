import { useState } from 'react';
import {
  Shield, AlertTriangle, Phone, ArrowRight, Check, Globe, Award,
  Zap, ScanEye, Target, Mail, Users, Settings, FileText, BookOpen, ExternalLink
} from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import cpcsirtHero from '@/assets/cpcsirt-hero.jpg';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const included = [
  'Incident Response',
  'Preparation & IR Planning',
  'Containment & Investigation',
  'Forensic Analysis',
  'Eradication & Recovery',
  'Lessons Learned',
  'Cyber Crisis Simulation',
  'Coordinación ejecutiva de crisis',
];

const frameworks = [
  { name: 'NIST SP 800-61r3', desc: 'Ciclo de vida completo del manejo de incidentes: preparación, detección, contención, erradicación y recuperación.' },
  { name: 'ISO/IEC 27035', desc: 'Gestión de incidentes de seguridad de la información — planificación, detección, evaluación y respuesta.' },
  { name: 'MITRE ATT&CK', desc: 'Mapeo de TTPs para contextualizar cada incidente y mejorar playbooks de respuesta.' },
  { name: 'FIRST.org CSIRT Framework', desc: 'Estándares operativos para equipos de respuesta a incidentes reconocidos internacionalmente.' },
];

const serviceModels = [
  { title: 'Retainer CSIRT', desc: 'SLA garantizado de respuesta < 2 horas. Horas pre-pagadas con equipo dedicado 24/7.', icon: Shield, recommended: true, note: 'No esperes a tener un incidente para tener respuesta.' },
  { title: 'Activación en crisis', desc: 'Para incidentes activos ahora. Movilización inmediata y coordinación desde el primer minuto.', icon: Zap, recommended: false, note: 'Ideal si ya estás bajo ataque.' },
];

const CSIRT = () => {
  const [open, setOpen] = useState(false);

  return (
  <PageLayout>
    {/* Hero with Image — same layout as CPCSIRT */}
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute pointer-events-none animate-float-slow" style={{ width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, hsl(0 72% 51% / 0.06), transparent 65%)', top: '-20%', left: '50%', transform: 'translateX(-50%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold text-destructive mb-8 px-5 py-2 rounded-full border border-destructive/20 bg-destructive/[0.06] uppercase tracking-[0.15em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
              </span>
              Respuesta &lt; 2 horas para incidentes críticos
            </div>

            <h1 className="font-display font-extrabold text-foreground mb-6 tracking-[-0.035em]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05 }}>
              Cuando el incidente ya ocurrió, cada minuto <span className="text-destructive">importa.</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-lg mb-5 leading-relaxed">
              Cyberpeace CSIRT contiene, investiga y recupera tu organización antes de que la crisis escale.
            </p>

            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 px-4 py-2.5 rounded-xl border border-primary/15 bg-primary/[0.04]">
              <Globe className="w-4 h-4 text-primary" />
              Miembro oficial de{' '}
              <a href="https://www.first.org/members/teams/cyberpeace_ir_unit" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                FIRST.org
              </a>
            </div>

            <p className="text-xs text-muted-foreground mb-10 tracking-wide">
              NIST 800-61r3 · ISO 27035 · MITRE ATT&CK · 4 SOCs globales · 24/7/365
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center gap-3 bg-destructive text-destructive-foreground px-8 py-4 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-destructive/20 transition-all duration-500"
              >
                <Phone className="w-4 h-4" />
                Tengo un incidente activo
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 text-sm font-semibold rounded-xl hover:bg-muted transition-all duration-300"
              >
                Contratar retainer CSIRT
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-destructive/8 via-transparent to-destructive/4 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-destructive/10 border border-border/50">
              <img src={cpcsirtHero} alt="CSIRT Incident Response Team" className="w-full aspect-[4/3] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-3 -left-3 bg-background border border-border rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2.5">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">CSIRT Activo</p>
                <p className="text-[10px] text-muted-foreground">24/7/365</p>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 bg-background border border-border rounded-xl px-4 py-2.5 shadow-lg">
              <p className="text-xs font-bold text-primary">FIRST Member</p>
              <p className="text-[10px] text-muted-foreground">Certified</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Frameworks — macro level instead of detailed cycle */}
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
            <Award className="w-3.5 h-3.5" />
            Frameworks
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-4 tracking-[-0.03em]">
            Respuesta alineada a estándares internacionales
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Nuestro ciclo de respuesta se rige por los frameworks más reconocidos en gestión de incidentes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {frameworks.map((fw) => (
            <div key={fw.name} className="bg-background border border-border/50 rounded-2xl p-7 hover:border-primary/20 hover:shadow-sm transition-all duration-500">
              <h4 className="font-bold text-foreground text-sm mb-2 tracking-tight">{fw.name}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{fw.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Included */}
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground text-center mb-16 tracking-[-0.03em]">
          Qué incluye CSIRT
        </h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {included.map((item) => (
            <div key={item} className="bg-card/40 border border-border/50 rounded-2xl p-5 hover:border-primary/20 transition-colors flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contracting Model */}
    <section id="servicios" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-destructive mb-5 px-4 py-1.5 rounded-full border border-destructive/15 bg-destructive/[0.04] uppercase tracking-[0.15em]">
            <Settings className="w-3.5 h-3.5" />
            Contratación
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-4 tracking-[-0.03em]">
            Modelo de contratación
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {serviceModels.map((svc) => (
            <div key={svc.title} className={`bg-background border rounded-2xl p-8 relative ${svc.recommended ? 'border-2 border-primary/30' : 'border-border/50'}`}>
              {svc.recommended && (
                <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recomendado
                </span>
              )}
              <div className="flex items-center gap-3 mb-4 mt-1">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${svc.recommended ? 'bg-primary/[0.08]' : 'bg-destructive/[0.08]'}`}>
                  <svc.icon className={`w-5 h-5 ${svc.recommended ? 'text-primary' : 'text-destructive'}`} />
                </div>
                <h3 className="font-bold text-foreground text-lg tracking-tight">{svc.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{svc.desc}</p>
              <p className="text-[13px] text-muted-foreground italic">{svc.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Emergency CTA */}
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="bg-muted/50 rounded-3xl border border-destructive/15 p-12 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-10" />
          <div className="relative z-10">
            <AlertTriangle className="w-10 h-10 text-destructive mx-auto mb-6" />
            <h2 className="font-display font-extrabold text-3xl text-foreground mb-4 tracking-[-0.03em]">
              ¿Tienes un incidente activo?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
              Nuestro equipo CSIRT está disponible 24/7/365. Cada minuto cuenta — contáctanos ahora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-8 py-4 text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-destructive/20 transition-all duration-500"
              >
                <Phone className="w-4 h-4" />
                Reportar incidente
              </button>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-500"
              >
                Contratar retainer CSIRT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Incident Report Dialog */}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Centro de respuesta a incidentes
          </DialogTitle>
          <DialogDescription>
            Reporta un incidente o consulta nuestras guías de respuesta.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="report" className="mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="report" className="flex-1 gap-2 text-xs">
              <FileText className="w-3.5 h-3.5" />
              Reportar incidente
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex-1 gap-2 text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              Guías de ciberseguridad
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="mt-4">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); }}>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Nombre" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive/50 transition-colors" />
                <input type="text" placeholder="Empresa" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive/50 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="email" placeholder="Email" required className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive/50 transition-colors" />
                <input type="tel" placeholder="Teléfono" className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive/50 transition-colors" />
              </div>
              <select className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-destructive/50 transition-colors">
                <option value="">Tipo de incidente</option>
                <option value="ransomware">Ransomware</option>
                <option value="intrusion">Intrusión / Acceso no autorizado</option>
                <option value="phishing">Phishing / Compromiso de credenciales</option>
                <option value="data-breach">Fuga de datos</option>
                <option value="malware">Malware</option>
                <option value="other">Otro</option>
              </select>
              <select className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-destructive/50 transition-colors">
                <option value="">Severidad estimada</option>
                <option value="critical">Crítica — Operación detenida</option>
                <option value="high">Alta — Sistemas comprometidos</option>
                <option value="medium">Media — Actividad sospechosa</option>
                <option value="low">Baja — Investigación preventiva</option>
              </select>
              <textarea placeholder="Describe brevemente lo que está ocurriendo..." rows={3} className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive/50 transition-colors resize-none" />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 bg-destructive text-destructive-foreground px-6 py-3 text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
                  <Mail className="w-4 h-4" />
                  Enviar reporte
                </button>
                <a href="tel:+525543137419" className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 text-sm font-semibold rounded-lg hover:bg-muted transition-colors">
                  <Phone className="w-4 h-4" />
                  Llamar
                </a>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="guides" className="mt-4 space-y-3">
            {[
              { title: 'NIST SP 800-61r3 — Incident Response', desc: 'Ciclo completo de manejo de incidentes: preparación, detección, contención y recuperación.', url: 'https://csrc.nist.gov/pubs/sp/800/61/r3/final' },
              { title: 'NIST SP 800-86 — Forensic Techniques', desc: 'Guía para integrar técnicas forenses en la respuesta a incidentes de seguridad.', url: 'https://csrc.nist.gov/pubs/sp/800/86/final' },
              { title: 'NIST SP 800-83r1 — Malware Handling', desc: 'Prevención y manejo de incidentes de malware en endpoints y estaciones de trabajo.', url: 'https://csrc.nist.gov/pubs/sp/800/83/r1/final' },
              { title: 'NIST SP 800-184 — Cyber Event Recovery', desc: 'Guía para la recuperación de eventos de ciberseguridad y continuidad operativa.', url: 'https://csrc.nist.gov/pubs/sp/800/184/final' },
              { title: 'CISA #StopRansomware Guide (v3, 2023)', desc: 'Guía oficial de CISA para prevenir y responder ante ransomware. Última versión con mejores prácticas actualizadas.', url: 'https://www.cisa.gov/sites/default/files/2025-03/StopRansomware-Guide%20508.pdf' },
              { title: 'MITRE ATT&CK Navigator', desc: 'Mapeo de tácticas, técnicas y procedimientos para contextualizar y analizar incidentes.', url: 'https://attack.mitre.org/' },
              { title: 'ISO/IEC 27035 — Gestión de incidentes', desc: 'Estándar internacional para planificación, detección, evaluación y respuesta a incidentes.', url: 'https://www.iso.org/standard/78973.html' },
              { title: 'FIRST CSIRT Framework', desc: 'Estándares operativos y mejores prácticas para equipos de respuesta a incidentes.', url: 'https://www.first.org/education/csirt' },
            ].map((guide) => (
              <a
                key={guide.title}
                href={guide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-muted/30 border border-border rounded-xl p-4 hover:border-primary/30 hover:bg-muted/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{guide.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{guide.desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  </PageLayout>
  );
};

export default CSIRT;
