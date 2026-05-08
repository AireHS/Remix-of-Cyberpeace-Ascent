import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, CreditCard, FileText, Check, Shield, Eye, AlertTriangle, Crosshair, Scale, ChevronDown, Lock, ArrowRight, Package, Building2, Mail, Phone, User, Globe, Zap, Clock, Monitor, Server } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import logoColor from '@/assets/logo-color.png';

const accent = {
  gradient: 'from-[hsl(215_80%_55%)] to-[hsl(200_70%_50%)]',
  text: 'text-[hsl(215_80%_55%)]',
  bg: 'bg-[hsl(215_80%_55%)]',
  bgLight: 'bg-[hsl(215_80%_55%/0.08)]',
  border: 'border-[hsl(215_80%_55%/0.2)]',
};

const publicDomains = [
  'gmail.com','googlemail.com','hotmail.com','outlook.com','live.com','msn.com',
  'yahoo.com','yahoo.es','yahoo.com.mx','ymail.com','aol.com','protonmail.com',
  'proton.me','icloud.com','me.com','mac.com','mail.com','zoho.com','gmx.com',
  'gmx.es','tutanota.com','inbox.com','fastmail.com','hey.com',
  'mailinator.com','10minutemail.com','temp-mail.org','yopmail.com','guerrillamail.com',
  'throwawaymail.com','fakemail.net'
];

const isCorporateEmail = (email: string) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain && !publicDomains.includes(domain);
};

const countries = [
  'México','Colombia','Chile','Perú','Argentina','Brasil','Ecuador','Panamá',
  'Costa Rica','Guatemala','República Dominicana','Uruguay','Paraguay','Bolivia',
  'Honduras','El Salvador','Nicaragua','Venezuela','España','Estados Unidos','Otro',
];

const iconMap: Record<string, React.ElementType> = {
  soc360: Shield, noc: Monitor, msp: Server, brand: Eye, ir: AlertTriangle, offensive: Crosshair, grc: Scale,
};

const colorMap: Record<string, string> = {
  soc360: 'hsl(215 80% 55%)', noc: 'hsl(180 50% 45%)', msp: 'hsl(260 45% 55%)', brand: 'hsl(35 80% 55%)', ir: 'hsl(0 70% 55%)', offensive: 'hsl(0 65% 50%)', grc: 'hsl(215 15% 50%)',
};

interface CartItem {
  id: string;
  label: string;
  shortLabel: string;
  cost: number;
  params: Record<string, number>;
  defaultServiceType: 'one_shot' | 'recurring';
}

interface CheckoutState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  totalInHouse: number;
}

type Step = 'review' | 'info' | 'payment' | 'confirm';

const steps: { key: Step; label: string }[] = [
  { key: 'review', label: 'Revisar orden' },
  { key: 'info', label: 'Datos de contacto' },
  { key: 'payment', label: 'Método de pago' },
  { key: 'confirm', label: 'Confirmar' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState<CheckoutState | null>(null);
  const [step, setStep] = useState<Step>('review');
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    corporate_email: '',
    company_name: '',
    country: '',
    phone: '',
    payment_method: 'transfer_oc' as 'card' | 'transfer_oc',
    service_type: 'recurring' as 'one_shot' | 'recurring',
    accept_terms: false,
  });
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const state = location.state as CheckoutState | null;
    if (!state || !state.items || state.items.length === 0) {
      navigate('/pricing#calculadora');
      return;
    }
    setCart(state);
    // Set default service type based on items
    const hasOneShot = state.items.some(i => i.defaultServiceType === 'one_shot');
    const hasRecurring = state.items.some(i => i.defaultServiceType === 'recurring');
    if (hasRecurring) {
      setForm(prev => ({ ...prev, service_type: 'recurring' }));
    } else if (hasOneShot) {
      setForm(prev => ({ ...prev, service_type: 'one_shot' }));
    }
  }, [location.state, navigate]);

  const handleEmailChange = (email: string) => {
    setForm(prev => ({ ...prev, corporate_email: email }));
    if (email && email.includes('@')) {
      setEmailError(isCorporateEmail(email) ? '' : 'Por favor ingresa un email corporativo');
    } else {
      setEmailError('');
    }
  };

  const currentStepIndex = steps.findIndex(s => s.key === step);

  const canProceed = () => {
    switch (step) {
      case 'review': return true;
      case 'info': return form.full_name && form.corporate_email && form.company_name && form.country && !emailError && isCorporateEmail(form.corporate_email);
      case 'payment': return form.accept_terms;
      case 'confirm': return false;
    }
  };

  const nextStep = () => {
    const idx = currentStepIndex;
    if (idx < steps.length - 1) setStep(steps[idx + 1].key);
  };

  const prevStep = () => {
    const idx = currentStepIndex;
    if (idx > 0) setStep(steps[idx - 1].key);
  };

  const handleSubmitOrder = async () => {
    if (!cart) return;
    setSubmitting(true);
    try {
      const slug = cart.items.map(i => i.id).join('+');
      const allParams: Record<string, any> = {};
      cart.items.forEach(i => { allParams[i.id] = i.params; });

      // [!] ATENCIÓN DE SEGURIDAD (CWE-602): Confiar en los precios calculados en el cliente es peligroso.
      // Un atacante podría manipular el estado de React o interceptar la red para enviar un 
      // 'estimated_value' igual a 0. Lo ideal es usar Supabase Edge Functions para procesar esto en 
      // el backend, calculando y verificando el precio total según los 'calculation_params' de forma segura.
      const { error } = await supabase.from('pricing_leads').insert({
        full_name: form.full_name,
        corporate_email: form.corporate_email,
        company_name: form.company_name,
        country: form.country,
        phone: form.phone || null,
        service_slug: slug,
        service_type: form.service_type as any,
        payment_method: form.payment_method as any,
        estimated_value: cart.total,
        currency: 'USD',
        calculation_params: allParams as any,
      });
      if (error) throw error;
      setOrderPlaced(true);
      setStep('confirm');
    } catch (err: any) {
      toast.error('Error al procesar la orden. Intenta de nuevo.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart) return null;

  const inputClass = "w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[hsl(215_80%_55%/0.3)] focus:border-[hsl(215_80%_55%/0.4)] transition-all";

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-card/30 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link to="/">
              <img src={logoColor} alt="Cyberpeace" className="h-7" />
            </Link>
            <div className="h-5 w-px bg-border" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Orden Confirmada</span>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-lg">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500/20">
              <Check size={36} className="text-emerald-500" />
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-3">¡Orden registrada!</h1>
            <p className="text-muted-foreground mb-2">
              Hemos recibido tu solicitud de compra por <span className="font-bold text-foreground">{cart.items.length} servicio{cart.items.length > 1 ? 's' : ''}</span>.
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              {form.payment_method === 'card' 
                ? 'Un especialista te contactará para procesar el pago con tarjeta y activar tus servicios.'
                : 'Te enviaremos los datos para transferencia/OC al email proporcionado. Una vez confirmado el depósito, activaremos tus servicios.'
              }
            </p>
            <div className="bg-card border border-border rounded-xl p-5 mb-8 text-left">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Resumen de orden</h3>
              {cart.items.map(item => {
                const Icon = iconMap[item.id] || Shield;
                return (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <Icon size={14} style={{ color: colorMap[item.id] }} />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">${item.cost.toLocaleString('en-US')}</span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-border">
                <span className="text-sm font-bold text-foreground">Total</span>
                <span className="text-lg font-bold text-[hsl(215_80%_55%)]">${cart.total.toLocaleString('en-US')}/mes</span>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Link to="/" className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm font-medium rounded-xl hover:bg-card transition-all">
                Volver al inicio
              </Link>
              <Link to="/contacto" className={`inline-flex items-center gap-2 ${accent.bg} text-white px-6 py-3 text-sm font-bold rounded-xl hover:shadow-lg transition-all`}>
                Contactar equipo
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logoColor} alt="Cyberpeace" className="h-7" />
            </Link>
            <div className="h-5 w-px bg-border" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Lock size={12} /> Checkout
            </span>
          </div>
          <button onClick={() => navigate('/pricing#calculadora')} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft size={12} /> Volver al configurador
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-card/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => { if (i < currentStepIndex) setStep(s.key); }}
                  className={`flex items-center gap-2 ${i <= currentStepIndex ? `${accent.text} cursor-pointer` : 'text-muted-foreground/50 cursor-default'}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all ${
                    i < currentStepIndex ? 'bg-[hsl(215_80%_55%)] border-[hsl(215_80%_55%)] text-white' :
                    i === currentStepIndex ? `${accent.border} ${accent.bgLight}` :
                    'border-border text-muted-foreground/50'
                  }`}>
                    {i < currentStepIndex ? <Check size={12} /> : i + 1}
                  </div>
                  <span className="text-[11px] font-medium hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px ${i < currentStepIndex ? 'bg-[hsl(215_80%_55%)]' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            
            {/* Main content area */}
            <div>
              {step === 'review' && (
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-1">Revisa tu orden</h2>
                  <p className="text-sm text-muted-foreground mb-6">Confirma los servicios y configuración seleccionados.</p>

                  <div className="space-y-3">
                    {cart.items.map(item => {
                      const Icon = iconMap[item.id] || Shield;
                      return (
                        <div key={item.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${colorMap[item.id]?.replace(')', ' / 0.1)')}` }}>
                            <Icon size={18} style={{ color: colorMap[item.id] }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                            <p className="text-[11px] text-muted-foreground">{item.defaultServiceType === 'one_shot' ? 'One-shot' : 'Recurrente mensual'}</p>
                          </div>
                          <span className="text-sm font-bold text-foreground">
                            ${item.cost.toLocaleString('en-US')}
                            <span className="text-[10px] font-normal text-muted-foreground">/mes</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {cart.discount > 0 && (
                    <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <Package size={14} className="text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-600">
                        Descuento por paquete aplicado: -{cart.discount}%
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => navigate('/pricing#calculadora')}
                    className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft size={12} /> Editar configuración
                  </button>
                </div>
              )}

              {step === 'info' && (
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-1">Datos de contacto</h2>
                  <p className="text-sm text-muted-foreground mb-6">Necesitamos esta información para procesar tu orden.</p>

                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5"><User size={12} /> Nombre completo *</label>
                      <input required className={inputClass} value={form.full_name} onChange={e => setForm(prev => ({ ...prev, full_name: e.target.value }))} placeholder="Tu nombre completo" />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5"><Mail size={12} /> Email corporativo *</label>
                      <input required type="email" className={`${inputClass} ${emailError ? 'border-destructive' : ''}`} value={form.corporate_email} onChange={e => handleEmailChange(e.target.value)} placeholder="nombre@tuempresa.com" />
                      {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5"><Building2 size={12} /> Empresa *</label>
                        <input required className={inputClass} value={form.company_name} onChange={e => setForm(prev => ({ ...prev, company_name: e.target.value }))} placeholder="Nombre de tu empresa" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5"><Globe size={12} /> País *</label>
                        <div className="relative">
                          <select required className={`${inputClass} appearance-none pr-8`} value={form.country} onChange={e => setForm(prev => ({ ...prev, country: e.target.value }))}>
                            <option value="">Selecciona</option>
                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5"><Phone size={12} /> Teléfono (opcional)</label>
                      <input className={inputClass} value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} placeholder="+52 55 1234 5678" />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground mb-2 block">Tipo de servicio *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {([{ key: 'recurring', icon: Clock, label: 'Recurrente', desc: 'Facturación mensual' }, { key: 'one_shot', icon: Zap, label: 'One-shot', desc: 'Pago único por proyecto' }] as const).map(t => (
                          <button key={t.key} type="button" onClick={() => setForm(prev => ({ ...prev, service_type: t.key }))}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${form.service_type === t.key ? `${accent.border} ${accent.bgLight} ring-1 ring-[hsl(215_80%_55%/0.1)]` : 'border-border hover:border-border/80'}`}>
                            <t.icon size={16} className={form.service_type === t.key ? accent.text : 'text-muted-foreground'} />
                            <div>
                              <span className="text-sm font-medium text-foreground block">{t.label}</span>
                              <span className="text-[10px] text-muted-foreground">{t.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground mb-1">Método de pago</h2>
                  <p className="text-sm text-muted-foreground mb-6">Selecciona cómo deseas realizar el pago.</p>

                  <div className="space-y-3 max-w-lg">
                    <button
                      onClick={() => setForm(prev => ({ ...prev, payment_method: 'card' }))}
                      className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all ${
                        form.payment_method === 'card' ? `${accent.border} ${accent.bgLight} ring-1 ring-[hsl(215_80%_55%/0.1)]` : 'border-border hover:border-border/80'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${form.payment_method === 'card' ? accent.bgLight : 'bg-muted/30'}`}>
                        <CreditCard size={18} className={form.payment_method === 'card' ? accent.text : 'text-muted-foreground'} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground">Tarjeta de crédito / débito</h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Pago seguro con tarjeta. Se procesará una vez confirmada la orden.</p>
                        {form.payment_method === 'card' && (
                          <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border">
                            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                              <Lock size={10} /> El enlace de pago seguro será enviado a tu email corporativo después de confirmar la orden.
                            </p>
                          </div>
                        )}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        form.payment_method === 'card' ? 'border-[hsl(215_80%_55%)] bg-[hsl(215_80%_55%)]' : 'border-muted-foreground/40'
                      }`}>
                        {form.payment_method === 'card' && <Check size={10} className="text-white" />}
                      </div>
                    </button>

                    <button
                      onClick={() => setForm(prev => ({ ...prev, payment_method: 'transfer_oc' }))}
                      className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all ${
                        form.payment_method === 'transfer_oc' ? `${accent.border} ${accent.bgLight} ring-1 ring-[hsl(215_80%_55%/0.1)]` : 'border-border hover:border-border/80'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${form.payment_method === 'transfer_oc' ? accent.bgLight : 'bg-muted/30'}`}>
                        <FileText size={18} className={form.payment_method === 'transfer_oc' ? accent.text : 'text-muted-foreground'} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground">Transferencia / Orden de Compra</h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Pago por transferencia bancaria u orden de compra corporativa.</p>
                        {form.payment_method === 'transfer_oc' && (
                          <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border">
                            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                              <FileText size={10} /> Recibirás los datos bancarios y la factura proforma en tu email corporativo.
                            </p>
                          </div>
                        )}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        form.payment_method === 'transfer_oc' ? 'border-[hsl(215_80%_55%)] bg-[hsl(215_80%_55%)]' : 'border-muted-foreground/40'
                      }`}>
                        {form.payment_method === 'transfer_oc' && <Check size={10} className="text-white" />}
                      </div>
                    </button>
                  </div>

                  {/* Terms */}
                  <div className="mt-8 max-w-lg">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, accept_terms: !prev.accept_terms }))}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          form.accept_terms ? 'bg-[hsl(215_80%_55%)] border-[hsl(215_80%_55%)]' : 'border-muted-foreground/40 group-hover:border-muted-foreground/60'
                        }`}
                      >
                        {form.accept_terms && <Check size={10} className="text-white" />}
                      </button>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Acepto los <a href="#" className="text-[hsl(215_80%_55%)] underline hover:no-underline">Términos y Condiciones</a> y la{' '}
                        <a href="#" className="text-[hsl(215_80%_55%)] underline hover:no-underline">Política de Privacidad</a> de Cyberpeace. 
                        Entiendo que esta orden generará un compromiso contractual una vez confirmado el pago.
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — Order summary (always visible) */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-border bg-muted/20">
                  <div className="flex items-center gap-2 mb-1">
                    <ShoppingCart size={16} className="text-[hsl(215_80%_55%)]" />
                    <h3 className="font-semibold text-foreground text-sm">Tu orden</h3>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{cart.items.length} servicio{cart.items.length > 1 ? 's' : ''}</p>
                </div>

                <div className="p-5 space-y-2">
                  {cart.items.map(item => {
                    const Icon = iconMap[item.id] || Shield;
                    return (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon size={12} style={{ color: colorMap[item.id] }} />
                          <span className="text-xs text-foreground">{item.shortLabel}</span>
                        </div>
                        <span className="text-xs font-medium text-foreground">${item.cost.toLocaleString('en-US')}</span>
                      </div>
                    );
                  })}

                  {cart.discount > 0 && (
                    <>
                      <div className="border-t border-border/50 my-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Subtotal</span>
                        <span className="text-xs text-muted-foreground">${cart.subtotal.toLocaleString('en-US')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <Package size={10} /> Descuento
                        </span>
                        <span className="text-xs text-emerald-600 font-bold">-{cart.discount}%</span>
                      </div>
                    </>
                  )}

                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground line-through">In-house: ${cart.totalInHouse.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-foreground">Total</span>
                      <span className="text-lg font-bold text-[hsl(215_80%_55%)]">
                        ${cart.total.toLocaleString('en-US')}
                        <span className="text-[10px] font-normal text-muted-foreground">/mes</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="px-5 pb-5 space-y-2">
                  {step !== 'confirm' && (
                    <button
                      onClick={step === 'payment' ? handleSubmitOrder : nextStep}
                      disabled={!canProceed() || submitting}
                      className={`w-full flex items-center justify-center gap-2 ${accent.bg} text-white py-3 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[hsl(215_80%_55%/0.25)]`}
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : step === 'payment' ? (
                        <>
                          <Lock size={14} /> Confirmar compra
                        </>
                      ) : (
                        <>
                          Continuar <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  )}
                  {currentStepIndex > 0 && step !== 'confirm' && (
                    <button onClick={prevStep} className="w-full text-xs text-muted-foreground hover:text-foreground py-2 transition-colors flex items-center justify-center gap-1">
                      <ArrowLeft size={10} /> Paso anterior
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-muted-foreground/50">
                <Lock size={10} /> Conexión segura SSL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
