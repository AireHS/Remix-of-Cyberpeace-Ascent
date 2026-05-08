import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { Shield, ArrowRight, Eye, EyeOff, Building2, User, Phone, Globe, AlertCircle, Mail } from 'lucide-react';
import { toast } from 'sonner';
import logoColor from '@/assets/logo-color.png';

const freeEmailDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'aol.com', 'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com', 'live.com', 'msn.com', 'gmx.com', 'inbox.com'];
const isCorpEmail = (e: string) => {
  const domain = e.split('@')[1]?.toLowerCase();
  return domain && !freeEmailDomains.includes(domain);
};
const isStrongPassword = (p: string) =>
  p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p);

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      navigate('/partner-dashboard');
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Ingresa tu email corporativo');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Se envió un enlace de recuperación a tu email');
      setMode('login');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
        extraParams: {
          hd: "*",
          prompt: "select_account",
        },
      });
      if (result.error) {
        toast.error('Error al iniciar sesión con Google');
        setLoading(false);
        return;
      }
      if (result.redirected) return;
      navigate('/partner-dashboard');
    } catch {
      toast.error('Error al conectar con Google');
    }
    setLoading(false);
  };

  const passwordErrors = password.length > 0 ? [
    { ok: password.length >= 8, msg: 'Mínimo 8 caracteres' },
    { ok: /[A-Z]/.test(password), msg: 'Una letra mayúscula' },
    { ok: /[a-z]/.test(password), msg: 'Una letra minúscula' },
    { ok: /[0-9]/.test(password), msg: 'Un número' },
    { ok: /[^A-Za-z0-9]/.test(password), msg: 'Un carácter especial (!@#$...)' },
  ] : [];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim()) {
      toast.error('Completa todos los campos requeridos');
      return;
    }
    if (!isCorpEmail(email)) {
      toast.error('Debes usar un email corporativo (no se permiten Gmail, Hotmail, etc.)');
      return;
    }
    if (!isStrongPassword(password)) {
      toast.error('La contraseña no cumple los requisitos de seguridad');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      const { error: profileError } = await supabase.from('partner_profiles').insert({
        user_id: data.user.id,
        company_name: companyName,
        contact_name: contactName,
        phone,
        country,
      });
      if (profileError) {
        toast.error('Error creando perfil: ' + profileError.message);
      } else {
        toast.success('Registro exitoso. Tu cuenta está pendiente de aprobación.');
        setMode('login');
      }
    }
    setLoading(false);
  };

  const inputClass = "w-full bg-card/50 border border-border rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all";
  const inputIconClass = "w-full bg-card/50 border border-border rounded-xl py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all";

  const titles: Record<string, { h1: string; sub: string }> = {
    login: { h1: 'Accede al Portal', sub: 'Recursos exclusivos para partners de Cyberpeace' },
    register: { h1: 'Registra tu Empresa', sub: 'Únete al programa de partners y accede a materiales exclusivos' },
    forgot: { h1: 'Recuperar Contraseña', sub: 'Te enviaremos un enlace para restablecer tu contraseña' },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          {/* Title */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] uppercase tracking-[0.15em]">
              <Shield className="w-3.5 h-3.5" />
              Partner Portal
            </span>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-3 tracking-[-0.02em]">
              {titles[mode].h1}
            </h1>
            <p className="text-muted-foreground text-sm">{titles[mode].sub}</p>
          </div>

          {/* Card */}
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8">
            {/* Toggle (login/register only) */}
            {mode !== 'forgot' && (
              <div className="flex mb-6 bg-muted/30 rounded-xl p-1">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${mode === 'login' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${mode === 'register' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Registrarse
                </button>
              </div>
            )}

            {/* Google Login */}
            {mode !== 'forgot' && (
              <div className="mb-6">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 border border-border rounded-xl py-3 text-sm font-medium text-foreground hover:bg-muted/30 transition-all disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continuar con Google (corporativo)
                </button>
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground/60">o con email</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              </div>
            )}

            {/* Forgot Password Form */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input type="email" placeholder="Email corporativo *" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputIconClass} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>Enviar enlace de recuperación<ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
                <button type="button" onClick={() => setMode('login')} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Volver al inicio de sesión
                </button>
              </form>
            )}

            {/* Login / Register Forms */}
            {mode !== 'forgot' && (
              <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
                {mode === 'register' && (
                  <>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                      <input type="text" placeholder="Nombre de la empresa *" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className={inputIconClass} />
                    </div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                      <input type="text" placeholder="Nombre de contacto *" value={contactName} onChange={(e) => setContactName(e.target.value)} required className={inputIconClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                        <input type="tel" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputIconClass} />
                      </div>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                        <input type="text" placeholder="País" value={country} onChange={(e) => setCountry(e.target.value)} className={inputIconClass} />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <input type="email" placeholder="Email corporativo *" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
                  {mode === 'register' && email.length > 0 && !isCorpEmail(email) && (
                    <p className="flex items-center gap-1.5 text-xs text-destructive mt-1.5 ml-1">
                      <AlertCircle className="w-3 h-3" />
                      Usa tu email corporativo (no se permiten Gmail, Hotmail, etc.)
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={mode === 'login' ? 'Contraseña' : 'Contraseña segura *'}
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
                  {mode === 'register' && passwordErrors.length > 0 && (
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

                {mode === 'login' && (
                  <div className="text-right">
                    <button type="button" onClick={() => setMode('forgot')} className="text-xs text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
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
                      {mode === 'login' ? 'Acceder al Portal' : 'Registrar Empresa'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            ¿Necesitas ayuda?{' '}
            <a href="/contacto" className="text-primary hover:underline">Contacta al equipo de Channel</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default PartnerLogin;
