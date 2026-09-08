import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { OrdersTable } from "@/components/admin/OrdersTable";
import { cn } from "@/lib/utils";
import { useAdminOrders } from "@/lib/admin/orders-context";
import { STATUS_LABELS, STATUS_ORDER, type OrderStatus } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/pedidos/")({
  head: () => ({
    meta: [
      { title: "Pedidos — Painel Ferracini Lanches" },
      {
        name: "description",
        content:
          "Lista completa dos pedidos do Ferracini Lanches com cliente, valor, forma de pagamento e status.",
      },
      { property: "og:title", content: "Pedidos — Painel Ferracini Lanches" },
      {
        property: "og:description",
        content: "Acompanhe e atualize o status de todos os pedidos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminOrdersPage,
});

type Filter = "todos" | OrderStatus;

function AdminOrdersPage() {
  const { orders } = useAdminOrders();
  const [filtro, setFiltro] = useState<Filter>("todos");
  const [busca, setBusca] = useState("");

  const filtrados = orders.filter((o) => {
    const porStatus = filtro === "todos" || o.status === filtro;
    const termo = busca.trim().toLowerCase();
    const porBusca =
      !termo ||
      o.cliente.nome.toLowerCase().includes(termo) ||
      String(o.numero).includes(termo);
    return porStatus && porBusca;
  });

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="font-display text-4xl uppercase leading-none">Pedidos</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {filtrados.length} de {orders.length} pedidos exibidos.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["todos", ...STATUS_ORDER] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFiltro(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-colors",
                filtro === f
                  ? "border-brand-yellow bg-brand-yellow text-dark"
                  : "border-white/10 text-muted-foreground hover:border-brand-yellow/40 hover:text-foreground",
              )}
            >
              {f === "todos" ? "Todos" : STATUS_LABELS[f]}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por cliente ou número"
          aria-label="Buscar pedidos"
          className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand-yellow lg:w-72"
        />
      </div>

      <OrdersTable orders={filtrados} />
    </div>
  );
}
