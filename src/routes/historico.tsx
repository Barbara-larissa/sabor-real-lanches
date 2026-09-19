import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Trash2,
  Search,
  CheckCircle2,
} from "lucide-react";

import AdminSidebar from "../components/admin/AdminSidebar";

export const Route = createFileRoute("/historico")({
  component: HistoricoPage,
});

interface HistoricoItem {
  name: string;
  quantity: number;
  price?: number;
}

interface HistoricoPedido {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  items: HistoricoItem[];
  total: number;
  status: string;
  createdAt?: string;
}

function HistoricoPage() {
  const [pedidos, setPedidos] = useState<HistoricoPedido[]>([]);
  const [busca, setBusca] = useState("");

  // =====================================================
  // CARREGAR HISTÓRICO
  // =====================================================

  useEffect(() => {
    const historicoSalvo = localStorage.getItem(
      "sabor-real-historico"
    );

    if (historicoSalvo) {
      try {
        const historico = JSON.parse(historicoSalvo);

        if (Array.isArray(historico)) {
          setPedidos(historico);
        }
      } catch (error) {
        console.error(
          "Erro ao carregar histórico:",
          error
        );

        setPedidos([]);
      }
    }
  }, []);

  // =====================================================
  // FORMATAR MOEDA
  // =====================================================

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // =====================================================
  // FORMATAR DATA
  // =====================================================

  const formatarData = (data?: string) => {
    if (!data) {
      return "Data não informada";
    }

    const dataPedido = new Date(data);

    return dataPedido.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================================================
  // LIMPAR HISTÓRICO
  // =====================================================

  const limparHistorico = () => {
    if (pedidos.length === 0) {
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja apagar todo o histórico de vendas?\n\nEssa ação não poderá ser desfeita."
    );

    if (!confirmar) {
      return;
    }

    localStorage.removeItem(
      "sabor-real-historico"
    );

    setPedidos([]);
    setBusca("");
  };

  // =====================================================
  // FILTRO DE BUSCA
  // =====================================================

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const texto = busca.toLowerCase().trim();

    if (!texto) {
      return true;
    }

    return (
      pedido.customerName
        .toLowerCase()
        .includes(texto) ||
      pedido.phone
        .toLowerCase()
        .includes(texto) ||
      pedido.orderNumber
        .toLowerCase()
        .includes(texto)
    );
  });

  // =====================================================
  // TELA
  // =====================================================

  return (
    <main className="min-h-screen bg-[#121212] text-white flex flex-col md:flex-row">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <AdminSidebar />

      {/* =================================================
          CONTEÚDO
      ================================================= */}

      <section className="flex-1 p-5 md:p-8 lg:p-10 overflow-y-auto">

        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <div className="mb-8">

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#D4AF37]">
            Histórico de Vendas
          </h1>

          <p className="mt-2 text-gray-400">
            Consulte os pedidos finalizados da Sabor Real.
          </p>

        </div>

        {/* =================================================
            BUSCA + BOTÃO LIMPAR
        ================================================= */}

        <div className="mb-6 flex flex-col sm:flex-row gap-3 max-w-3xl">

          {/* BUSCA */}

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
              placeholder="Buscar por nome, telefone ou pedido..."
              className="w-full bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#D4AF37] transition"
            />

          </div>

          {/* LIMPAR HISTÓRICO */}

          <button
            type="button"
            onClick={limparHistorico}
            disabled={pedidos.length === 0}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
          >

            <Trash2 size={20} />

            Limpar Histórico

          </button>

        </div>

        {/* =================================================
            CONTADOR
        ================================================= */}

        <div className="mb-5">

          <p className="text-sm text-gray-500">

            {pedidosFiltrados.length} venda
            {pedidosFiltrados.length !== 1
              ? "s"
              : ""}

            {" "}

            {busca
              ? "encontrada"
              : "registrada"}

            {pedidosFiltrados.length !== 1
              ? "s"
              : ""}

          </p>

        </div>

        {/* =================================================
            HISTÓRICO VAZIO
        ================================================= */}

        {pedidosFiltrados.length === 0 ? (

          <div className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-2xl p-10 text-center">

            <div className="flex justify-center mb-4">

              <CheckCircle2
                size={52}
                className="text-gray-600"
              />

            </div>

            <h3 className="text-xl font-bold text-white">

              {busca
                ? "Nenhuma venda encontrada"
                : "Histórico vazio"}

            </h3>

            <p className="text-gray-500 text-sm mt-2">

              {busca
                ? "Tente pesquisar por outro nome, telefone ou número de pedido."
                : "Os pedidos finalizados aparecerão automaticamente aqui."}

            </p>

          </div>

        ) : (

          /* =================================================
             CARDS
          ================================================= */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">

            {pedidosFiltrados.map((pedido) => (

              <article
                key={pedido.id}
                className="w-full h-full bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-lg hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col"
              >

                {/* =================================================
                    CABEÇALHO DO CARD
                ================================================= */}

                <div className="bg-black/30 px-4 py-4 border-b border-[#D4AF37]/10">

                  <div className="flex items-start justify-between gap-2">

                    <div>

                      <p className="text-[#D4AF37] font-bold text-base">
                        Pedido #{pedido.orderNumber}
                      </p>

                      <p className="text-gray-500 text-xs mt-1">
                        {formatarData(
                          pedido.createdAt
                        )}
                      </p>

                    </div>

                    <CheckCircle2
                      size={22}
                      className="text-green-400 shrink-0"
                    />

                  </div>

                </div>

                {/* =================================================
                    CONTEÚDO DO CARD
                ================================================= */}

                <div className="p-4 flex flex-col flex-1">

                  {/* CLIENTE */}

                  <div className="mb-3">

                    <p className="text-[10px] text-gray-500 uppercase font-semibold">
                      Cliente
                    </p>

                    <p className="text-white text-sm font-semibold mt-1">
                      {pedido.customerName}
                    </p>

                  </div>

                  {/* TELEFONE */}

                  <div className="mb-3">

                    <p className="text-[10px] text-gray-500 uppercase font-semibold">
                      Telefone
                    </p>

                    <p className="text-gray-300 text-sm mt-1">
                      {pedido.phone}
                    </p>

                  </div>

                  {/* ENDEREÇO */}

                  <div className="mb-4">

                    <p className="text-[10px] text-gray-500 uppercase font-semibold">
                      Endereço de entrega
                    </p>

                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                      {pedido.address}
                    </p>

                  </div>

                  {/* PRODUTOS */}

                  <div className="pt-4 border-t border-gray-800">

                    <p className="text-[10px] text-gray-500 uppercase font-semibold mb-2">
                      Produtos
                    </p>

                    <div className="space-y-2">

                      {pedido.items.map(
                        (item, index) => (

                          <div
                            key={`${item.name}-${index}`}
                            className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2"
                          >

                            <div className="flex items-center gap-2 min-w-0">

                              <span className="text-[#D4AF37] font-bold text-sm shrink-0">
                                {item.quantity}x
                              </span>

                              <span className="text-gray-200 text-sm truncate">
                                {item.name}
                              </span>

                            </div>

                            {item.price !== undefined && (

                              <span className="text-gray-400 text-xs shrink-0 ml-2">

                                {formatarMoeda(
                                  item.price *
                                  item.quantity
                                )}

                              </span>

                            )}

                          </div>

                        )
                      )}

                    </div>

                  </div>

                  {/* =================================================
                      TOTAL
                  ================================================= */}

                  <div className="mt-auto pt-4 mt-4 border-t border-gray-800">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-[10px] text-gray-500 uppercase font-semibold">
                          Pagamento
                        </p>

                        <span className="inline-block mt-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-green-500/10 text-green-400">
                          ✓ Confirmado
                        </span>

                      </div>

                      <div className="text-right">

                        <p className="text-[10px] text-gray-500 uppercase font-semibold">
                          Total
                        </p>

                        <p className="text-lg font-bold text-green-400 mt-1">
                          {formatarMoeda(
                            pedido.total
                          )}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      STATUS
                  ================================================= */}

                  <div className="mt-4">

                    <div className="w-full text-center bg-green-500/10 border border-green-500/20 text-green-400 font-bold py-2.5 px-3 rounded-lg text-sm">
                      ✓ PEDIDO FINALIZADO
                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}