import { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cp-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = (type: 'all' | 'essential') => {
    localStorage.setItem('cp-cookie-consent', type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] animate-in fade-in duration-300" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
        <div className="max-w-3xl mx-auto bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground mb-1">Privacidad y Cookies</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar contenido. 
                Al continuar navegando, aceptas nuestra{' '}
                <button onClick={() => setShowDetails(!showDetails)} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                  política de privacidad
                </button>.
              </p>
            </div>
            <button
              onClick={() => accept('essential')}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Details (expandable) */}
          {showDetails && (
            <div className="px-6 pb-4 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="bg-muted/50 border border-border rounded-xl p-4 space-y-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Cookies esenciales</p>
                    <p>Necesarias para el funcionamiento del sitio. No se pueden desactivar.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/60 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Cookies analíticas</p>
                    <p>Nos ayudan a entender cómo usas el sitio para mejorar la experiencia.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/30 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Cookies de marketing</p>
                    <p>Permiten mostrar contenido relevante y medir campañas.</p>
                  </div>
                </div>
                <p className="pt-2 border-t border-border text-[11px] text-muted-foreground/70">
                  Para más información consulta nuestro <a href="#" className="text-primary underline underline-offset-2">Aviso de Privacidad</a> y la <a href="#" className="text-primary underline underline-offset-2">Política de Cookies</a>. 
                  Puedes ejercer tus derechos ARCO contactándonos en privacidad@cyberpeace.tech
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="px-6 pb-5 flex items-center gap-3 justify-end">
            <button
              onClick={() => accept('essential')}
              className="px-4 py-2 text-xs font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted hover:text-foreground transition-all duration-200 active:scale-[0.97]"
            >
              Solo esenciales
            </button>
            <button
              onClick={() => accept('all')}
              className="px-5 py-2 text-xs font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-200 active:scale-[0.97] shadow-sm"
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
