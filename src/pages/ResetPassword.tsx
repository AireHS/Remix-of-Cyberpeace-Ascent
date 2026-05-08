import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Shield, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import logoColor from '@/assets/logo-color.png';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      setIsRecovery(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const isStrongPassword = (p: string) =>
    p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p);

  const passwordErrors = password.length > 0 ? [
    { ok: password.length >= 8, msg: 'Mínimo 8 caracteres' },
    { ok: /[A-Z]/.test(password), msg: 'Una letra mayúscula' },
    { ok: /[a-z]/.test(password), msg: 'Una letra minúscula' },
    { ok: /[0-9]/.test(password), msg: 'Un número' },
    { ok: /[^A-Za-z0-9]/.test(password), msg: 'Un carácter especial (!@#$...)' },
  ] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStrongPassword(password)) {
      toast.error('La contraseña no cumple los requisitos de seguridad');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Contraseña actualizada correctamente');
      // Buena práctica de seguridad: Destruir la sesión actual del enlace de recuperación para 
      // obligar al usuario a iniciar sesión con sus nuevas credenciales.
      await supabase.auth.signOut();
      navigate('/partner-login');
    }
    setLoading(false);
  };

  const inputClass = "w-full bg-card/50 border border-border rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all";

  if (!isRecovery) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-6">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Enlace inválido</h1>
          <p className="text-muted-foreground text-sm mb-6">Este enlace de recuperación no es válido o ha expirado.</p>
          <Link to="/partner-login" className="text-primary hover:underline text-sm">Volver al inicio de sesión</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="shrink-0">
            <img src={logoColor} alt="Cyberpeace" className="h-7" />
          </Link>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Partner Portal</span>
        </div>
      </div>
      <section className="py-24 lg:py-32">
        <div className="max-w-md mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
              <Shield className="w-3.5 h-3.5" />
              Restablecer Contraseña
            </span>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-3 tracking-[-0.02em]">
              Nueva Contraseña
            </h1>
            <p className="text-muted-foreground text-sm">Ingresa tu nueva contraseña segura</p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nueva contraseña *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className={inputClass + ' pr-10'}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordErrors.length > 0 && (
                  <div className="mt-2 ml-1 space-y-1">
                    {passwordErrors.map((pe) => (
                      <p key={pe.msg} className={`flex items-center gap-1.5 text-xs ${pe.ok ? 'text-green-500' : 'text-muted-foreground/60'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${pe.ok ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                        {pe.msg}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirmar contraseña *"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={inputClass}
              />
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="flex items-center gap-1.5 text-xs text-destructive ml-1">
                  <AlertCircle className="w-3 h-3" />
                  Las contraseñas no coinciden
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Actualizar Contraseña
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
