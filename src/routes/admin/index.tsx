import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleDollarSign, ClipboardList, Flame, XCircle } from "lucide-react";

import { OrdersTable } from "@/components/admin/OrdersTable";
import { StatCard } from "@/components/admin/StatCard";
import { useAdminOrders } from "@/lib/admin/orders-context";
import { brl } from "@/lib/admin/types";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Painel Ferracini Lanches" },
      {
        name: "description",
        content:
          "Painel administrativo do Ferracini Lanches: resumo de pedidos, faturamento e status da cozinha.",
      },
      { property: "og:title", content: "Dashboard — Painel Ferracini Lanches" },
      {
        property: "og:description",
        content: "Resumo de pedidos e faturamento do Ferracini Lanches.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { orders, stats } = useAdminOrders();
  const recentes = orders.slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="font-display text-4xl uppercase leading-none">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Visão geral dos pedidos do trailer no Jardim Paraíso.
        </p>
      </header>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pedidos"
          value={String(stats.total)}
          hint="Total registrado"
          icon={<ClipboardList className="size-5" />}
        />
        <StatCard
          label="Em aberto"
          value={String(stats.emAberto)}
          hint="Recebidos, em preparo e prontos"
          icon={<Flame className="size-5" />}
        />
        <StatCard
          label="Faturamento"
          value={brl(stats.faturamento)}
          hint="Somente pedidos finalizados"
          icon={<CircleDollarSign className="size-5" />}
        />
        <StatCard
          label="Cancelados"
          value={String(stats.cancelados)}
          hint="Pedidos cancelados"
          icon={<XCircle className="size-5" />}
        />
      </div>

      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl uppercase">Últimos pedidos</h2>
        <Link
          to="/admin/pedidos"
          className="rounded-full bg-brand-yellow px-5 py-2 text-[11px] font-black uppercase tracking-widest text-dark transition-transform hover:scale-105"
        >
          Ver todos
        </Link>
      </div>

      <OrdersTable orders={recentes} />
    </div>
  );
}
