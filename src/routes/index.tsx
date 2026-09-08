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
];

function Index() {
  return (
    <div className="min-h-screen bg-dark font-body text-foreground selection:bg-brand-yellow selection:text-dark">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-dark/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logoFerracini}
              alt="Ferracini Lanches"
              width={48}
              height={48}
              className="size-12 object-contain"
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
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {lanches.map((item) => (
              <div
                key={item.nome}
                className={`group rounded-3xl border border-white/5 bg-dark p-4 transition-all ${item.hover}`}
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
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full rounded-xl border border-white/10 py-3 text-center text-xs font-bold uppercase tracking-widest transition-all group-hover:bg-foreground group-hover:text-dark"
                  >
                    Pedir este
                  </a>
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
                <div>
                  <h3 className="mb-1 font-bold">Horário de Funcionamento</h3>
                  <p className="text-sm text-muted-foreground">
                    Terça a Domingo
                    <br />
                    Das 18:30 às 23:30
                  </p>
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
    </div>
  );
}
