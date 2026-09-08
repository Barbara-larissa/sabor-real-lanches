import { cn } from "@/lib/utils";
import { STATUS_LABELS, type OrderStatus } from "@/lib/admin/types";

const STATUS_STYLES: Record<OrderStatus, string> = {
  recebido: "border-brand-blue/40 bg-brand-blue/15 text-brand-blue",
  em_preparo: "border-brand-yellow/40 bg-brand-yellow/15 text-brand-yellow",
  pronto: "border-brand-green/40 bg-brand-green/15 text-brand-green",
  finalizado: "border-white/20 bg-white/10 text-muted-foreground",
  cancelado: "border-brand-red/40 bg-brand-red/15 text-brand-red",
};

export function StatusBadge({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-widest",
        STATUS_STYLES[status],
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
