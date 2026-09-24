import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import {
  ShoppingBag,
  Settings,
  LogOut,
  Sandwich,
  History,
} from "lucide-react";

interface AdminSidebarProps {
  onConfiguracoes?: () => void;
}

interface PedidoItem {
  quantity?: number;
  unit_price?: number;
}

interface Pedido {
  status?: string;
  createdAt?: string;
  total?: number;
  items?: PedidoItem[];
}

export default function AdminSidebar({
  onConfiguracoes,
}: AdminSidebarProps) {
  // =====================================================
  // CONTADORES
  // =====================================================

  const [lanchesDoDia, setLanchesDoDia] = useState(0);
  const [lanchesDoMes, setLanchesDoMes] = useState(0);
  const [vendasDoDia, setVendasDoDia] = useState(0);
  const [vendasDoMes, setVendasDoMes] = useState(0);

  // =====================================================
  // CARREGAR CONTADORES DOS PEDIDOS
  // =====================================================

  useEffect(() => {
    const carregarContadores = async () => {
      try {
        const response = await fetch(
          "https://sabor-real-lanches.onrender.com/pedidos"
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos.");
        }

        const pedidos: Pedido[] = await response.json();

        // Somente pagamentos aprovados
        const pedidosAprovados = pedidos.filter(
          (pedido) => pedido.status === "approved"
        );

        const agora = new Date();

        const inicioDoDia = new Date(
          agora.getFullYear(),
          agora.getMonth(),
          agora.getDate()
        );

        const inicioDoMes = new Date(
          agora.getFullYear(),
          agora.getMonth(),
          1
        );

        let quantidadeDia = 0;
        let quantidadeMes = 0;

        let valorDia = 0;
        let valorMes = 0;

        pedidosAprovados.forEach((pedido) => {
          /*
           * Caso o pedido não tenha createdAt,
           * usamos o momento atual como fallback.
           */
          const dataPedido = new Date(
            pedido.createdAt || agora.toISOString()
          );

          if (Number.isNaN(dataPedido.getTime())) {
            return;
          }

          const itens = Array.isArray(pedido.items)
            ? pedido.items
            : [];

          // Quantidade total de lanches desse pedido
          const quantidadeLanches = itens.reduce(
            (total, item) =>
              total + Number(item.quantity || 1),
            0
          );

          // Soma dos produtos
          const valorCalculado = itens.reduce(
            (total, item) =>
              total +
              Number(item.unit_price || 0) *
                Number(item.quantity || 1),
            0
          );

          /*
           * Se o backend enviar o total do pedido,
           * usamos ele.
           * Caso contrário, usamos a soma dos itens.
           */
          const valorPedido =
            pedido.total !== undefined &&
            !Number.isNaN(Number(pedido.total))
              ? Number(pedido.total)
              : valorCalculado;

          // =================================================
          // HOJE
          // =================================================

          if (dataPedido >= inicioDoDia) {
            quantidadeDia += quantidadeLanches;
            valorDia += valorPedido;
          }

          // =================================================
          // ESTE MÊS
          // =================================================

          if (dataPedido >= inicioDoMes) {
            quantidadeMes += quantidadeLanches;
            valorMes += valorPedido;
          }
        });

        setLanchesDoDia(quantidadeDia);
        setLanchesDoMes(quantidadeMes);
        setVendasDoDia(valorDia);
        setVendasDoMes(valorMes);
      } catch (error) {
        console.error(
          "Erro ao carregar contadores:",
          error
        );
      }
    };

    // Carrega imediatamente
    carregarContadores();

    // Atualiza a cada 5 segundos
    const intervalo = setInterval(
      carregarContadores,
      5000
    );

    return () => clearInterval(intervalo);
  }, []);

  return (
    <aside className="w-full md:w-72 md:h-screen md:sticky md:top-0 md:self-start md:shrink-0 bg-[#111111] border-r border-[#D4AF37]/20 flex flex-col transition-all duration-300">

      {/* =====================================================
          CABEÇALHO DA LOJA
      ===================================================== */}

      <div className="p-6 border-b border-[#D4AF37]/20 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-[#D4AF37] tracking-wider font-serif">
          Sabor Real
        </h1>

        <p className="text-gray-400 mt-2 text-sm hidden md:block">
          Painel Administrativo
        </p>
      </div>

      {/* =====================================================
          NAVEGAÇÃO PRINCIPAL
      ===================================================== */}

      <nav className="flex-1 p-4 md:p-6 space-y-3 flex flex-row md:flex-col justify-around md:justify-start">

        {/* PEDIDOS */}

        <Link
          to="/admin"
          activeProps={{
            className: "bg-[#D4AF37] text-black",
          }}
          className="flex items-center justify-center md:justify-start gap-3 rounded-lg px-3 md:px-4 py-3 text-gray-200 hover:bg-[#D4AF37] hover:text-black transition-all duration-200 group"
        >
          <ShoppingBag
            size={24}
            className="shrink-0"
          />

          <span className="hidden md:block font-medium">
            Pedidos
          </span>
        </Link>

        {/* HISTÓRICO DE VENDAS */}

        <Link
          to="/historico"
          activeProps={{
            className: "bg-[#D4AF37] text-black",
          }}
          className="flex items-center justify-center md:justify-start gap-3 rounded-lg px-3 md:px-4 py-3 text-gray-200 hover:bg-[#D4AF37] hover:text-black transition-all duration-200 group"
        >
          <History
            size={24}
            className="shrink-0"
          />

          <span className="hidden md:block font-medium">
            Histórico de Vendas
          </span>
        </Link>

        {/* CONFIGURAÇÕES */}

       <button
  type="button"
  onClick={() => onConfiguracoes?.()}
  className="w-full flex items-center justify-center md:justify-start gap-3 rounded-lg px-3 md:px-4 py-3 text-gray-200 hover:bg-[#D4AF37] hover:text-black transition-all duration-200 group cursor-pointer"
>
          <Settings
            size={24}
            className="shrink-0"
          />

          <span className="hidden md:block font-medium">
            Configurações
          </span>
        </button>
      </nav>

      {/* =====================================================
          ESTATÍSTICAS + BOTÃO SAIR
      ===================================================== */}

      <div className="hidden md:block mt-auto p-6 border-t border-[#D4AF37]/20 space-y-6 bg-black/30">

        {/* CONTADOR */}

        <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#D4AF37]/10 shadow-inner">

          {/* TÍTULO */}

          <div className="flex items-center gap-4 mb-5">

            <div className="relative flex items-center justify-center">

              <div className="absolute w-10 h-10 bg-[#D4AF37]/20 rounded-full animate-ping" />

              <Sandwich
                size={32}
                className="text-[#D4AF37] relative z-10"
              />

            </div>

            <h3 className="text-lg font-semibold text-gray-100 leading-tight">
              Lanches
              <br />
              Vendidos
            </h3>

          </div>

          <div className="space-y-4">

            {/* LANCHES DO DIA */}

            <div className="flex justify-between items-center bg-black/50 px-4 py-2.5 rounded-lg border border-gray-800">

              <span className="text-sm text-gray-400 font-medium">
                Hoje
              </span>

              <span className="text-2xl font-bold text-[#D4AF37] tabular-nums">
                {lanchesDoDia.toLocaleString("pt-BR")}
              </span>

            </div>

            {/* VENDAS HOJE */}

            <div className="flex justify-between items-center bg-black/50 px-4 py-2.5 rounded-lg border border-gray-800">

              <span className="text-sm text-gray-400 font-medium">
                Vendas Hoje
              </span>

              <span className="text-lg font-bold text-green-400 tabular-nums">
                {vendasDoDia.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>

            </div>

            {/* LANCHES DO MÊS */}

            <div className="flex justify-between items-center bg-black/50 px-4 py-2.5 rounded-lg border border-gray-800">

              <span className="text-sm text-gray-400 font-medium">
                Este Mês
              </span>

              <span className="text-2xl font-bold text-[#D4AF37] tabular-nums">
                {lanchesDoMes.toLocaleString("pt-BR")}
              </span>

            </div>

            {/* VENDAS DO MÊS */}

            <div className="flex flex-col bg-black/50 px-4 py-3 rounded-lg border border-gray-800">

              <span className="text-sm text-gray-400 font-medium">
                Vendas no Mês
              </span>

              <span className="text-xl font-bold text-green-400 tabular-nums mt-1">
                {vendasDoMes.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>

            </div>

          </div>
        </div>

        {/* BOTÃO SAIR */}

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-red-400 hover:bg-red-600 hover:text-white transition font-medium group"
        >
          <LogOut
            size={22}
            className="group-hover:scale-110 transition-transform"
          />

          Sair
        </button>

      </div>

    </aside>
  );
}