import { Cpu, Shield, Wifi, Factory, ChevronRight, ArrowRight, Network, Radio, AlertTriangle, Lock } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Link } from 'react-router-dom';

const capabilities = [
  { icon: Factory, title: 'Inventario de Activos OT', desc: 'Descubrimiento y clasificación pasiva de todos los dispositivos ICS/SCADA sin interrumpir operaciones productivas.' },
  { icon: Shield, title: 'Segmentación IT/OT', desc: 'Diseño e implementación de zonas de seguridad según IEC 62443 y modelo de Purdue con micro-segmentación.' },
  { icon: Wifi, title: 'Monitoreo de Protocolos', desc: 'Inspección profunda de Modbus, DNP3, OPC-UA, S7, BACnet y otros protocolos industriales en tiempo real.' },
  { icon: Cpu, title: 'Detección de Anomalías', desc: 'Machine learning para detectar comportamientos anómalos en redes OT sin depender de firmas conocidas.' },
  { icon: Network, title: 'Network Visibility', desc: 'Mapeo completo de comunicaciones IT/OT con identificación de flujos no autorizados y shadow connections.' },
  { icon: Lock, title: 'Secure Remote Access', desc: 'Acceso remoto seguro para mantenimiento de sistemas OT con grabación de sesiones y MFA.' },
];

const sectors = [
  'Energía y Utilities', 'Manufactura', 'Oil & Gas', 'Transporte',
  'Agua y Saneamiento', 'Telecomunicaciones', 'Salud', 'Minería',
];

const frameworks = [
  'IEC 62443', 'NIST SP 800-82', 'NERC CIP', 'Modelo de Purdue',
  'MITRE ATT&CK for ICS', 'ISA/IEC 62443',
];

const OTIoT = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
          Capacidades
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6 leading-[1.1]">
          Seguridad para infraestructura<br />
          <span className="gradient-text">crítica.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
          Protección para sistemas de control industrial, SCADA y dispositivos IoT sin interrumpir la operación.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm">
            Solicitar evaluación OT <ChevronRight className="w-4 h-4" />
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
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4 text-center">Capacidades OT/IoT</h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">Visibilidad y protección sin impactar la operación</p>
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

    {/* Sectors */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl text-foreground mb-4">Sectores que protegemos</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12">Experiencia en infraestructura crítica de múltiples industrias</p>
        <div className="flex flex-wrap justify-center gap-3">
          {sectors.map((s) => (
            <span key={s} className="px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:border-primary/30 transition-colors duration-300">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* Frameworks */}
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl text-foreground mb-4">Estándares y frameworks</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-12">Alineados con los estándares de seguridad industrial más exigentes</p>
        <div className="flex flex-wrap justify-center gap-3">
          {frameworks.map((fw) => (
            <span key={fw} className="px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:border-primary/30 transition-colors duration-300">
              {fw}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 border-t border-border bg-card/30">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
          ¿Conoces todos los dispositivos conectados a tu red OT?
        </h2>
        <p className="text-muted-foreground mb-10">
          El 70% de las organizaciones industriales no tienen visibilidad completa de sus activos OT. Descúbrelos ahora.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300">
            Solicitar evaluación <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/contacto" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-muted/60 transition-all duration-300">
            Hablar con un especialista OT
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default OTIoT;
