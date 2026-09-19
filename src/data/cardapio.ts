import heroXtudo from "@/assets/x-tudo.webp";
import dogao from "@/assets/dogao.jpg";
import xFrango from "@/assets/x-frango.webp";
import dogaoSimples from "@/assets/dogao-simples.jpg";
import dogaoDuplo from "@/assets/dogao-duplo.jpg";
import xSalada from "@/assets/x-salada.webp";
import xBacon from "@/assets/x-bacon.jpg";
import xEgg from "@/assets/x-egg.webp";
import dogFrango from "@/assets/dog-frango.jpg";
import dogBacon from "@/assets/dog-bacon.jpg";
import dogFrangoBacon from "@/assets/dog-frango-bacon.jpg";
import simplesBurguer from "@/assets/simples-burguer.jpg";
import xBurguer from "@/assets/x-burguer.jpg";

export type Lanche = {
  nome: string;
  preco: string;
  img: string;
  desc: string;
  hover: string;
};

export const lanches: Lanche[] = [
  {
    nome: "Simples Burguer",
    preco: "R$ 15,00",
    img: simplesBurguer,
    desc: "Pão, 1 hambúrguer, tomate, ketchup, maionese.",
    hover: "hover:border-brand-yellow/40",
  },
  {
    nome: "X-Burguer",
    preco: "R$ 22,00",
    img: xBurguer,
    desc: "Pão, 1 hambúrguer, 2 queijo, 2 alface, tomate, batata palha, ketchup, maionese.",
    hover: "hover:border-brand-red/40",
  },
  {
    nome: "X-Salada",
    preco: "R$ 25,00",
    img: xSalada,
    desc: "Pão, 1 hambúrguer, 2 queijo, 2 presunto, batata palha, tomate, 4 alface, ketchup, maionese.",
    hover: "hover:border-brand-green/40",
  },
  {
    nome: "X-Egg",
    preco: "R$ 30,00",
    img: xEgg,
    desc: "Pão, 1 hambúrguer, 2 queijo, 4 ovo, batata palha, 4 alface, tomate, ketchup, maionese.",
    hover: "hover:border-brand-yellow/40",
  },
  {
    nome: "X-Frango",
    preco: "R$ 30,00",
    img: xFrango,
    desc: "Pão, 1 hambúrguer, frango desfiado, 2 queijo, 2 presunto, batata palha, 4 alface, tomate, ketchup, maionese.",
    hover: "hover:border-brand-red/40",
  },
  {
    nome: "X-Bacon (1 Kilo)",
    preco: "R$ 35,00",
    img: xBacon,
    desc: "Pão, 1 hambúrguer, bacon, 2 queijo, 2 presunto, batata palha, 4 alface, tomate, ketchup, maionese.",
    hover: "hover:border-brand-red/40",
  },
  {
    nome: "X-Tudo (2 Kilo)",
    preco: "R$ 100,00",
    img: heroXtudo,
    desc: "Pão, 1 hambúrguer, frango desfiado, 3 salsicha, calabresa, bacon, 4 ovo, 3 queijo, 3 presunto, batata palha, 6 alface, tomate, ketchup, maionese.",
    hover: "hover:border-brand-yellow/40",
  },
];

export const dogs: Lanche[] = [
  {
    nome: "Dog Simples",
    preco: "R$ 12,00",
    img: dogaoSimples,
    desc: "Pão, 1 salsicha, tomate, batata palha, ketchup, maionese.",
    hover: "hover:border-brand-yellow/40",
  },
  {
    nome: "Dog Duplo",
    preco: "R$ 15,00",
    img: dogaoDuplo,
    desc: "Pão, 2 salsichas, tomate, batata palha, ketchup, maionese.",
    hover: "hover:border-brand-blue/40",
  },
  {
    nome: "Dog Presunto e Queijo",
    preco: "R$ 18,00",
    img: dogao,
    desc: "Pão, 1 salsicha, 2 presunto, 2 mussarela, tomate, batata palha, ketchup, maionese.",
    hover: "hover:border-brand-blue/40",
  },
  {
    nome: "Dog Frango",
    preco: "R$ 22,00",
    img: dogFrango,
    desc: "Pão, 1 salsicha, frango desfiado, tomate, batata palha, ketchup, maionese.",
    hover: "hover:border-brand-yellow/40",
  },
  {
    nome: "Dog Bacon",
    preco: "R$ 24,00",
    img: dogBacon,
    desc: "Pão, 1 salsicha, bacon, tomate, batata palha, ketchup, maionese.",
    hover: "hover:border-brand-red/40",
  },
  {
    nome: "Dog Frango e Bacon (1 Kilo)",
    preco: "R$ 35,00",
    img: dogFrangoBacon,
    desc: "Pão, 2 salsicha, frango, bacon, batata palha, tomate, ketchup, maionese.",
    hover: "hover:border-brand-red/40",
  },
];

/**
 * Promoção do Dia — estrutura preparada para receber futuramente
 * o produto em promoção. Deixe como `null` quando não houver promoção.
 */
export type Promocao = {
  nome: string;
  preco: string;
  precoAntigo?: string;
  img: string;
  desc: string;
  diaSemana: string;
  selo: string;
};

export const promocaoDoDia: Promocao | null = null;
