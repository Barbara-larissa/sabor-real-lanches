import { ChangeEvent, useEffect, useState } from "react";
import {
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  X,
  Pencil,
  ImagePlus,
} from "lucide-react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  disponivel: boolean;
  foto: string;
  promocaoDoDia: boolean;
  diaPromocao: string;
}

const STORAGE_KEY = "sabor-real-cardapio";

const diasSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const produtosIniciais: Produto[] = [
  {
    id: 1,
    nome: "X-Tudo",
    preco: 22.9,
    disponivel: true,
    foto: "",
    promocaoDoDia: false,
    diaPromocao: "",
  },
  {
    id: 2,
    nome: "X-Bacon",
    preco: 20.9,
    disponivel: true,
    foto: "",
    promocaoDoDia: false,
    diaPromocao: "",
  },
  {
    id: 3,
    nome: "X-Salada",
    preco: 18.9,
    disponivel: true,
    foto: "",
    promocaoDoDia: false,
    diaPromocao: "",
  },
  {
    id: 4,
    nome: "X-Calabresa",
    preco: 19.9,
    disponivel: true,
    foto: "",
    promocaoDoDia: false,
    diaPromocao: "",
  },
  {
    id: 5,
    nome: "Dogão Completo",
    preco: 15.9,
    disponivel: true,
    foto: "",
    promocaoDoDia: false,
    diaPromocao: "",
  },
  {
    id: 6,
    nome: "Batata Frita",
    preco: 12,
    disponivel: true,
    foto: "",
    promocaoDoDia: false,
    diaPromocao: "",
  },
  {
    id: 7,
    nome: "Coca-Cola",
    preco: 7,
    disponivel: true,
    foto: "",
    promocaoDoDia: false,
    diaPromocao: "",
  },
];

interface FormularioProduto {
  id: number | null;
  nome: string;
  preco: number;
  disponivel: boolean;
  foto: string;
  promocaoDoDia: boolean;
  diaPromocao: string;
}

const formularioInicial: FormularioProduto = {
  id: null,
  nome: "",
  preco: 0,
  disponivel: true,
  foto: "",
  promocaoDoDia: false,
  diaPromocao: "",
};

export default function CardapioConfig() {
  const [produtos, setProdutos] =
    useState<Produto[]>(produtosIniciais);

  const [produtoEditando, setProdutoEditando] =
    useState<FormularioProduto>(formularioInicial);

  const [modalAberta, setModalAberta] = useState(false);

  const [salvo, setSalvo] = useState(false);

  const [produtosAlterados, setProdutosAlterados] =
    useState<number[]>([]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);

    if (!dadosSalvos) return;

    try {
      const dados = JSON.parse(dadosSalvos);

      if (Array.isArray(dados)) {
        const dadosNormalizados: Produto[] = dados.map(
          (produto) => ({
            id: produto.id,
            nome: produto.nome ?? "",
            preco: Number(produto.preco) || 0,
            disponivel:
              produto.disponivel !== false,
            foto: produto.foto ?? "",
            promocaoDoDia:
              produto.promocaoDoDia === true,
            diaPromocao:
              produto.diaPromocao ?? "",
          })
        );

        setProdutos(dadosNormalizados);
      }
    } catch (error) {
      console.error(
        "Erro ao carregar cardápio:",
        error
      );
    }
  }, []);

  const salvarProdutos = (lista: Produto[]) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(lista)
    );

    setProdutos(lista);
    setSalvo(true);

    setTimeout(() => {
      setSalvo(false);
    }, 3000);
  };

  const alterarPreco = (
    id: number,
    valor: string
  ) => {
    const preco = Number(valor);

    setProdutos((lista) =>
      lista.map((produto) =>
        produto.id === id
          ? {
              ...produto,
              preco: Number.isNaN(preco)
                ? 0
                : preco,
            }
          : produto
      )
    );
  };

  const atualizarPreco = (id: number) => {
    const listaAtualizada = produtos;

    salvarProdutos(listaAtualizada);

    setProdutosAlterados((lista) =>
      lista.includes(id)
        ? lista
        : [...lista, id]
    );

    setTimeout(() => {
      setProdutosAlterados((lista) =>
        lista.filter((produtoId) => produtoId !== id)
      );
    }, 3000);
  };

  const alterarDisponibilidade = (id: number) => {
    const listaAtualizada = produtos.map(
      (produto) =>
        produto.id === id
          ? {
              ...produto,
              disponivel:
                !produto.disponivel,
            }
          : produto
    );

    salvarProdutos(listaAtualizada);
  };

  const abrirModalAdicionar = () => {
    setProdutoEditando({
      ...formularioInicial,
    });

    setModalAberta(true);
  };

  const abrirModalEditar = (
    produto: Produto
  ) => {
    setProdutoEditando({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      disponivel: produto.disponivel,
      foto: produto.foto,
      promocaoDoDia: produto.promocaoDoDia,
      diaPromocao: produto.diaPromocao,
    });

    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);

    setProdutoEditando({
      ...formularioInicial,
    });
  };

  const alterarCampo = (
    campo: keyof FormularioProduto,
    valor: string | number | boolean
  ) => {
    setProdutoEditando((produto) => ({
      ...produto,
      [campo]: valor,
    }));
  };

  const selecionarFoto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = () => {
      if (typeof leitor.result === "string") {
        setProdutoEditando((produto) => ({
          ...produto,
          foto: leitor.result as string,
        }));
      }
    };

    leitor.readAsDataURL(arquivo);
  };

  const salvarProdutoModal = () => {
    if (!produtoEditando.nome.trim()) {
      alert("Digite o nome do produto.");
      return;
    }

    if (produtoEditando.preco < 0) {
      alert("Digite um valor válido.");
      return;
    }

    if (
      produtoEditando.promocaoDoDia &&
      !produtoEditando.diaPromocao
    ) {
      alert(
        "Escolha o dia da semana da promoção."
      );
      return;
    }

    let listaAtualizada: Produto[];

    if (produtoEditando.id !== null) {
      listaAtualizada = produtos.map(
        (produto) =>
          produto.id === produtoEditando.id
            ? {
                id: produtoEditando.id,
                nome: produtoEditando.nome.trim(),
                preco: Number(
                  produtoEditando.preco
                ),
                disponivel:
                  produtoEditando.disponivel,
                foto: produtoEditando.foto,
                promocaoDoDia:
                  produtoEditando.promocaoDoDia,
                diaPromocao:
                  produtoEditando.diaPromocao,
              }
            : produto
      );
    } else {
      const novoProduto: Produto = {
        id: Date.now(),
        nome: produtoEditando.nome.trim(),
        preco: Number(
          produtoEditando.preco
        ),
        disponivel:
          produtoEditando.disponivel,
        foto: produtoEditando.foto,
        promocaoDoDia:
          produtoEditando.promocaoDoDia,
        diaPromocao:
          produtoEditando.diaPromocao,
      };

      listaAtualizada = [
        ...produtos,
        novoProduto,
      ];
    }

    salvarProdutos(listaAtualizada);

    fecharModal();
  };

  const excluirProduto = () => {
    if (produtoEditando.id === null) {
      fecharModal();
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) return;

    const listaAtualizada = produtos.filter(
      (produto) =>
        produto.id !== produtoEditando.id
    );

    salvarProdutos(listaAtualizada);

    fecharModal();
  };

  return (
    <div className="max-w-7xl">
      <div className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-2xl overflow-hidden">
        {/* CABEÇALHO */}
        <div className="p-5 md:p-6 border-b border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Cardápio
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Gerencie preços, produtos,
                disponibilidade e promoções.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModalAdicionar}
              className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#e5c34b] text-black font-bold px-5 py-3 rounded-xl transition"
            >
              <Plus size={20} />
              Adicionar Produto
            </button>
          </div>
        </div>

        {/* PRODUTOS */}
        <div className="p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {produtos.map((produto) => {
              const foiAlterado =
                produtosAlterados.includes(
                  produto.id
                );

              return (
                <div
                  key={produto.id}
                  className="bg-[#111111] border border-gray-800 rounded-2xl p-5 hover:border-[#D4AF37]/40 transition"
                >
                  {/* FOTO */}
                  <div className="mb-4">
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-[#0b0b0b] border border-gray-800 flex items-center justify-center">
                      {produto.foto ? (
                        <img
                          src={produto.foto}
                          alt={produto.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-600">
                          <ImagePlus size={32} />
                          <span className="text-sm">
                            Sem foto
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NOME + STATUS */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        Produto
                      </span>

                      <h3 className="text-lg font-bold text-white mt-1">
                        {produto.nome}
                      </h3>

                      {produto.promocaoDoDia &&
                        produto.diaPromocao && (
                          <span className="inline-flex mt-2 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold">
                            🔥 Promoção •{" "}
                            {produto.diaPromocao}
                          </span>
                        )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        alterarDisponibilidade(
                          produto.id
                        )
                      }
                      className={`p-2.5 rounded-xl transition ${
                        produto.disponivel
                          ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      }`}
                      title={
                        produto.disponivel
                          ? "Marcar como indisponível"
                          : "Marcar como disponível"
                      }
                    >
                      {produto.disponivel ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </button>
                  </div>

                  {/* PREÇO */}
                  <div className="mt-5">
                    <label className="block text-xs text-gray-500 mb-2">
                      Preço
                    </label>

                    <div className="flex">
                      <span className="h-11 px-3 flex items-center bg-black border border-gray-800 border-r-0 rounded-l-xl text-gray-400">
                        R$
                      </span>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={produto.preco}
                        onChange={(e) =>
                          alterarPreco(
                            produto.id,
                            e.target.value
                          )
                        }
                        className="w-full h-11 bg-black border border-gray-800 rounded-r-xl px-3 text-white font-bold outline-none focus:border-[#D4AF37] transition"
                      />
                    </div>
                  </div>

                  {/* ATUALIZAR PREÇO */}
                  <button
                    type="button"
                    onClick={() =>
                      atualizarPreco(
                        produto.id
                      )
                    }
                    className={`w-full mt-4 py-3 rounded-xl font-bold transition ${
                      foiAlterado
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-[#D4AF37] hover:bg-[#e5c34b] text-black"
                    }`}
                  >
                    {foiAlterado
                      ? "✓ Alterado"
                      : "Atualizar"}
                  </button>

                  {/* ALTERAR PRODUTO */}
                  <button
                    type="button"
                    onClick={() =>
                      abrirModalEditar(produto)
                    }
                    className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition font-semibold"
                  >
                    <Pencil size={18} />
                    Alterar produto
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RODAPÉ */}
        <div className="p-5 md:p-6 border-t border-gray-800">
          {salvo && (
            <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium">
              <CheckCircle2 size={18} />
              Alterações salvas com sucesso.
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalAberta && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#181818] border border-[#D4AF37]/20 rounded-2xl shadow-2xl">
            {/* CABEÇALHO MODAL */}
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {produtoEditando.id === null
                    ? "Adicionar Produto"
                    : "Alterar Produto"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Configure o produto do cardápio.
                </p>
              </div>

              <button
                type="button"
                onClick={fecharModal}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* CONTEÚDO MODAL */}
            <div className="p-5 space-y-5">
              {/* FOTO */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Foto do produto
                </label>

                <label className="block cursor-pointer">
                  <div className="w-full h-48 bg-[#0d0d0d] border border-gray-800 border-dashed rounded-xl flex items-center justify-center overflow-hidden hover:border-[#D4AF37]/60 transition">
                    {produtoEditando.foto ? (
                      <img
                        src={produtoEditando.foto}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <ImagePlus size={36} />
                        <span>
                          Clique para adicionar uma foto
                        </span>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={selecionarFoto}
                    className="hidden"
                  />
                </label>
              </div>

              {/* NOME */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome do produto
                </label>

                <input
                  type="text"
                  value={produtoEditando.nome}
                  onChange={(e) =>
                    alterarCampo(
                      "nome",
                      e.target.value
                    )
                  }
                  placeholder="Ex: X-Tudo"
                  className="w-full h-12 bg-black border border-gray-800 rounded-xl px-4 text-white outline-none focus:border-[#D4AF37] transition"
                />
              </div>

              {/* PREÇO */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Valor
                </label>

                <div className="flex">
                  <span className="h-12 px-4 flex items-center bg-black border border-gray-800 border-r-0 rounded-l-xl text-gray-400">
                    R$
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={produtoEditando.preco}
                    onChange={(e) =>
                      alterarCampo(
                        "preco",
                        Number(e.target.value)
                      )
                    }
                    className="w-full h-12 bg-black border border-gray-800 rounded-r-xl px-4 text-white font-bold outline-none focus:border-[#D4AF37] transition"
                  />
                </div>
              </div>

              {/* DISPONIBILIDADE */}
              <div className="bg-black/30 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">
                      Produto disponível
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Aparece normalmente no cardápio.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alterarCampo(
                        "disponivel",
                        !produtoEditando.disponivel
                      )
                    }
                    className={`relative w-12 h-7 rounded-full transition ${
                      produtoEditando.disponivel
                        ? "bg-green-500"
                        : "bg-gray-700"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                        produtoEditando.disponivel
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* PROMOÇÃO DO DIA */}
              <div className="bg-black/30 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">
                      🔥 Promoção do dia
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Escolha o dia em que este produto será destacado.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alterarCampo(
                        "promocaoDoDia",
                        !produtoEditando.promocaoDoDia
                      )
                    }
                    className={`relative w-12 h-7 rounded-full transition ${
                      produtoEditando.promocaoDoDia
                        ? "bg-[#D4AF37]"
                        : "bg-gray-700"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                        produtoEditando.promocaoDoDia
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {produtoEditando.promocaoDoDia && (
                  <div className="mt-4">
                    <label className="block text-sm text-gray-400 mb-2">
                      Dia da semana
                    </label>

                    <select
                      value={
                        produtoEditando.diaPromocao
                      }
                      onChange={(e) =>
                        alterarCampo(
                          "diaPromocao",
                          e.target.value
                        )
                      }
                      className="w-full h-12 bg-black border border-gray-800 rounded-xl px-4 text-white outline-none focus:border-[#D4AF37] transition"
                    >
                      <option value="">
                        Selecione o dia
                      </option>

                      {diasSemana.map((dia) => (
                        <option
                          key={dia}
                          value={dia}
                        >
                          {dia}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* RODAPÉ MODAL */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-t border-gray-800">
              {produtoEditando.id !== null ? (
                <button
                  type="button"
                  onClick={excluirProduto}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition font-semibold"
                >
                  <Trash2 size={18} />
                  Excluir produto
                </button>
              ) : (
                <div />
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="px-5 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition font-semibold"
                >
                  Fechar
                </button>

                <button
                  type="button"
                  onClick={salvarProdutoModal}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#e5c34b] text-black font-bold transition"
                >
                  <Save size={18} />
                  Salvar Produto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}