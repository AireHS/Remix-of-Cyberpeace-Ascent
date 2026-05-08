import { Linkedin, Youtube, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Clock, ChevronUp, ChevronDown } from 'lucide-react';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          
          {/* Columna 1: Logo */}
          <div className="lg:col-span-1">
            <img src={logoColor} alt="Cyberpeace" className="h-8 brightness-0 invert opacity-90 mb-6" />
            <p className="text-white/70 text-sm leading-relaxed mb-6">Tu aliado en ciberseguridad integral.</p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, url, label }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-colors" aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Oficinas */}
          <div>
            <h4 className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Oficinas</h4>
            <div className="space-y-4">
              {offices.map((o) => (
                <details key={o.city} className="group">
                  <summary className="text-white/80 text-sm font-medium cursor-pointer list-none flex items-center gap-2 hover:text-primary transition-colors">
                    {o.city}
                    <ChevronDown size={14} className="group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <p className="text-white/50 text-xs mt-3 pl-3 border-l border-white/10 leading-relaxed">{o.address}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <Clock size={16} className="text-primary/60 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Lunes a viernes de 9:00 a 18:00 horas.</span>
              </div>
              <a href="mailto:ventas@cyberpeace.tech" className="flex items-center gap-3 text-white/70 text-sm hover:text-primary transition-colors">
                <Mail size={16} className="text-primary/60 shrink-0" />
                ventas@cyberpeace.tech
              </a>
              <a href="tel:+525581115800" className="flex items-center gap-3 text-white/70 text-sm hover:text-primary transition-colors">
                <Phone size={16} className="text-primary/60 shrink-0" />
                +52 55 8111 5800
              </a>
            </div>
          </div>

          {/* Columna 4: Acerca de Cyberpeace */}
          <div>
            <h4 className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">Acerca de Cyberpeace</h4>
            <div className="space-y-3">
              {aboutLinks.map((link) => (
                <a key={link} href="#" className="block text-white/75 text-sm hover:text-primary hover:translate-x-1 transition-all duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] pt-8 flex flex-wrap justify-between items-center gap-4">
          <span className="text-white/50 text-xs">© 2026 CyberPeace. Todos los derechos reservados.</span>
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
