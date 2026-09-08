import { Link } from "@tanstack/react-router";

import { StatusBadge } from "./StatusBadge";
import {
  brl,
  formatDate,
  orderTotal,
  PAYMENT_LABELS,
  type Order,
} from "@/lib/admin/types";

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-surface p-10 text-center text-sm text-muted-foreground">
        Nenhum pedido encontrado.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              <th className="px-5 py-4">Pedido</th>
              <th className="px-5 py-4">Cliente</th>
              <th className="px-5 py-4">Data</th>
              <th className="px-5 py-4">Hora</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Pagamento</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/5"
              >
                <td className="px-5 py-4 font-black">#{order.numero}</td>
                <td className="px-5 py-4">{order.cliente.nome}</td>
                <td className="px-5 py-4 text-muted-foreground">{formatDate(order.data)}</td>
                <td className="px-5 py-4 text-muted-foreground">{order.hora}</td>
                <td className="px-5 py-4 font-bold text-brand-yellow">
                  {brl(orderTotal(order))}
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {PAYMENT_LABELS[order.formaPagamento]}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    to="/admin/pedidos/$id"
                    params={{ id: order.id }}
                    className="rounded-full bg-brand-red px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-colors hover:bg-brand-red/90"
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
