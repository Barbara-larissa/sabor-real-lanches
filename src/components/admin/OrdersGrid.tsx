import { useEffect, useState } from "react";

import OrderCard, { type OrderData } from "./OrderCard";

const API_URL = "https://sabor-real-lanches.onrender.com";

export default function OrdersGrid() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarPedidos = async () => {
    try {
      setErro("");

      const response = await fetch(`${API_URL}/pedidos`);

      if (!response.ok) {
        throw new Error("Erro ao buscar pedidos.");
      }

      const pedidos = await response.json();

      const pedidosFormatados: OrderData[] = pedidos
        .filter(
          (pedido: any) =>
            pedido.status === "approved"
        )
        .map((pedido: any) => {
          const itens = Array.isArray(pedido.items)
            ? pedido.items
            : [];

          const total = itens.reduce(
            (soma: number, item: any) =>
              soma +
              Number(item.unit_price || 0) *
                Number(item.quantity || 1),
            0
          );

          return {
            id:
              pedido.external_reference ||
              crypto.randomUUID(),

            orderNumber:
              pedido.external_reference
                ?.replace("PEDIDO-", "") || "000",

            customerName:
              pedido.cliente?.nome ||
              "Cliente",

            phone:
              pedido.cliente?.telefone ||
              "Não informado",

            address:
              pedido.cliente?.endereco ||
              "Endereço não informado",

            items: itens.map((item: any) => ({
              name:
                item.title || "Produto",

              quantity:
                Number(item.quantity || 1),

              price:
                Number(item.unit_price || 0),
            })),

            total,

            status: "Aguardando",

            createdAt:
              pedido.createdAt ||
              new Date().toISOString(),
          };
        });

      setOrders(pedidosFormatados);
    } catch (error) {
      console.error(
        "Erro ao carregar pedidos:",
        error
      );

      setErro(
        "Não foi possível carregar os pedidos."
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPedidos();

    const intervalo = setInterval(() => {
      carregarPedidos();
    }, 5000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  const finalizarPedido = (order: OrderData) => {
    // Busca o histórico que já existe
    const historicoSalvo = localStorage.getItem(
      "sabor-real-historico"
    );

    const historicoAtual: OrderData[] =
      historicoSalvo
        ? JSON.parse(historicoSalvo)
        : [];

    // Evita duplicar o mesmo pedido
    const pedidoJaExiste =
      historicoAtual.some(
        (pedido) =>
          pedido.id === order.id
      );

    if (!pedidoJaExiste) {
      const pedidoFinalizado: OrderData = {
        ...order,
        status: "Saiu para entrega",
        createdAt:
          order.createdAt ||
          new Date().toISOString(),
      };

      historicoAtual.push(
        pedidoFinalizado
      );

      localStorage.setItem(
        "sabor-real-historico",
        JSON.stringify(
          historicoAtual
        )
      );
    }

    // Remove o pedido da tela de pedidos em andamento
    setOrders((pedidosAtuais) =>
      pedidosAtuais.filter(
        (pedido) =>
          pedido.id !== order.id
      )
    );
  };

  if (carregando) {
    return (
      <div className="w-full">
        <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#1a1a1a] p-10 text-center">
          <div className="mb-3 text-4xl">
            🍔
          </div>

          <h3 className="text-lg font-semibold text-white">
            Carregando pedidos...
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Buscando pedidos confirmados.
          </p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="w-full">
        <div className="rounded-2xl border border-red-500/20 bg-[#1a1a1a] p-10 text-center">
          <div className="mb-3 text-4xl">
            ⚠️
          </div>

          <h3 className="text-lg font-semibold text-white">
            Erro ao carregar pedidos
          </h3>

          <p className="mt-2 text-sm text-red-400">
            {erro}
          </p>

          <button
            type="button"
            onClick={carregarPedidos}
            className="mt-5 rounded-lg bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
          >
            TENTAR NOVAMENTE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          Pedidos em andamento
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {orders.length} pedido
          {orders.length !== 1 ? "s" : ""}{" "}
          aguardando atendimento
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#1a1a1a] p-10 text-center">
          <div className="mb-3 text-4xl">
            ✅
          </div>

          <h3 className="text-lg font-semibold text-white">
            Nenhum pedido em andamento
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Os novos pedidos confirmados pelo Mercado Pago aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {orders.map((order, index) => (
            <OrderCard
              key={order.id}
              order={order}
              position={index + 1}
              onFinalizarPedido={
                finalizarPedido
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}