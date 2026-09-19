import { useState } from "react";
import OrderCard, { type OrderData } from "./OrderCard";

export default function OrdersGrid() {
  const [orders, setOrders] = useState<OrderData[]>([
    {
      id: "1",
      orderNumber: "001",
      customerName: "João da Silva",
      phone: "(43) 99999-9999",
      address: "Rua das Flores, 123 - Centro - Londrina/PR",
      items: [
        { name: "X-Tudo", quantity: 2 },
        { name: "Batata Frita", quantity: 1 },
        { name: "Coca-Cola", quantity: 2 },
      ],
      total: 45,
      status: "Aguardando",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      orderNumber: "002",
      customerName: "Maria Oliveira",
      phone: "(43) 98888-8888",
      address: "Av. Paraná, 450 - Centro - Londrina/PR",
      items: [
        { name: "X-Bacon", quantity: 1 },
        { name: "Coca-Cola", quantity: 1 },
      ],
      total: 32,
      status: "Aguardando",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      orderNumber: "003",
      customerName: "Carlos Santos",
      phone: "(43) 97777-7777",
      address: "Rua Brasil, 890 - Jardim América - Londrina/PR",
      items: [
        { name: "X-Salada", quantity: 1 },
        { name: "Batata Frita", quantity: 1 },
      ],
      total: 28,
      status: "Aguardando",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      orderNumber: "004",
      customerName: "Ana Souza",
      phone: "(43) 96666-6666",
      address: "Rua Sergipe, 250 - Centro - Londrina/PR",
      items: [
        { name: "Dogão Completo", quantity: 1 },
        { name: "Coca-Cola", quantity: 1 },
      ],
      total: 25,
      status: "Aguardando",
      createdAt: new Date().toISOString(),
    },
    {
      id: "5",
      orderNumber: "005",
      customerName: "Pedro Henrique",
      phone: "(43) 95555-5555",
      address: "Rua Goiás, 720 - Vila Brasil - Londrina/PR",
      items: [
        { name: "X-Calabresa", quantity: 2 },
      ],
      total: 38,
      status: "Aguardando",
      createdAt: new Date().toISOString(),
    },
  ]);

  const finalizarPedido = (order: OrderData) => {
    // Busca o histórico que já existe
    const historicoSalvo = localStorage.getItem("sabor-real-historico");

    const historicoAtual: OrderData[] = historicoSalvo
      ? JSON.parse(historicoSalvo)
      : [];

    // Evita duplicar o mesmo pedido
    const pedidoJaExiste = historicoAtual.some(
      (pedido) => pedido.id === order.id
    );

    if (!pedidoJaExiste) {
      const pedidoFinalizado: OrderData = {
        ...order,
        status: "Saiu para entrega",
        createdAt: order.createdAt || new Date().toISOString(),
      };

      historicoAtual.push(pedidoFinalizado);

      localStorage.setItem(
        "sabor-real-historico",
        JSON.stringify(historicoAtual)
      );
    }

    // Remove o pedido da tela de pedidos em andamento
    setOrders((pedidosAtuais) =>
      pedidosAtuais.filter((pedido) => pedido.id !== order.id)
    );
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Pedidos em andamento
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {orders.length} pedido
          {orders.length !== 1 ? "s" : ""} aguardando atendimento
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">✅</div>

          <h3 className="text-lg font-semibold text-white">
            Nenhum pedido em andamento
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Os novos pedidos confirmados pelo Mercado Pago aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
          {orders.map((order, index) => (
            <OrderCard
              key={order.id}
              order={order}
              position={index + 1}
              onFinalizarPedido={finalizarPedido}
            />
          ))}
        </div>
      )}
    </div>
  );
}