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

/* =========================================================
   CONFIGURAÇÃO DA API
   ========================================================= */

const API_URL = "http://localhost:3001";
/* =========================================================
   PRODUTO BASE DO FRONT-END
   ========================================================= */

export type Lanche = {
  nome: string;
  preco: string;
  img: string;
  desc: string;
  hover: string;
};

/* =========================================================
   LANCHES
   ========================================================= */

export const lanches: Lanche[] = [
  {
    nome: "Simples Burguer",
    preco: "R$ 15,00",
    img: simplesBurguer,
    desc:
      "Pão, 1 hambúrguer, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-yellow/40",
  },

  {
    nome: "X-Burguer",
    preco: "R$ 22,00",
    img: xBurguer,
    desc:
      "Pão, 1 hambúrguer, 2 queijo, 2 alface, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-red/40",
  },

  {
    nome: "X-Salada",
    preco: "R$ 25,00",
    img: xSalada,
    desc:
      "Pão, 1 hambúrguer, 2 queijo, 2 presunto, batata palha, tomate, 4 alface, ketchup, maionese.",
    hover:
      "hover:border-brand-green/40",
  },

  {
    nome: "X-Egg",
    preco: "R$ 30,00",
    img: xEgg,
    desc:
      "Pão, 1 hambúrguer, 2 queijo, 4 ovo, batata palha, 4 alface, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-yellow/40",
  },

  {
    nome: "X-Frango",
    preco: "R$ 30,00",
    img: xFrango,
    desc:
      "Pão, 1 hambúrguer, frango desfiado, 2 queijo, 2 presunto, batata palha, 4 alface, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-red/40",
  },

  {
    nome: "X-Bacon (1 Kilo)",
    preco: "R$ 35,00",
    img: xBacon,
    desc:
      "Pão, 1 hambúrguer, bacon, 2 queijo, 2 presunto, batata palha, 4 alface, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-red/40",
  },

  {
    nome: "X-Tudo (2 Kilo)",
    preco: "R$ 100,00",
    img: heroXtudo,
    desc:
      "Pão, 1 hambúrguer, frango desfiado, 3 salsicha, calabresa, bacon, 4 ovo, 3 queijo, 3 presunto, batata palha, 6 alface, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-yellow/40",
  },
];

/* =========================================================
   DOGS
   ========================================================= */

export const dogs: Lanche[] = [
  {
    nome: "Dog Simples",
    preco: "R$ 12,00",
    img: dogaoSimples,
    desc:
      "Pão, 1 salsicha, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-yellow/40",
  },

  {
    nome: "Dog Duplo",
    preco: "R$ 15,00",
    img: dogaoDuplo,
    desc:
      "Pão, 2 salsichas, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-blue/40",
  },

  {
    nome: "Dog Presunto e Queijo",
    preco: "R$ 18,00",
    img: dogao,
    desc:
      "Pão, 1 salsicha, 2 presunto, 2 mussarela, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-blue/40",
  },

  {
    nome: "Dog Frango",
    preco: "R$ 22,00",
    img: dogFrango,
    desc:
      "Pão, 1 salsicha, frango desfiado, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-yellow/40",
  },

  {
    nome: "Dog Bacon",
    preco: "R$ 24,00",
    img: dogBacon,
    desc:
      "Pão, 1 salsicha, bacon, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-red/40",
  },

  {
    nome: "Dog Frango e Bacon (1 Kilo)",
    preco: "R$ 35,00",
    img: dogFrangoBacon,
    desc:
      "Pão, 2 salsicha, frango, bacon, batata palha, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-red/40",
  },
];

/* =========================================================
   CONFIGURAÇÃO QUE VEM DO BACKEND
   ========================================================= */

export type ConfiguracaoProdutoServidor = {
  preco: number;
  precoPromocional?: number;
  disponivel: boolean;
  promocaoDoDia: boolean;
  diaPromocao: string;
};

export type CardapioServidor = Record<
  string,
  ConfiguracaoProdutoServidor
>;

/* =========================================================
   PROMOÇÃO
   ========================================================= */

export type Promocao = {
  nome: string;
  preco: string;
  precoAntigo?: string;
  img: string;
  desc: string;
  diaSemana: string;
  selo: string;
};

/*
 * Mantemos essa exportação para não quebrar
 * nenhum import existente.
 *
 * A promoção real será buscada do backend
 * por buscarPromocaoDoDia().
 */
export const promocaoDoDia:
  | Promocao
  | null = null;

/* =========================================================
   FORMATAR PREÇO
   ========================================================= */

export function formatarPrecoCardapio(
  valor: number
): string {
  return valor.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
}

/* =========================================================
   BUSCAR CARDÁPIO NO BACKEND
   ========================================================= */

export async function buscarCardapioServidor(): Promise<CardapioServidor> {
  const resposta = await fetch(
    `${API_URL}/cardapio`,
    {
      method: "GET",
      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );

  if (!resposta.ok) {
    throw new Error(
      "Não foi possível carregar o cardápio do servidor."
    );
  }

  return resposta.json();
}

/* =========================================================
   APLICAR CONFIGURAÇÕES DO SERVIDOR
   ========================================================= */

export function aplicarConfiguracoesServidor(
  produtos: Lanche[],
  configuracoes: CardapioServidor
): Lanche[] {
  const diaAtual =
    obterDiaDaSemanaAtual();

  return produtos
    .map((produto) => {
      const config =
        configuracoes[produto.nome];

      /*
       * Produto que não possui configuração
       * no backend continua exatamente como
       * estava no cardapio.ts.
       */
      if (!config) {
        return produto;
      }

      /*
       * Produto indisponível:
       * não aparece no cardápio público.
       */
      if (
        config.disponivel === false
      ) {
        return null;
      }

      /*
       * A promoção só vale no dia configurado
       * e precisa ter um preço promocional válido.
       */
      const promocaoAtiva =
        config.promocaoDoDia === true &&
        config.diaPromocao === diaAtual &&
        typeof config.precoPromocional === "number" &&
        config.precoPromocional > 0;

      const precoEfetivo =
        promocaoAtiva
          ? config.precoPromocional!
          : config.preco;

      return {
        ...produto,

        /*
         * A imagem continua sendo
         * a imagem original.
         */
        img: produto.img,

        /*
         * No dia da promoção usa o preço promocional.
         * Nos demais dias usa o preço normal.
         */
        preco:
          formatarPrecoCardapio(
            precoEfetivo
          ),
      };
    })
    .filter(
      (
        produto
      ): produto is Lanche =>
        produto !== null
    );
}

/* =========================================================
   PEGAR DIA DA SEMANA EM PORTUGUÊS
   ========================================================= */

export function obterDiaDaSemanaAtual(): string {
  const hoje = new Date();

  const dia = hoje.getDay();

  const dias: Record<number, string> = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado",
  };

  return dias[dia] ?? "Domingo";
}

/* =========================================================
   BUSCAR PROMOÇÃO DO DIA
   ========================================================= */

export async function buscarPromocaoDoDia(): Promise<Promocao | null> {
  try {
    const configuracoes =
      await buscarCardapioServidor();

    const diaAtual =
      obterDiaDaSemanaAtual();

    const todosProdutos = [
      ...lanches,
      ...dogs,
    ];

    const produtoPromocao =
      todosProdutos.find((produto) => {
        const config =
          configuracoes[produto.nome];

        if (!config) {
          return false;
        }

        return (
          config.promocaoDoDia === true &&
          config.diaPromocao === diaAtual &&
          config.disponivel !== false &&
          typeof config.precoPromocional === "number" &&
          config.precoPromocional > 0
        );
      });

    if (!produtoPromocao) {
      return null;
    }

    /*
     * Busca novamente a configuração do produto
     * e verifica se ela realmente existe antes
     * de acessar preco e diaPromocao.
     */
    const config =
      configuracoes[produtoPromocao.nome];

    if (!config) {
      return null;
    }

    /*
     * Só existe promoção válida se houver
     * preço promocional maior que zero.
     */
    if (
      typeof config.precoPromocional !== "number" ||
      config.precoPromocional <= 0
    ) {
      return null;
    }

    return {
      nome: produtoPromocao.nome,

      /*
       * Preço que o cliente paga na promoção.
       */
      preco: formatarPrecoCardapio(
        config.precoPromocional
      ),

      /*
       * Preço normal mostrado como antigo.
       */
      precoAntigo: formatarPrecoCardapio(
        config.preco
      ),

      img: produtoPromocao.img,

      desc: produtoPromocao.desc,

      diaSemana:
        config.diaPromocao,

      selo: "PROMOÇÃO DO DIA",
    };
  } catch (error) {
    console.error(
      "Erro ao buscar promoção do dia:",
      error
    );

    return null;
  }
}

/* =========================================================
   BUSCAR PRODUTOS ATUALIZADOS
   ========================================================= */

export async function buscarProdutosAtualizados() {
  try {
    const configuracoes =
      await buscarCardapioServidor();

    const lanchesAtualizados =
      aplicarConfiguracoesServidor(
        lanches,
        configuracoes
      );

    const dogsAtualizados =
      aplicarConfiguracoesServidor(
        dogs,
        configuracoes
      );

    return {
      lanches:
        lanchesAtualizados,

      dogs:
        dogsAtualizados,

      configuracoes,
    };
  } catch (error) {
    console.error(
      "Erro ao sincronizar cardápio:",
      error
    );

    /*
     * Se o backend estiver temporariamente
     * indisponível, o site continua mostrando
     * o cardápio original.
     */
    return {
      lanches,
      dogs,
      configuracoes: {},
    };
  }
}