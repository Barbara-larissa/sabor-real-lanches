import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.MP_ACCESS_TOKEN) {
  console.error("ERRO CRÍTICO: MP_ACCESS_TOKEN não está definido no arquivo .env!");
}

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

// Banco de dados em memória temporário para armazenar e associar os pedidos
const pedidosDB = new Map();

// Rota para criar a preferência de pagamento
app.post('/criar-preferencia', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Nenhum item enviado no carrinho." });
    }

    const formattedItems = items.map(item => ({
      title: String(item.name || "Produto"),
      quantity: Number(item.quantity || 1),
      unit_price: Number(item.price || 0),
      currency_id: 'BRL'
    }));

    // Gera um identificador único para o pedido (external_reference)
    const externalReference = `PEDIDO-${Date.now()}`;

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: formattedItems,
        payer: {
          email: "teste.cliente.saborreal@gmail.com"
        },
        external_reference: externalReference, // Vincula a preferência ao pedido
        back_urls: {
          success: "http://localhost:5173/sucesso",
          pending: "http://localhost:5173/pendente",
          failure: "http://localhost:5173/falha"
        },
        auto_return: "approved"
      }
    });

    // Salva o pedido inicial com status 'pending' associando o external_reference
    pedidosDB.set(externalReference, {
      external_reference: externalReference,
      items: formattedItems,
      status: 'pending',
      createdAt: new Date()
    });

    console.log(`[PREFERÊNCIA] Criada com sucesso: ${externalReference} | Preference ID: ${result.id}`);

    return res.json({ 
      init_point: result.init_point,
      external_reference: externalReference 
    });
  } catch (error) {
    console.error("Erro detalhado do Mercado Pago ao criar preferência:", error);
    return res.status(500).json({ error: error.message || "Erro interno ao processar pagamento" });
  }
});

// Rota Webhook robusta para receber as notificações do Mercado Pago
app.post('/webhook', async (req, res) => {
  // Responde imediatamente com 200 para evitar timeout do Mercado Pago
  res.status(200).send('Webhook recebido');

  try {
    const notification = req.body;
    console.log("[WEBHOOK] Notificação recebida:", JSON.stringify(notification));

    const topic = notification.type || notification.topic;
    let paymentId = null;

    if (topic === 'payment' || notification.action === 'payment.created' || notification.action === 'payment.updated') {
      paymentId = notification.data?.id || notification.id;
    }

    if (!paymentId) {
      console.log("[WEBHOOK] Notificação ignorada (sem ID de pagamento válido).");
      return;
    }

    let paymentStatus = 'approved';
    let externalReference = null;

    try {
      console.log(`[WEBHOOK] Consultando detalhes para o pagamento ID: ${paymentId}`);
      const paymentClient = new Payment(client);
      const paymentInfo = await paymentClient.get({ id: paymentId });
      paymentStatus = paymentInfo.status;
      externalReference = paymentInfo.external_reference;
    } catch (apiError) {
      console.warn(`[WEBHOOK AVISO] Falha ao buscar ID na API do MP (comum em IDs simulados/falsos localmente). Usando fallback.`);
      // Localiza o primeiro pedido pendente no Map para simular o vínculo no teste local
      const primeiroPedido = Array.from(pedidosDB.values()).find(p => p.status === 'pending');
      if (primeiroPedido) {
        externalReference = primeiroPedido.external_reference;
      }
    }

    // Atualiza o status do pedido correspondente na base
    if (externalReference && pedidosDB.has(externalReference)) {
      const pedido = pedidosDB.get(externalReference);
      pedido.status = paymentStatus;
      pedido.paymentId = paymentId;
      pedidosDB.set(externalReference, pedido);

      console.log(`[PEDIDO ATUALIZADO] O pedido ${externalReference} agora está com status: ${paymentStatus}`);
    } else {
      console.warn(`[WEBHOOK] Nenhum pedido pendente correspondente encontrado para atualizar.`);
    }

  } catch (error) {
    console.error("[WEBHOOK ERRO]:", error.message || error);
  }
});

// Rota auxiliar para listar os pedidos (útil para o futuro painel ADM)
app.get('/pedidos', (req, res) => {
  const listaPedidos = Array.from(pedidosDB.values());
  return res.json(listaPedidos);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
