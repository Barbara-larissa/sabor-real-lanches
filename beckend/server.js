import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  MercadoPagoConfig,
  Preference,
  Payment,
} from "mercadopago";

dotenv.config();

/* =========================================================
   CONFIGURAÇÃO
   ========================================================= */

const app = express();

app.use(cors());
app.use(express.json());

if (!process.env.MP_ACCESS_TOKEN) {
  console.error(
    "ERRO CRÍTICO: MP_ACCESS_TOKEN não está definido no arquivo .env!"
  );
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

/* =========================================================
   CAMINHO DO ARQUIVO DO CARDÁPIO
   ========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CARDAPIO_FILE = path.join(
  __dirname,
  "cardapio.json"
);

/* =========================================================
   PEDIDOS
   ========================================================= */

const pedidosDB = new Map();

/* =========================================================
   CARDÁPIO
   ========================================================= */

/*
 * Esses valores são os valores iniciais
 * do seu cardapio.ts.
 *
 * O backend vai guardar somente as alterações.
 */

const cardapioInicial = {
  "Simples Burguer": {
    preco: 15,
    disponivel: true,
  },

  "X-Burguer": {
    preco: 22,
    disponivel: true,
  },

  "X-Salada": {
    preco: 25,
    disponivel: true,
  },

  "X-Egg": {
    preco: 30,
    disponivel: true,
  },

  "X-Frango": {
    preco: 30,
    disponivel: true,
  },

  "X-Bacon (1 Kilo)": {
    preco: 35,
    disponivel: true,
  },

  "X-Tudo (2 Kilo)": {
    preco: 100,
    disponivel: true,
  },

  "Dog Simples": {
    preco: 12,
    disponivel: true,
  },

  "Dog Duplo": {
    preco: 15,
    disponivel: true,
  },

  "Dog Presunto e Queijo": {
    preco: 18,
    disponivel: true,
  },

  "Dog Frango": {
    preco: 22,
    disponivel: true,
  },

  "Dog Bacon": {
    preco: 24,
    disponivel: true,
  },

  "Dog Frango e Bacon (1 Kilo)": {
    preco: 35,
    disponivel: true,
  },
};

/* =========================================================
   CARREGAR CARDÁPIO
   ========================================================= */

function carregarCardapio() {
  try {
    if (!fs.existsSync(CARDAPIO_FILE)) {
      fs.writeFileSync(
        CARDAPIO_FILE,
        JSON.stringify(
          cardapioInicial,
          null,
          2
        ),
        "utf-8"
      );

      return { ...cardapioInicial };
    }

    const arquivo = fs.readFileSync(
      CARDAPIO_FILE,
      "utf-8"
    );

    const dados = JSON.parse(arquivo);

    return {
      ...cardapioInicial,
      ...dados,
    };
  } catch (error) {
    console.error(
      "Erro ao carregar cardápio:",
      error
    );

    return { ...cardapioInicial };
  }
}

/* =========================================================
   SALVAR CARDÁPIO
   ========================================================= */

function salvarCardapio(cardapio) {
  try {
    fs.writeFileSync(
      CARDAPIO_FILE,
      JSON.stringify(
        cardapio,
        null,
        2
      ),
      "utf-8"
    );

    return true;
  } catch (error) {
    console.error(
      "Erro ao salvar cardápio:",
      error
    );

    return false;
  }
}

/* =========================================================
   GET CARDÁPIO
   ========================================================= */

app.get("/cardapio", (req, res) => {
  try {
    const cardapio = carregarCardapio();

    return res.json(cardapio);
  } catch (error) {
    console.error(
      "Erro ao buscar cardápio:",
      error
    );

    return res.status(500).json({
      error: "Erro ao carregar cardápio.",
    });
  }
});

/* =========================================================
   ATUALIZAR PRODUTO
   ========================================================= */

app.put(
  "/cardapio/:nome",
  (req, res) => {
    try {
      const nomeProduto =
        decodeURIComponent(req.params.nome);

      const {
        preco,
        precoPromocional,
        disponivel,
        promocaoDoDia,
        diaPromocao,
      } = req.body

      const cardapio =
        carregarCardapio();

      if (!cardapio[nomeProduto]) {
        return res.status(404).json({
          error:
            "Produto não encontrado no cardápio.",
        });
      }

      /* =========================
         PREÇO
         ========================= */

      if (preco !== undefined) {
        const novoPreco = Number(preco);

        if (
          Number.isNaN(novoPreco) ||
          novoPreco < 0
        ) {
          return res.status(400).json({
            error: "Preço inválido.",
          });
        }

        cardapio[nomeProduto].preco =
          novoPreco;
      }




      /* =========================
         PREÇO PROMOCIONAL
         ========================= */

      if (precoPromocional !== undefined) {
        const novoPrecoPromocional =
          Number(precoPromocional);

        if (
          Number.isNaN(novoPrecoPromocional) ||
          novoPrecoPromocional < 0
        ) {
          return res.status(400).json({
            error: "Preço promocional inválido.",
          });
        }

        cardapio[nomeProduto].precoPromocional =
          novoPrecoPromocional;
      }





      /* =========================
         DISPONIBILIDADE
         ========================= */

      if (disponivel !== undefined) {
        cardapio[nomeProduto].disponivel =
          Boolean(disponivel);
      }

      /* =========================
         PROMOÇÃO DO DIA
         ========================= */

      if (
        promocaoDoDia !== undefined
      ) {
        cardapio[nomeProduto].promocaoDoDia =
          Boolean(promocaoDoDia);
      }

      /* =========================
         DIA DA PROMOÇÃO
         ========================= */

      if (
        diaPromocao !== undefined
      ) {
        cardapio[nomeProduto].diaPromocao =
          String(diaPromocao || "");
      }

      const salvo =
        salvarCardapio(cardapio);

      if (!salvo) {
        return res.status(500).json({
          error:
            "Não foi possível salvar o cardápio.",
        });
      }

      console.log(
        `[CARDÁPIO] ${nomeProduto} atualizado:`,
        cardapio[nomeProduto]
      );

      return res.json({
        success: true,
        produto: nomeProduto,
        dados:
          cardapio[nomeProduto],
      });
    } catch (error) {
      console.error(
        "Erro ao atualizar produto:",
        error
      );

      return res.status(500).json({
        error:
          "Erro interno ao atualizar produto.",
      });
    }
  }
);

/* =========================================================
   MERCADO PAGO
   ========================================================= */

app.post(
  "/criar-preferencia",
  async (req, res) => {
    try {
      const { items, cliente } = req.body;

      if (
        !items ||
        !Array.isArray(items) ||
        items.length === 0
      ) {
        return res.status(400).json({
          error:
            "Nenhum item enviado no carrinho.",
        });
      }

      const formattedItems =
        items.map((item) => ({
          title: String(
            item.name || "Produto"
          ),

          quantity: Number(
            item.quantity || 1
          ),

          unit_price: Number(
            item.price || 0
          ),

          currency_id: "BRL",
        }));

      const externalReference =
        `PEDIDO-${Date.now()}`;

      const preference =
        new Preference(client);

      const result =
        await preference.create({
          body: {
            items: formattedItems,

         

            external_reference:
              externalReference,

            back_urls: {
              success: "https://sabor-real-lanches.vercel.app/",
              pending: "https://sabor-real-lanches.vercel.app/",
              failure: "https://sabor-real-lanches.vercel.app/",
            },
          notification_url: "https://sabor-real-lanches.onrender.com/webhook",
            auto_return: "approved",
          },
        });

      pedidosDB.set(
        externalReference,
        {
          external_reference:
            externalReference,

          items: formattedItems,

          cliente: cliente || {
            nome: "",
            telefone: "",
            endereco: "",
          },

          status: "pending",

          createdAt: new Date(),
        }
      );

    console.log(
  "[PREFERÊNCIA COMPLETA]",
  JSON.stringify(result, null, 2)
);

      return res.json({
        init_point:
          result.init_point,

        external_reference:
          externalReference,
      });
    } catch (error) {
      console.error(
        "Erro detalhado do Mercado Pago ao criar preferência:",
        error
      );

      return res.status(500).json({
        error:
          error.message ||
          "Erro interno ao processar pagamento",
      });
    }
  }
);

/* =========================================================
   WEBHOOK MERCADO PAGO
   ========================================================= */

app.post(
  "/webhook",
  async (req, res) => {
    res
      .status(200)
      .send("Webhook recebido");

    try {
      const notification =
        req.body;

      console.log(
        "[WEBHOOK] Notificação recebida:",
        JSON.stringify(
          notification
        )
      );

      const topic =
        notification.type ||
        notification.topic;

      let paymentId = null;

      if (
        topic === "payment" ||
        notification.action ===
        "payment.created" ||
        notification.action ===
        "payment.updated"
      ) {
        paymentId =
          notification.data?.id ||
          notification.id;
      }

      if (!paymentId) {
        console.log(
          "[WEBHOOK] Notificação ignorada (sem ID de pagamento válido)."
        );

        return;
      }

      let paymentStatus =
        "approved";

      let externalReference =
        null;

      try {
        console.log(
          `[WEBHOOK] Consultando detalhes para o pagamento ID: ${paymentId}`
        );

        const paymentClient =
          new Payment(client);

        const paymentInfo =
          await paymentClient.get({
            id: paymentId,
          });

        paymentStatus =
          paymentInfo.status;

        externalReference =
          paymentInfo.external_reference;
      } catch (apiError) {
        console.warn(
          "[WEBHOOK AVISO] Falha ao buscar ID na API do MP. Usando fallback."
        );

        const primeiroPedido =
          Array.from(
            pedidosDB.values()
          ).find(
            (p) =>
              p.status === "pending"
          );

        if (primeiroPedido) {
          externalReference =
            primeiroPedido.external_reference;
        }
      }

      if (
        externalReference &&
        pedidosDB.has(
          externalReference
        )
      ) {
        const pedido =
          pedidosDB.get(
            externalReference
          );

        pedido.status =
          paymentStatus;

        pedido.paymentId =
          paymentId;

        pedidosDB.set(
          externalReference,
          pedido
        );

        console.log(
          `[PEDIDO ATUALIZADO] O pedido ${externalReference} agora está com status: ${paymentStatus}`
        );
      } else {
        console.warn(
          "[WEBHOOK] Nenhum pedido pendente correspondente encontrado para atualizar."
        );
      }
    } catch (error) {
      console.error(
        "[WEBHOOK ERRO]:",
        error.message || error
      );
    }
  }
);

/* =========================================================
   PEDIDOS
   ========================================================= */

app.get(
  "/pedidos",
  (req, res) => {
    const listaPedidos =
      Array.from(
        pedidosDB.values()
      );

    return res.json(
      listaPedidos
    );
  }
);

/* =========================================================
   SERVIDOR
   ========================================================= */

const PORT =
  process.env.PORT || 3001;

app.listen(
  PORT,
  () => {
    console.log(
      `Servidor rodando na porta ${PORT}`
    );

    console.log(
      `API do cardápio: http://localhost:${PORT}/cardapio`
    );
  }
);


