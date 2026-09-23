import { useState } from "react";

interface OrderItem {
  name: string;
  quantity: number;
  price?: number;
}

export type OrderStatus =
  | "Aguardando"
  | "Em produção"
  | "Saiu para entrega";

export interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt?: string;
}

interface OrderCardProps {
  order: OrderData;
  position: number;
  onFinalizarPedido?: (order: OrderData) => void;
}

export default function OrderCard({
  order,
  position,
  onFinalizarPedido,
}: OrderCardProps) {
  const [status, setStatus] = useState<OrderStatus>(order.status);

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };




const aceitarPedido = () => {
  const telefone = String(order.phone || "").replace(/\D/g, "");

  if (!telefone) {
    console.warn("Telefone do cliente não informado.");
    return;
  }

  const numeroWhatsApp = telefone.startsWith("55")
    ? telefone
    : `55${telefone}`;

  const mensagem = `🍔 Sabor Real

Seu pedido #${order.orderNumber} foi aceito e está sendo preparado! 🟢

Estamos preparando seu pedido. Em breve ele sairá para entrega.`;

  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    mensagem
  )}`;

  setStatus("Em produção");

  window.location.href = urlWhatsApp;
};

  const sairParaEntrega = () => {
    setStatus("Saiu para entrega");

    // Prepara o pedido para ir para o histórico
    if (onFinalizarPedido) {
      onFinalizarPedido({
        ...order,
        status: "Saiu para entrega",
      });
    }
  };

  const getPositionLabel = () => {
    if (position === 1) return "🥇 Próximo da vez";
    if (position === 2) return "🥈 2º na fila";
    if (position === 3) return "🥉 3º na fila";

    return `${position}º na fila`;
  };

  const getStatusStyle = () => {
    switch (status) {
      case "Aguardando":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "Em produção":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "Saiu para entrega":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <article className="w-full h-full bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-lg hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col">

      {/* CABEÇALHO */}
      <div className="bg-black/30 px-4 py-4 border-b border-[#D4AF37]/10">
        <div className="flex items-start justify-between gap-2">

          <div>
            <p className="text-[#D4AF37] font-bold text-base">
              {getPositionLabel()}
            </p>

            <p className="text-gray-400 text-xs mt-1">
              Pedido #{order.orderNumber}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase">
              Status
            </p>

            <span
              className={`inline-block mt-1 px-2 py-1 rounded-full border text-[10px] font-semibold ${getStatusStyle()}`}
            >
              {status}
            </span>
          </div>

        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="p-4 flex flex-col flex-1">

        {/* CLIENTE */}
        <div className="mb-3">
          <p className="text-[10px] text-gray-500 uppercase font-semibold">
            Cliente
          </p>

          <p className="text-white text-sm font-semibold mt-1">
            {order.customerName}
          </p>
        </div>

        {/* TELEFONE */}
        <div className="mb-3">
          <p className="text-[10px] text-gray-500 uppercase font-semibold">
            Telefone
          </p>

          <p className="text-gray-300 text-sm mt-1">
            {order.phone}
          </p>
        </div>

        {/* ENDEREÇO */}
        <div className="mb-4">
          <p className="text-[10px] text-gray-500 uppercase font-semibold">
            Endereço de entrega
          </p>

          <p className="text-gray-300 text-sm mt-1 leading-relaxed">
            {order.address}
          </p>
        </div>

        {/* PRODUTOS */}
        <div className="pt-4 border-t border-gray-800">

          <p className="text-[10px] text-gray-500 uppercase font-semibold mb-2">
            Produtos
          </p>

          <div className="space-y-2">

            {order.items.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2">

                  <span className="text-[#D4AF37] font-bold text-sm">
                    {item.quantity}x
                  </span>

                  <span className="text-gray-200 text-sm">
                    {item.name}
                  </span>

                </div>

                {item.price !== undefined && (
                  <span className="text-gray-400 text-xs">
                    {formatarMoeda(item.price * item.quantity)}
                  </span>
                )}

              </div>
            ))}

          </div>
        </div>

        {/* TOTAL */}
        <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">

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
              {formatarMoeda(order.total)}
            </p>
          </div>

        </div>

        {/* BOTÃO */}
        <div className="mt-auto pt-4">

          {status === "Aguardando" && (
            <button
              type="button"
              onClick={aceitarPedido}
              className="w-full bg-[#D4AF37] hover:bg-[#e5c34b] hover:brightness-110 hover:-translate-y-0.5 active:scale-95 text-black font-bold py-2.5 px-3 rounded-lg text-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              ACEITAR PEDIDO
            </button>
          )}

          {status === "Em produção" && (
            <button
              type="button"
              onClick={sairParaEntrega}
              className="w-full bg-red-600 hover:bg-red-500 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 text-white font-bold py-2.5 px-3 rounded-lg text-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              SAIR PARA ENTREGA
            </button>
          )}

          {status === "Saiu para entrega" && (
            <div className="w-full text-center bg-red-500/10 border border-red-500/20 text-red-400 font-bold py-2.5 px-3 rounded-lg text-sm">
              🛵 PEDIDO EM ENTREGA
            </div>
          )}

        </div>

      </div>
    </article>
  );
}