import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import AdminSidebar from "@/components/admin/AdminSidebar";
import OrdersGrid from "@/components/admin/OrdersGrid";
import CardapioConfig from "../components/admin/CardapioConfig";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [configuracoesAberta, setConfiguracoesAberta] = useState(false);

  return (
    <main className="min-h-screen bg-[#121212] text-white flex flex-col md:flex-row md:items-start">
      {/* SIDEBAR */}
      <AdminSidebar
        onConfiguracoes={() => setConfiguracoesAberta(true)}
      />

      {/* CONTEÚDO */}
      <section className="flex-1 p-5 md:p-8 lg:p-10 overflow-y-auto">
        {!configuracoesAberta ? (
          <>
            {/* DASHBOARD */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#D4AF37]">
                Painel Administrativo
              </h1>

              <p className="mt-2 text-gray-400">
                Bem-vindo ao painel administrativo da Sabor Real.
              </p>
            </div>

            {/* PEDIDOS */}
            <OrdersGrid />
          </>
        ) : (
          <>
            {/* CONFIGURAÇÕES */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#D4AF37]">
                  Configurações
                </h1>

                <p className="mt-2 text-gray-400">
                  Gerencie os produtos e preços do cardápio.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setConfiguracoesAberta(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >
                Voltar para Pedidos
              </button>
            </div>

            {/* CARDÁPIO */}
            <CardapioConfig />
          </>
        )}
      </section>
    </main>
  );
}