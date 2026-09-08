import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { cn } from "@/lib/utils";
import { useAdminOrders } from "@/lib/admin/orders-context";
import {
  brl,
  formatDate,
  orderTotal,
  PAYMENT_LABELS,
  STATUS_LABELS,
  STATUS_ORDER,
} from "@/lib/admin/types";

export const Route = createFileRoute("/admin/pedidos/$id")({
  head: () => ({
    meta: [
      { title: "Detalhes do pedido — Painel Ferracini Lanches" },
      {
        name: "description",
        content:
          "Produtos, valores, observações, dados do cliente e alteração de status do pedido no Ferracini Lanches.",
      },
      { property: "og:title", content: "Detalhes do pedido — Ferracini Lanches" },
      {
        property: "og:description",
        content: "Consulte itens, cliente e atualize o status do pedido.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: OrderDetail,
});

function OrderDetail() {
  const { id } = Route.useParams();
  const { getOrder, updateStatus } = useAdminOrders();
  const order = getOrder(id);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-surface p-10 text-center">
        <p className="text-sm text-muted-foreground">Pedido não encontrado.</p>
        <Link
          to="/admin/pedidos"
          className="mt-6 inline-block rounded-full bg-brand-yellow px-5 py-2 text-[11px] font-black uppercase tracking-widest text-dark"
        >
          Voltar aos pedidos
        </Link>
      </div>
    );
  }

  const total = orderTotal(order);

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/admin/pedidos"
        className="mb-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand-yellow"
      >
        <ArrowLeft className="size-4" />
        Voltar aos pedidos
      </Link>

      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl uppercase leading-none">
            Pedido #{order.numero}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatDate(order.data)} às {order.hora} • {PAYMENT_LABELS[order.formaPagamento]}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="mb-5 text-[11px] font-black uppercase tracking-widest text-brand-yellow">
            Produtos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  <th className="pb-3">Item</th>
                  <th className="pb-3">Qtd</th>
                  <th className="pb-3">Unitário</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.itens.map((item) => (
                  <tr key={item.nome} className="border-b border-white/5 last:border-0">
                    <td className="py-3 font-bold">{item.nome}</td>
                    <td className="py-3 text-muted-foreground">{item.quantidade}x</td>
                    <td className="py-3 text-muted-foreground">
                      {brl(item.valorUnitario)}
                    </td>
                    <td className="py-3 text-right font-bold">
                      {brl(item.quantidade * item.valorUnitario)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              Valor total
            </span>
            <span className="font-display text-3xl uppercase text-brand-yellow">
              {brl(total)}
            </span>
          </div>

          <div className="mt-6 rounded-xl border border-brand-yellow/30 bg-brand-yellow/10 p-4">
            <h3 className="mb-1 text-[11px] font-black uppercase tracking-widest text-brand-yellow">
              Observações
            </h3>
            <p className="text-sm leading-relaxed">
              {order.observacoes || "Sem observações para este pedido."}
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-surface p-6">
            <h2 className="mb-4 text-[11px] font-black uppercase tracking-widest text-brand-yellow">
              Dados do cliente
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Nome
                </dt>
                <dd className="font-bold">{order.cliente.nome}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Telefone
                </dt>
                <dd>{order.cliente.telefone}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Endereço
                </dt>
                <dd>{order.cliente.endereco}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-white/10 bg-surface p-6">
            <h2 className="mb-4 text-[11px] font-black uppercase tracking-widest text-brand-yellow">
              Alterar status
            </h2>
            <div className="flex flex-col gap-2">
              {STATUS_ORDER.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => updateStatus(order.id, status)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-colors",
                    order.status === status
                      ? "border-brand-yellow bg-brand-yellow text-dark"
                      : "border-white/10 text-muted-foreground hover:border-brand-yellow/40 hover:text-foreground",
                  )}
                >
                  {STATUS_LABELS[status]}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
