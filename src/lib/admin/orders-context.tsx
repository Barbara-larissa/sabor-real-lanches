import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { MOCK_ORDERS } from "./mock-orders";
import { orderTotal, type Order, type OrderStatus } from "./types";

type OrdersContextValue = {
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  updateStatus: (id: string, status: OrderStatus) => void;
  /** Reservado: recarregar pedidos da API / webhooks do Mercado Pago. */
  refresh: () => Promise<void>;
  stats: {
    total: number;
    emAberto: number;
    finalizados: number;
    cancelados: number;
    faturamento: number;
  };
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function AdminOrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders],
  );

  const updateStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  // Ponto de entrada para a futura API Node.js / banco de dados.
  const refresh = useCallback(async () => {
    setOrders((prev) => [...prev]);
  }, []);

  const stats = useMemo(() => {
    const finalizados = orders.filter((o) => o.status === "finalizado");
    return {
      total: orders.length,
      emAberto: orders.filter((o) =>
        ["recebido", "em_preparo", "pronto"].includes(o.status),
      ).length,
      finalizados: finalizados.length,
      cancelados: orders.filter((o) => o.status === "cancelado").length,
      faturamento: finalizados.reduce((s, o) => s + orderTotal(o), 0),
    };
  }, [orders]);

  return (
    <OrdersContext.Provider value={{ orders, getOrder, updateStatus, refresh, stats }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useAdminOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useAdminOrders deve ser usado dentro de AdminOrdersProvider.");
  return ctx;
}
