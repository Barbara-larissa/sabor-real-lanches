import heroXtudo from "@/assets/xtudo.png";
import dogao from "@/assets/dogpreseunqueijo.png";
import xFrango from "@/assets/x-frango.webp";
import dogaoSimples from "@/assets/dogsimplees.png";
import dogaoDuplo from "@/assets/dogduplo.png";
import xSalada from "@/assets/x-salada.webp";
import xBacon from "@/assets/xbacon.png";
import xEgg from "@/assets/x-egg.webp";
import dogFrango from "@/assets/dogfrango.png";
import dogBacon from "@/assets/dogbacon.png";
import dogFrangoBacon from "@/assets/dogfrangobacon.png";
import simplesBurguer from "@/assets/xburguer.png";
import xBurguer from "@/assets/xburguer.png";

/* =========================================================
   CONFIGURAÇÃO DA API
   ========================================================= */

const API_URL = "https://sabor-real-lanches.onrender.com";
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
      "Pão,  hambúrguer, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-yellow/40",
  },

  {
    nome: "X-Burguer",
    preco: "R$ 22,00",
    img: xBurguer,
    desc:
      "Pão,  hambúrguer,  queijo,  alface, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-red/40",
  },

  {
    nome: "X-Salada",
    preco: "R$ 25,00",
    img: xSalada,
    desc:
      "Pão,  hambúrguer,  queijo, 2 presunto, batata palha, tomate,  alface, ketchup, maionese.",
    hover:
      "hover:border-brand-green/40",
  },

  {
    nome: "X-Egg",
    preco: "R$ 30,00",
    img: xEgg,
    desc:
      "Pão,  hambúrguer,  queijo, ovo, batata palha,  alface, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-yellow/40",
  },

  {
    nome: "X-Frango",
    preco: "R$ 30,00",
    img: xFrango,
    desc:
      "Pão,  hambúrguer, frango desfiado,  queijo,  presunto, batata palha,  alface, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-red/40",
  },

  {
    nome: "X-Bacon ",
    preco: "R$ 35,00",
    img: xBacon,
    desc:
      "Pão,  hambúrguer, bacon,  queijo,  presunto, batata palha, alface, tomate, ketchup, maionese.",
    hover:
      "hover:border-brand-red/40",
  },

  {
    nome: "X-Tudo da casa ",
    preco: "R$ 50,00",
    img: heroXtudo,
    desc:
      "Pão,  hambúrguer, frango desfiado,  salsicha, calabresa, bacon,  ovo,  queijo,  presunto, batata palha,  alface, tomate, ketchup, maionese.",
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
      "Pão, salsicha, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-yellow/40",
  },

  {
    nome: "Dog Duplo",
    preco: "R$ 15,00",
    img: dogaoDuplo,
    desc:
      "Pão,  salsichas, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-blue/40",
  },

  {
    nome: "Dog Presunto e Queijo",
    preco: "R$ 18,00",
    img: dogao,
    desc:
      "Pão,  salsicha,  presunto, mussarela, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-blue/40",
  },

  {
    nome: "Dog Frango",
    preco: "R$ 22,00",
    img: dogFrango,
    desc:
      "Pão,  salsicha, frango desfiado, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-yellow/40",
  },

  {
    nome: "Dog Bacon",
    preco: "R$ 24,00",
    img: dogBacon,
    desc:
      "Pão,  salsicha, bacon, tomate, batata palha, ketchup, maionese.",
    hover:
      "hover:border-brand-red/40",
  },

  {
    nome: "Dog Frango e Bacon ",
    preco: "R$ 35,00",
    img: dogFrangoBacon,
    desc:
      "Pão,  salsichas, frango, bacon, batata palha, tomate, ketchup, maionese.",
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