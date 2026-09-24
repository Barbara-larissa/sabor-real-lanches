# 🍔 Sabor Real — Sistema Web de Delivery

Sistema web completo de **delivery para lanchonete**, desenvolvido para conectar clientes, pedidos, pagamentos online e gerenciamento administrativo em uma única plataforma.

O projeto foi desenvolvido com foco em uma experiência simples para o cliente e em um fluxo de gerenciamento eficiente para o estabelecimento.

---

## 🚀 Demonstração

🌐 **Aplicação:**
https://sabor-real-lanches.vercel.app/

⚙️ **Backend / API:**
https://sabor-real-lanches.onrender.com/

---

## 📌 Sobre o projeto

O **Sabor Real** permite que o cliente consulte o cardápio, selecione seus produtos, monte o carrinho, informe os dados de entrega e realize o pagamento online através do **Mercado Pago**.

Após a confirmação do pagamento, o pedido é processado pelo backend e disponibilizado no **painel administrativo**, onde o estabelecimento pode acompanhar e atualizar o andamento do pedido.

O sistema também possui integração com **WhatsApp**, permitindo a comunicação entre o estabelecimento e o cliente durante o processo de atendimento e entrega.

---

## ✨ Funcionalidades

### 👤 Área do cliente

* Visualização do cardápio
* Produtos com imagens, preços e informações
* Adição e remoção de produtos do carrinho
* Controle de quantidade dos itens
* Cálculo do valor total
* Cadastro de informações do cliente
* Cadastro de endereço para entrega
* Finalização do pedido
* Pagamento online
* Modal de confirmação após o pagamento
* Acompanhamento do pedido através do WhatsApp
* Interface responsiva para dispositivos móveis

### 💳 Pagamentos

Integração com **Mercado Pago** para processamento dos pagamentos.

O fluxo utiliza:

* Criação de preferência de pagamento
* Redirecionamento para o checkout do Mercado Pago
* Retorno do cliente para a aplicação
* Identificação do pagamento aprovado
* Webhook para comunicação entre Mercado Pago e backend
* Atualização do status do pedido

### 🛠️ Painel administrativo

O estabelecimento possui uma área administrativa para gerenciamento dos pedidos.

O painel permite:

* Visualizar pedidos recebidos
* Identificar pagamentos aprovados
* Aceitar pedidos
* Alterar o status do pedido
* Identificar pedidos em produção
* Informar quando o pedido saiu para entrega
* Visualizar informações do cliente
* Consultar produtos e valores do pedido
* Comunicação com o cliente através do WhatsApp

### 📱 WhatsApp

O sistema utiliza o WhatsApp para facilitar a comunicação com o cliente.

Durante o fluxo do pedido, podem ser utilizadas mensagens relacionadas a:

* Confirmação do pedido
* Pedido aceito
* Pedido em preparação
* Pedido saiu para entrega

---

## 🔄 Fluxo do pedido

```text
Cliente
   │
   ▼
Cardápio
   │
   ▼
Carrinho
   │
   ▼
Dados de entrega
   │
   ▼
Mercado Pago
   │
   ▼
Pagamento aprovado
   │
   ▼
Webhook
   │
   ▼
Backend
   │
   ▼
Painel Administrativo
   │
   ├── Aguardando
   │
   ├── Em produção
   │
   └── Saiu para entrega
   │
   ▼
WhatsApp
```

---

## 🧩 Arquitetura

O projeto é dividido em duas partes principais:

### Frontend

Responsável pela interface do cliente e pelo painel administrativo.

src/
├── components/
├── routes/
├── hooks/
├── lib/
├── data/
└── assets/

### Backend

Responsável pelas APIs, pedidos, integração com o Mercado Pago e webhook.


backend/
├── server.js
├── package.json
└── .env


---

## 💻 Tecnologias utilizadas

### Frontend

* React
* TypeScript
* Vite
* TanStack Router
* Tailwind CSS
* HTML5
* CSS3

### Backend

* Node.js
* Express

### Integrações

* Mercado Pago
* WhatsApp

### Deploy

* Vercel — Frontend
* Render — Backend

### Controle de versão

* Git
* GitHub

---

## 🔐 Segurança

Informações sensíveis, como credenciais e tokens de integração, são mantidas através de **variáveis de ambiente**.

Exemplo:


MERCADOPAGO_ACCESS_TOKEN=sua_chave_aqui


As credenciais reais não devem ser armazenadas diretamente no código-fonte ou publicadas no GitHub.



## ⚙️ Instalação

### 1. Clone o repositório

git clone https://github.com/Barbara-larissa/sabor-real-lanches.git


### 2. Acesse o projeto

cd sabor-real-lanches

### 3. Instale as dependências do frontend

npm install


### 4. Instale as dependências do backend


cd backend
npm install


### 5. Configure as variáveis de ambiente

Crie o arquivo:


