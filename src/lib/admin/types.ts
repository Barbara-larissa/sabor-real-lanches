export type OrderStatus =
  | "recebido"
  | "em_preparo"
  | "pronto"
  | "finalizado"
  | "cancelado";

export type PaymentMethod = "pix" | "cartao" | "dinheiro" | "mercado_pago";

export type OrderItem = {
  nome: string;
  quantidade: number;
  valorUnitario: number;
};

export type Customer = {
  nome: string;
  telefone: string;
  endereco: string;
};

export type Order = {
  id: string;
  numero: number;
  cliente: Customer;
  data: string; // ISO date (yyyy-mm-dd)
  hora: string; // HH:mm
  itens: OrderItem[];
  formaPagamento: PaymentMethod;
  status: OrderStatus;
  observacoes: string;
  /** Reservado para integração futura (Mercado Pago). */
  pagamentoExternoId?: string;
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  recebido: "Recebido",
  em_preparo: "Em preparo",
  pronto: "Pronto",
  finalizado: "Finalizado",
  cancelado: "Cancelado",
};

export const STATUS_ORDER: OrderStatus[] = [
  "recebido",
  "em_preparo",
  "pronto",
  "finalizado",
  "cancelado",
];

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  pix: "Pix",
  cartao: "Cartão",
  dinheiro: "Dinheiro",
  mercado_pago: "Mercado Pago",
};

export const orderTotal = (order: Order) =>
  order.itens.reduce((sum, item) => sum + item.quantidade * item.valorUnitario, 0);

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};
