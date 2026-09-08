import type { Order } from "./types";

/**
 * Dados de demonstração. Quando a API Node.js / banco de dados estiver
 * disponível, substituir por uma chamada em `fetchOrders()` (ver orders-context).
 */
export const MOCK_ORDERS: Order[] = [
  {
    id: "ped-1042",
    numero: 1042,
    cliente: {
      nome: "Marcos Almeida",
      telefone: "(43) 99999-1042",
      endereco: "Rua Andorinha, 88 — Jardim Paraíso",
    },
    data: "2026-09-08",
    hora: "19:12",
    itens: [
      { nome: "X-Tudo Ferracini", quantidade: 2, valorUnitario: 32 },
      { nome: "Batata com Cheddar e Bacon", quantidade: 1, valorUnitario: 25 },
    ],
    formaPagamento: "pix",
    status: "recebido",
    observacoes: "Sem cebola no segundo lanche. Entregar no portão azul.",
  },
  {
    id: "ped-1041",
    numero: 1041,
    cliente: {
      nome: "Juliana Pereira",
      telefone: "(43) 98888-1041",
      endereco: "Rua Pelicano, 210 — Jardim Paraíso",
    },
    data: "2026-09-08",
    hora: "19:02",
    itens: [
      { nome: "Dogão Completo", quantidade: 3, valorUnitario: 18 },
      { nome: "Misto Quente", quantidade: 1, valorUnitario: 10 },
    ],
    formaPagamento: "cartao",
    status: "em_preparo",
    observacoes: "Molho especial à parte.",
  },
  {
    id: "ped-1040",
    numero: 1040,
    cliente: {
      nome: "Rafael Souza",
      telefone: "(43) 97777-1040",
      endereco: "Retirada no trailer",
    },
    data: "2026-09-08",
    hora: "18:48",
    itens: [{ nome: "X-Tudo Duplo", quantidade: 1, valorUnitario: 38 }],
    formaPagamento: "dinheiro",
    status: "pronto",
    observacoes: "Cliente aguarda no local.",
  },
  {
    id: "ped-1039",
    numero: 1039,
    cliente: {
      nome: "Camila Ferreira",
      telefone: "(43) 96666-1039",
      endereco: "Rua Sabiá, 45 — Jardim Paraíso",
    },
    data: "2026-09-07",
    hora: "21:35",
    itens: [
      { nome: "X-Frango com Catupiry", quantidade: 2, valorUnitario: 26 },
      { nome: "X-Egg", quantidade: 1, valorUnitario: 15 },
    ],
    formaPagamento: "mercado_pago",
    status: "finalizado",
    observacoes: "",
    pagamentoExternoId: "MP-TEST-8891",
  },
  {
    id: "ped-1038",
    numero: 1038,
    cliente: {
      nome: "Diego Martins",
      telefone: "(43) 95555-1038",
      endereco: "Rua Gaivota, 12 — Jardim Paraíso",
    },
    data: "2026-09-07",
    hora: "20:10",
    itens: [{ nome: "Dogão com Calabresa", quantidade: 2, valorUnitario: 24 }],
    formaPagamento: "pix",
    status: "cancelado",
    observacoes: "Cliente desistiu do pedido.",
  },
  {
    id: "ped-1037",
    numero: 1037,
    cliente: {
      nome: "Patrícia Lima",
      telefone: "(43) 94444-1037",
      endereco: "Rua Tucano, 300 — Jardim Paraíso",
    },
    data: "2026-09-07",
    hora: "19:26",
    itens: [
      { nome: "X-Bacon", quantidade: 1, valorUnitario: 20 },
      { nome: "X-Salada", quantidade: 1, valorUnitario: 16 },
      { nome: "Dogão Simples", quantidade: 2, valorUnitario: 12 },
    ],
    formaPagamento: "cartao",
    status: "finalizado",
    observacoes: "Adicional de queijo no X-Bacon.",
  },
];
