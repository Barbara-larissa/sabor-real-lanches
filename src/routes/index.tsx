import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import logoFerracini from "@/assets/logo-ferracini.png";
import heroXtudo from "@/assets/hero-xtudo.jpg";
import dogao from "@/assets/dogao.jpg";
import xFerracini from "@/assets/x-ferracini.jpg";
import batataCheddar from "@/assets/batata-cheddar.jpg";
import xCalabresa from "@/assets/x-calabresa.jpg";
import prensado from "@/assets/prensado.jpg";
import xFrango from "@/assets/x-frango.jpg";
import trailerAzul from "@/assets/trailer-azul.jpg";
import dogaoSimples from "@/assets/dogao-simples.jpg";
import dogaoDuplo from "@/assets/dogao-duplo.jpg";
import xSalada from "@/assets/x-salada.jpg";
import xBacon from "@/assets/x-bacon.jpg";
import xEgg from "@/assets/x-egg.jpg";
import dogaoCalabresa from "@/assets/dogao-calabresa.jpg";
import xTudoDuplo from "@/assets/x-tudo-duplo.jpg";
import mistoQuente from "@/assets/misto-quente.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ferracini Lanches — X-Tudo e Dogão na Zona Norte de Londrina" },
      {
        name: "description",
        content:
          "Lanches gigantes na chapa, X-Tudo, dogão e porções. Trailer azul na Rua Pelicano, 163 — Jardim Paraíso, Londrina. Peça o seu.",
      },
      { property: "og:title", content: "Ferracini Lanches — Londrina" },
      {
        property: "og:description",
        content:
          "O verdadeiro X-Tudo da Zona Norte de Londrina. Trailer azul no Jardim Paraíso, aberto de terça a domingo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const INSTAGRAM = "https://www.instagram.com/ferracinilanches/";

const lanches = [
  {
    nome: "X-Tudo Ferracini",
    preco: "R$ 32,00",
    img: xFerracini,
    desc: "Hambúrguer, presunto, ovo, bacon, queijo derretido, alface, tomate e batata palha. O clássico da casa.",
    hover: "hover:border-brand-yellow/40",
  },
  {
    nome: "X-Calabresa",
    preco: "R$ 28,00",
    img: xCalabresa,
    desc: "Calabresa fatiada na chapa, queijo, cebola dourada e batata palha no pão francês crocante.",
    hover: "hover:border-brand-red/40",
  },
  {
    nome: "Dogão Completo",
    preco: "R$ 18,00",
    img: dogao,
    desc: "Duas salsichas, purê de batata, milho, ervilha, batata palha e o molho especial da casa.",
    hover: "hover:border-brand-blue/40",
  },
  {
    nome: "X-Frango com Catupiry",
    preco: "R$ 26,00",
    img: xFrango,
    desc: "Frango desfiado na chapa, catupiry cremoso, milho, alface e batata palha. Pedido garantido.",
    hover: "hover:border-brand-yellow/40",
  },
  {
    nome: "Misto Prensado",
    preco: "R$ 14,00",
    img: prensado,
    desc: "Pão de forma na prensa com presunto e muito queijo derretido. Simples e no ponto certo.",
    hover: "hover:border-brand-red/40",
  },
  {
    nome: "Batata com Cheddar e Bacon",
    preco: "R$ 25,00",
    img: batataCheddar,
    desc: "400g de batata frita sequinha coberta com cheddar cremoso e cubos de bacon crocante.",
    hover: "hover:border-brand-blue/40",
  },
  {
    nome: "Dogão Simples",
    preco: "R$ 12,00",
    img: dogaoSimples,
    desc: "Duas salsichas, purê de batata, milho, ervilha, batata palha e molho da casa. O dogão de início.",
    hover: "hover:border-brand-yellow/40",
  },
  {
    nome: "Dogão Duplo",
    preco: "R$ 22,00",
    img: dogaoDuplo,
    desc: "Quatro salsichas, purê, milho, ervilha, batata palha, queijo derretido e molho especial. Pra quem tá com fome boa.",
    hover: "hover:border-brand-red/40",
  },
  {
    nome: "Dogão com Calabresa",
    preco: "R$ 24,00",
    img: dogaoCalabresa,
    desc: "Salsicha, calabresa fatiada na chapa, queijo, cebola dourada, milho e batata palha. O melhor de dois mundos.",
    hover: "hover:border-brand-blue/40",
  },
  {
    nome: "X-Salada",
    preco: "R$ 16,00",
    img: xSalada,
    desc: "Hambúrguer 120g, queijo derretido, alface, tomate e maionese da casa no pão de gergelim.",
    hover: "hover:border-brand-green/40",
  },
  {
    nome: "X-Bacon",
    preco: "R$ 20,00",
    img: xBacon,
    desc: "Hambúrguer 120g, bacon crocante, queijo, alface e tomate. O clássico com toque defumado.",
    hover: "hover:border-brand-red/40",
  },
  {
    nome: "X-Egg",
    preco: "R$ 15,00",
    img: xEgg,
    desc: "Hambúrguer, ovo na chapa, presunto e queijo derretido no pão de gergelim. Simples e completo.",
    hover: "hover:border-brand-yellow/40",
  },
  {
    nome: "X-Tudo Duplo",
    preco: "R$ 38,00",
    img: xTudoDuplo,
    desc: "Dois hambúrgueres, presunto, dois ovos, bacon, queijo duplo, alface, tomate e batata palha. O monstro da casa.",
    hover: "hover:border-brand-red/40",
  },
  {
    nome: "Misto Quente",
    preco: "R$ 10,00",
    img: mistoQuente,
    desc: "Pão na chapa com presunto e muito queijo derretido. O lanche rápido e barato do dia a dia.",
    hover: "hover:border-brand-blue/40",
  },
];

type CartItem = { nome: string; preco: number; qtd: number };

type Endereco = {
  nome: string;
  telefone: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
};

const enderecoVazio: Endereco = {
  nome: "",
  telefone: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "Londrina",
  estado: "PR",
};

const maskTelefone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) {
    return d
      .replace(/^(\d{0,2})/, "($1")
      .replace(/^\((\d{2})(\d{1,4})/, "($1) $2")
      .replace(/^\((\d{2})\) (\d{4})(\d{1,4})/, "($1) $2-$3");
  }
  return d
    .replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
};

const maskCep = (v: string) =>
  v.replace(/\D/g, "").slice(0, 8).replace(/^(\d{5})(\d{1,3})/, "$1-$2");

const parsePreco = (p: string) => Number(p.replace("R$", "").replace(".", "").replace(",", ".").trim());

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Index() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [enderecoOpen, setEnderecoOpen] = useState(false);
  const [endereco, setEndereco] = useState<Endereco>(enderecoVazio);
  const [erros, setErros] = useState<Partial<Record<keyof Endereco, string>>>({});
  const [entrega, setEntrega] = useState<{
    taxa: number;
    tempo: string;
    resumo: string;
  } | null>(null);
  const [calculando, setCalculando] = useState(false);

  const setCampo = (campo: keyof Endereco, valor: string) => {
    setEndereco((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: undefined }));
    setEntrega(null);
  };

  const validarEndereco = () => {
    const e: Partial<Record<keyof Endereco, string>> = {};
    if (endereco.nome.trim().length < 3) e.nome = "Informe seu nome completo";
    if (endereco.telefone.replace(/\D/g, "").length < 10)
      e.telefone = "Telefone inválido";
    if (endereco.cep.replace(/\D/g, "").length !== 8) e.cep = "CEP deve ter 8 dígitos";
    if (!endereco.rua.trim()) e.rua = "Informe a rua";
    if (!endereco.numero.trim()) e.numero = "Informe o número";
    if (!endereco.bairro.trim()) e.bairro = "Informe o bairro";
    if (!endereco.cidade.trim()) e.cidade = "Informe a cidade";
    if (endereco.estado.trim().length !== 2) e.estado = "Use a sigla (ex: PR)";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const calcularTaxa = () => {
    if (!validarEndereco()) return;
    setCalculando(true);
    setTimeout(() => {
      const digitos = endereco.cep.replace(/\D/g, "");
      const base = Number(digitos.slice(-2)) || 0;
      const taxa = 5 + (base % 8);
      const minutos = 30 + (base % 4) * 5;
      setEntrega({
        taxa,
        tempo: `${minutos} a ${minutos + 15} minutos`,
        resumo: `${endereco.rua}, ${endereco.numero}${endereco.complemento ? ` — ${endereco.complemento}` : ""} — ${endereco.bairro}, ${endereco.cidade}/${endereco.estado.toUpperCase()} — CEP ${endereco.cep}`,
      });
      setCalculando(false);
    }, 700);
  };

  const addItem = (nome: string, preco: string) => {
    setCart((prev) => {
      const found = prev.find((i) => i.nome === nome);
      if (found) {
        return prev.map((i) => (i.nome === nome ? { ...i, qtd: i.qtd + 1 } : i));
      }
      return [...prev, { nome, preco: parsePreco(preco), qtd: 1 }];
    });
    setCartOpen(true);
  };

  const changeQtd = (nome: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.nome === nome ? { ...i, qtd: i.qtd + delta } : i))
        .filter((i) => i.qtd > 0),
    );
  };

  const removeItem = (nome: string) => {
    setCart((prev) => prev.filter((i) => i.nome !== nome));
  };

  const totalItens = cart.reduce((s, i) => s + i.qtd, 0);
  const total = cart.reduce((s, i) => s + i.qtd * i.preco, 0);


  const scrollByCard = (dir: 1 | -1) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <div id="top" className="min-h-screen bg-dark font-body text-foreground selection:bg-brand-yellow selection:text-dark">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-dark/80 backdrop-blur-md">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logoFerracini}
              alt="Ferracini Lanches"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
            <span className="font-display text-2xl uppercase tracking-tight">
              Ferracini <span className="text-brand-yellow">Lanches</span>
            </span>
          </a>
          <div className="hidden gap-8 text-sm font-bold uppercase tracking-widest md:flex">
            <a href="#cardapio" className="transition-colors hover:text-brand-yellow">
              Cardápio
            </a>
            <a href="#trailer" className="transition-colors hover:text-brand-yellow">
              O Trailer
            </a>
            <a href="#contato" className="transition-colors hover:text-brand-yellow">
              Contato
            </a>
          </div>
          <a
            href="#cardapio"
            className="rounded-full bg-brand-yellow px-6 py-2 text-xs font-black uppercase tracking-tighter text-dark transition-transform hover:scale-105"
          >
            Pedir Agora
          </a>
        </div>
      </nav>

      <header className="relative px-6 pt-32 pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-block rounded border border-brand-blue/30 bg-brand-blue/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-blue">
              Zona Norte • Londrina
            </span>
            <h1 className="mb-8 font-display text-7xl uppercase leading-[0.9] md:text-9xl">
              O VERDADEIRO <br />
              <span className="text-brand-yellow">X-TUDO</span>
            </h1>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-muted-foreground">
              Fome de verdade pede um Ferracini. Pão fresco, chapa quente e o tamanho que você
              merece. Direto do nosso trailer azul, no Jardim Paraíso.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#cardapio"
                className="rounded-xl bg-brand-red px-8 py-4 text-sm font-black uppercase transition-colors hover:bg-brand-red/90"
              >
                Ver Cardápio Completo
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="px-4 text-xs font-medium tracking-wide text-muted-foreground underline decoration-brand-yellow decoration-2 underline-offset-4"
              >
                +2.4 mil seguidores no Instagram
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-brand-yellow/20 blur-3xl" />
            <img
              src={heroXtudo}
              alt="X-Tudo do Ferracini Lanches com calabresa, ovo, queijo e batata palha"
              width={1024}
              height={1024}
              className="relative aspect-square w-full rounded-3xl object-cover shadow-2xl outline-1 -outline-offset-1 outline-white/10"
            />
          </div>
        </div>
      </header>

      <section id="cardapio" className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <h2 className="mb-2 font-display text-4xl uppercase">Mais Pedidos</h2>
            <p className="text-muted-foreground">Os favoritos da galera do Jardim Paraíso</p>
          </div>

          <div className="mb-10 flex items-start gap-4 rounded-2xl border border-brand-yellow/30 bg-brand-yellow/10 p-5">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="mb-1 text-sm font-black uppercase tracking-widest text-brand-yellow">
                Observação importante
              </h3>
              <p className="text-sm leading-relaxed text-foreground">
                Não cortamos o lanche ao meio. Não retiramos nenhum ingrediente — só
                acrescentamos. Na hora de pedir, pense no adicional, não no que tirar. 🔥
              </p>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="mb-1 text-sm font-black uppercase tracking-widest text-brand-yellow">
                Arraste para ver mais
              </h3>
              <p className="text-xs text-muted-foreground">
                {lanches.length} lanches no cardápio
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Lanche anterior"
                className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-dark text-lg font-bold transition-colors hover:border-brand-yellow hover:text-brand-yellow"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Próximo lanche"
                className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-dark text-lg font-bold transition-colors hover:border-brand-yellow hover:text-brand-yellow"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="-mx-6 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {lanches.map((item) => (
              <div
                key={item.nome}
                data-card
                className={`group w-[80vw] max-w-sm shrink-0 snap-center rounded-3xl border border-white/5 bg-dark p-4 transition-all sm:w-[60vw] md:w-[calc((100%-4rem)/3)] ${item.hover}`}
              >
                <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface">
                  <img
                    src={item.img}
                    alt={item.nome}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="px-2">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold">{item.nome}</h3>
                    <span className="font-black text-brand-yellow">{item.preco}</span>
                  </div>
                  <p className="mb-6 text-sm text-muted-foreground">{item.desc}</p>
                  <button
                    type="button"
                    onClick={() => addItem(item.nome, item.preco)}
                    className="block w-full rounded-xl border border-white/10 py-3 text-center text-xs font-bold uppercase tracking-widest transition-all hover:bg-brand-yellow hover:text-dark group-hover:bg-foreground group-hover:text-dark"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trailer" className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-2">
          <div className="relative min-h-[400px] overflow-hidden rounded-3xl">
            <img
              src={trailerAzul}
              alt="Trailer azul do Ferracini Lanches à noite com mesas na calçada"
              loading="lazy"
              width={1280}
              height={864}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div id="contato" className="flex flex-col justify-center">
            <h2 className="mb-8 font-display text-5xl uppercase italic">
              O PONTO MAIS <br />
              FAMOSO DA <span className="text-brand-blue">ZONA NORTE</span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand-yellow">
                  📍
                </div>
                <div>
                  <h3 className="mb-1 font-bold">Nosso Endereço</h3>
                  <p className="text-sm text-muted-foreground">
                    Rua Pelicano, 163 — Trailer Azul
                    <br />
                    Jardim Paraíso, Londrina - PR
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand-yellow">
                  ⏰
                </div>
                <div className="w-full">
                  <h3 className="mb-3 font-bold">Horário de Funcionamento</h3>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Segunda a Domingo</span>
                      <span className="font-bold">18:30 — 23:30</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-yellow/10 text-brand-yellow">
                  💬
                </div>
                <div>
                  <h3 className="mb-1 font-bold">Faça seu pedido</h3>
                  <p className="text-sm text-muted-foreground">
                    Chame no direct do Instagram e monte seu lanche.
                  </p>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-black uppercase text-brand-yellow underline decoration-2 underline-offset-4"
                  >
                    Abrir chat agora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
            © {new Date().getFullYear()} Ferracini Lanches — Londrina/PR
          </p>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            @ferracinilanches
          </a>
        </div>
      </footer>

      {!cartOpen && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-brand-red px-6 py-4 text-sm font-black uppercase tracking-tight shadow-2xl transition-transform hover:scale-105"
        >
          🛒 Carrinho
          {totalItens > 0 && (
            <span className="flex size-6 items-center justify-center rounded-full bg-brand-yellow text-xs font-black text-dark">
              {totalItens}
            </span>
          )}
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Fechar carrinho"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-dark/70 backdrop-blur-sm"
          />
          <aside className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-surface">
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="font-display text-2xl uppercase">Seu Pedido</h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Fechar"
                className="flex size-10 items-center justify-center rounded-full border border-white/15 text-lg transition-colors hover:border-brand-yellow hover:text-brand-yellow"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <p className="mt-10 text-center text-sm text-muted-foreground">
                  Seu carrinho está vazio. Escolha um lanche no cardápio! 🍔
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.nome}
                    className="rounded-2xl border border-white/5 bg-dark p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="font-bold">{item.nome}</h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.nome)}
                        aria-label={`Excluir ${item.nome}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-brand-red"
                      >
                        🗑 Excluir
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => changeQtd(item.nome, -1)}
                          aria-label={`Diminuir ${item.nome}`}
                          className="flex size-9 items-center justify-center rounded-full border border-white/15 text-lg font-bold transition-colors hover:border-brand-yellow hover:text-brand-yellow"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-black">{item.qtd}</span>
                        <button
                          type="button"
                          onClick={() => changeQtd(item.nome, 1)}
                          aria-label={`Aumentar ${item.nome}`}
                          className="flex size-9 items-center justify-center rounded-full border border-white/15 text-lg font-bold transition-colors hover:border-brand-yellow hover:text-brand-yellow"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-black text-brand-yellow">
                        {brl(item.qtd * item.preco)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-4 border-t border-white/10 p-6">
              {entrega ? (
                <div className="space-y-2 rounded-2xl border border-brand-green/30 bg-brand-green/10 p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className="font-bold">{brl(entrega.taxa)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tempo estimado</span>
                    <span className="font-bold">{entrega.tempo}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    ✅ Entrega para <span className="text-foreground">{endereco.nome}</span> —{" "}
                    {entrega.resumo}
                  </p>
                  <button
                    type="button"
                    onClick={() => setEnderecoOpen(true)}
                    className="text-xs font-bold uppercase tracking-widest text-brand-yellow underline decoration-2 underline-offset-4"
                  >
                    Editar endereço
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEnderecoOpen(true)}
                  className="w-full animate-pulse rounded-2xl bg-brand-yellow px-6 py-5 text-base font-black uppercase tracking-tight text-dark shadow-[0_0_30px_-6px_var(--brand-yellow)] transition-transform hover:scale-[1.02]"
                >
                  📍 Adicionar endereço (Obrigatório)
                </button>
              )}

              <div className="flex items-center justify-between text-lg">
                <span className="font-bold uppercase tracking-widest">Total</span>
                <span className="font-display text-3xl text-brand-yellow">
                  {brl(total + (entrega?.taxa ?? 0))}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!entrega) {
                    setEnderecoOpen(true);
                    return;
                  }
                  // Aqui você integrará o Mercado Pago no futuro
                  alert("Redirecionando para o pagamento...");
                }}
                className={`w-full rounded-xl bg-brand-red py-4 text-center text-sm font-black uppercase tracking-tight transition-colors hover:bg-brand-red/90 ${cart.length === 0 || !entrega ? "pointer-events-none opacity-40" : ""
                  }`}
              >
                Finalizar pedido
              </button>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCart([])}
                  className="w-full text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand-red"
                >
                  Limpar carrinho
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
