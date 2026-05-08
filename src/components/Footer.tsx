import { Linkedin, Youtube, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Clock, ChevronUp } from 'lucide-react';
import logoColor from '@/assets/logo-color.png';

const offices = [
  { city: 'Ciudad de México', address: 'Periférico Sur 3395, Jardines del Pedregal, Tlalpan, 14120 Ciudad de México, México.' },
  { city: 'Nuevo León', address: 'Humberto Junco Voigt 2307, Valle Oriente, 66269 San Pedro Garza García, N.L. México.' },
  { city: 'Cuernavaca', address: 'Avenida Morelos 178 Int C 1, Centro, 62000, Cuernavaca, Morelos, México.' },
  { city: 'España', address: 'Camí Can Calders, 10; 1° 5ª, Sant Cugat del Vallés, C.P 08173, Barcelona, Spain.' },
  { city: 'Chile', address: 'Av. Apoquindo 6410, 7560903 Las Condes, Región Metropolitana, Chile.' },
];

const socials = [
  { icon: Facebook, url: 'https://www.facebook.com/CyberpeaceTech', label: 'Facebook' },
  { icon: Linkedin, url: 'https://www.linkedin.com/company/cyberpeacetech', label: 'LinkedIn' },
  { icon: Youtube, url: 'https://www.youtube.com/channel/UCQJ2eOd-PaV6SJUulmhxzPg', label: 'YouTube' },
  { icon: Twitter, url: 'https://twitter.com/cyberpeacetech', label: 'Twitter' },
  { icon: Instagram, url: 'https://www.instagram.com/cyberpeace_tech/', label: 'Instagram' },
];

const aboutLinks = [
  'Misión y Visión', 'Derechos ARCO', 'Aviso de Privacidad',
  'Aviso de Privacidad: Empleados', 'Aviso de Privacidad: Candidatos', 'Política general del SGI',
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[hsl(222_30%_8%)] text-white py-14 px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Oficinas */}
          <div>
            <h4 className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Oficinas Corporativas</h4>
            <div className="space-y-5">
              {offices.map((o) => (
                <div key={o.city}>
                  <p className="text-primary/90 text-xs font-semibold uppercase tracking-wider mb-1">{o.city}</p>
                  <p className="text-white/70 text-xs leading-relaxed">{o.address}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-white/70 text-xs">
                <Clock size={13} className="text-primary/60" />
                <span>Lunes a viernes de 9:00 a 18:00 horas.</span>
              </div>
              <a href="tel:+525581115800" className="flex items-center gap-2.5 text-white/70 text-xs hover:text-primary transition-colors duration-300">
                <Phone size={13} className="text-primary/60" />
                +52 55 8111 5800
              </a>
              <a href="mailto:ventas@cyberpeace.tech" className="flex items-center gap-2.5 text-white/70 text-xs hover:text-primary transition-colors duration-300">
                <Mail size={13} className="text-primary/60" />
                ventas@cyberpeace.tech
              </a>
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Redes Sociales</h4>
            <div className="space-y-3">
              {socials.map(({ icon: Icon, url, label }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/75 text-sm hover:text-white transition-all duration-300 group">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/30 group-hover:text-primary transition-all duration-300">
                    <Icon size={15} />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Acerca de + Certificaciones */}
          <div>
            <h4 className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Acerca de Cyberpeace</h4>
            <div className="space-y-3 mb-8">
              {aboutLinks.map((link) => (
                <a key={link} href="#" className="block text-white/75 text-sm hover:text-primary hover:translate-x-1 transition-all duration-300">
                  {link}
                </a>
              ))}
            </div>

            {/* Certification badges */}
            <div className="grid grid-cols-2 gap-2">
              {['ISO 27001', 'SOC 2'].map((cert) => (
                <div key={cert} className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-2.5 text-center hover:border-primary/25 hover:bg-primary/[0.06] transition-all duration-300">
                  <span className="text-[9px] text-white/60 font-medium uppercase tracking-wider">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img src={logoColor} alt="Cyberpeace" className="h-6 brightness-0 invert opacity-90" />
          </div>
          <span className="text-white/50 text-xs">Cyberpeace Copyright © 2026 - All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/40 border border-white/[0.1] px-2.5 py-1 rounded font-mono">TLP:CLEAR</span>
            <button onClick={scrollToTop} className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
              <ChevronUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
