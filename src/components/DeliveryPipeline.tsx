import { useMemo } from 'react';

type DeliveryPhase = 'pending' | 'onboarding' | 'configuracion' | 'operacion' | 'revision' | 'kickoff' | 'implementacion' | 'qa' | 'entrega' | 'cerrado';
type DeliveryType = 'recurring' | 'one_shot';

interface DeliveryPipelineProps {
  phase: DeliveryPhase;
  deliveryType: DeliveryType | null;
  phaseStartedAt: string | null;
  phaseSlaDays: number;
  deliveryResponsible: string | null;
  deliveryNotes: string | null;
  /** Admin mode allows changing phase/responsible */
  isAdmin?: boolean;
  /** Partner name for responsible display */
  responsibleName?: string;
  onPhaseChange?: (phase: DeliveryPhase) => void;
  onResponsibleChange?: (userId: string) => void;
  onNotesChange?: (notes: string) => void;
  onTypeChange?: (type: DeliveryType) => void;
  onSlaChange?: (days: number) => void;
  partners?: { user_id: string; contact_name: string; company_name: string }[];
}

const RECURRING_PHASES: { key: DeliveryPhase; label: string }[] = [
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'configuracion', label: 'Configuración' },
  { key: 'operacion', label: 'Operación' },
  { key: 'revision', label: 'Revisión' },
  { key: 'cerrado', label: 'Cerrado' },
];

const ONESHOT_PHASES: { key: DeliveryPhase; label: string }[] = [
  { key: 'kickoff', label: 'Kickoff' },
  { key: 'implementacion', label: 'Implementación' },
  { key: 'qa', label: 'QA' },
  { key: 'entrega', label: 'Entrega' },
  { key: 'cerrado', label: 'Cerrado' },
];

const getPhases = (type: DeliveryType | null) =>
  type === 'one_shot' ? ONESHOT_PHASES : RECURRING_PHASES;

const DeliveryPipeline = ({
  phase,
  deliveryType,
  phaseStartedAt,
  phaseSlaDays,
  deliveryResponsible,
  deliveryNotes,
  isAdmin = false,
  responsibleName,
  onPhaseChange,
  onResponsibleChange,
  onNotesChange,
  onTypeChange,
  onSlaChange,
  partners = [],
}: DeliveryPipelineProps) => {
  const phases = getPhases(deliveryType);
  const currentIdx = phases.findIndex(p => p.key === phase);
  const isPending = phase === 'pending';

  // SLA calculation
  const sla = useMemo(() => {
    if (!phaseStartedAt || phase === 'cerrado' || isPending) return null;
    const start = new Date(phaseStartedAt).getTime();
    const now = Date.now();
    const elapsed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const remaining = phaseSlaDays - elapsed;
    const pct = phaseSlaDays > 0 ? remaining / phaseSlaDays : 1;
    const status: 'green' | 'yellow' | 'red' = pct > 0.5 ? 'green' : pct > 0 ? 'yellow' : 'red';
    return { elapsed, remaining: Math.max(0, remaining), status, pct };
  }, [phaseStartedAt, phaseSlaDays, phase, isPending]);

  const slaColors = {
    green: { bg: 'bg-green-500/10', text: 'text-green-600', dot: 'bg-green-500', border: 'border-green-500/20' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', dot: 'bg-yellow-500', border: 'border-yellow-500/20' },
    red: { bg: 'bg-red-500/10', text: 'text-red-600', dot: 'bg-red-500 animate-pulse', border: 'border-red-500/20' },
  };

  if (isPending && !isAdmin) {
    return (
      <div className="mt-3 p-3 bg-muted/30 border border-border rounded-lg">
        <p className="text-[11px] text-muted-foreground">Delivery pendiente de configuración</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Admin: Type selector */}
      {isAdmin && isPending && (
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium text-muted-foreground">Tipo de delivery:</span>
          <button
            onClick={() => onTypeChange?.('recurring')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
              deliveryType === 'recurring' ? 'bg-primary/10 text-primary border-primary/20' : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Recurrente
          </button>
          <button
            onClick={() => onTypeChange?.('one_shot')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
              deliveryType === 'one_shot' ? 'bg-primary/10 text-primary border-primary/20' : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            One-Shot
          </button>
        </div>
      )}

      {/* Stepper */}
      {!isPending && (
        <div className="relative">
          <div className="flex items-center justify-between">
            {phases.map((p, i) => {
              const isDone = i < currentIdx;
              const isCurrent = i === currentIdx;
              const isFuture = i > currentIdx;
              return (
                <div key={p.key} className="flex flex-col items-center flex-1 relative">
                  {/* Connector line */}
                  {i > 0 && (
                    <div className={`absolute top-3 right-1/2 left-[-50%] h-[2px] ${isDone || isCurrent ? 'bg-primary' : 'bg-border'}`} style={{ left: '-50%', right: '50%', top: '11px' }} />
                  )}
                  {/* Node */}
                  <button
                    disabled={!isAdmin || !onPhaseChange}
                    onClick={() => isAdmin && onPhaseChange?.(p.key)}
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
                      isDone
                        ? 'bg-primary text-primary-foreground'
                        : isCurrent
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-muted border-2 border-border text-muted-foreground'
                    } ${isAdmin ? 'cursor-pointer hover:scale-110' : ''}`}
                  >
                    {isDone ? '✓' : i + 1}
                  </button>
                  {/* Label */}
                  <span className={`mt-1.5 text-[9px] font-semibold text-center leading-tight ${isCurrent ? 'text-primary' : isDone ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                    {p.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SLA Badge */}
      {sla && (
        <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg border ${slaColors[sla.status].bg} ${slaColors[sla.status].border}`}>
          <div className={`w-2 h-2 rounded-full shrink-0 ${slaColors[sla.status].dot}`} />
          <div className="flex-1">
            <span className={`text-[11px] font-semibold ${slaColors[sla.status].text}`}>
              {sla.remaining > 0 ? `${sla.remaining} días restantes` : `SLA vencido (${Math.abs(sla.remaining)} días de retraso)`}
            </span>
            <span className="text-[10px] text-muted-foreground ml-2">
              · {sla.elapsed}d transcurridos de {phaseSlaDays}d
            </span>
          </div>
          {isAdmin && onSlaChange && (
            <select
              value={phaseSlaDays}
              onChange={e => onSlaChange(Number(e.target.value))}
              className="bg-transparent border border-border/50 rounded-md px-2 py-0.5 text-[10px] font-medium text-foreground focus:outline-none cursor-pointer"
            >
              {[3, 5, 7, 10, 14, 21, 30, 45, 60, 90].map(d => (
                <option key={d} value={d}>{d} días SLA</option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Responsible + Notes (admin) */}
      {isAdmin && !isPending && (
        <div className="flex flex-wrap items-center gap-3">
          {onResponsibleChange && partners.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground">Responsable:</span>
              <select
                value={deliveryResponsible || ''}
                onChange={e => onResponsibleChange(e.target.value)}
                className="bg-card border border-border rounded-lg py-1.5 px-2.5 text-[11px] font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer max-w-[200px]"
              >
                <option value="">Sin asignar</option>
                {partners.map(p => (
                  <option key={p.user_id} value={p.user_id}>{p.contact_name} — {p.company_name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Read-only responsible for partners */}
      {!isAdmin && responsibleName && (
        <p className="text-[11px] text-muted-foreground">
          Responsable: <span className="font-semibold text-foreground">{responsibleName}</span>
        </p>
      )}

      {/* Delivery notes */}
      {deliveryNotes && !isAdmin && (
        <p className="text-[11px] text-muted-foreground/80 italic">Nota delivery: {deliveryNotes}</p>
      )}
    </div>
  );
};

export default DeliveryPipeline;
