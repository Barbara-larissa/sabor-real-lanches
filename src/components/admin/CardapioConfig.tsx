import {
    ChangeEvent,
    useEffect,
    useState,
} from "react";

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

import {
    lanches,
    dogs,
} from "@/data/cardapio";

/* =========================================================
   TIPOS
   ========================================================= */

interface ProdutoAdmin {
    id: string;
    nome: string;
    preco: number;
    precoPromocional: number;
    img: string;
    desc: string;
    hover: string;
    disponivel: boolean;
    promocaoDoDia: boolean;
    diaPromocao: string;
    produtoNovo?: boolean;
}


type DiaSemana =
    | "Segunda-feira"
    | "Terça-feira"
    | "Quarta-feira"
    | "Quinta-feira"
    | "Sexta-feira"
    | "Sábado"
    | "Domingo";

interface PromocaoSemanal {
    dia: DiaSemana;
    produtoNome: string;
    preco: number;
    ativa: boolean;
}


interface ProdutoSalvo {
    id?: string;
    nome: string;
    preco?: number | string;
    precoPromocional?: number | string;
    foto?: string;
    img?: string;
    desc?: string;
    hover?: string;
    disponivel?: boolean;
    promocaoDoDia?: boolean;
    diaPromocao?: string;
    produtoNovo?: boolean;
}

interface ConfiguracaoServidor {
    preco?: number;
    precoPromocional?: number;
    disponivel?: boolean;
    promocaoDoDia?: boolean;
    diaPromocao?: string;
}

interface CardapioServidor {
    [nome: string]: ConfiguracaoServidor;
}

interface FormularioProduto {
    id: string | null;
    nome: string;
    preco: number;
    precoPromocional: number;
    img: string;
    desc: string;
    disponivel: boolean;
    promocaoDoDia: boolean;
    diaPromocao: string;
    produtoNovo: boolean;
}

/* =========================================================
   CONFIGURAÇÕES
   ========================================================= */

const STORAGE_KEY =
    "sabor-real-cardapio";

const API_URL =
    "http://localhost:3001";

const diasSemana: DiaSemana[] = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
];

const formularioInicial: FormularioProduto = {
    id: null,
    nome: "",
    preco: 0,
    precoPromocional: 0,
    img: "",
    desc: "",
    disponivel: true,
    promocaoDoDia: false,
    diaPromocao: "",
    produtoNovo: true,
};

/* =========================================================
   FUNÇÕES DE PREÇO
   ========================================================= */

const converterPreco = (
    valor: string
) => {
    const valorLimpo =
        valor
            .replace("R$", "")
            .replace(/\s/g, "")
            .trim();

    if (!valorLimpo) {
        return 0;
    }

    const normalizado =
        valorLimpo
            .replace(/\./g, "")
            .replace(",", ".");

    const numero =
        Number(normalizado);

    return Number.isNaN(numero)
        ? 0
        : numero;
};

const formatarPreco = (
    valor: number
) => {
    return Number(valor)
        .toFixed(2)
        .replace(".", ",");
};

/* =========================================================
   PRODUTOS BASE DO FRONT
   ========================================================= */

function criarProdutosBase(): ProdutoAdmin[] {
    const produtos = [
        ...lanches,
        ...dogs,
    ];

    return produtos.map(
        (produto, index) => ({
            id: `base-${index}`,
            nome: produto.nome,
            preco: converterPreco(
                produto.preco
            ),
            precoPromocional: 0,
            img: produto.img,
            desc: produto.desc,
            hover: produto.hover,
            disponivel: true,
            promocaoDoDia: false,
            diaPromocao: "",
            produtoNovo: false,
        })
    );
}

/* =========================================================
   COMPONENTE
   ========================================================= */

export default function CardapioConfig() {
    const [
        produtos,
        setProdutos,
    ] = useState<ProdutoAdmin[]>(
        criarProdutosBase()
    );

    const [
        precosEditados,
        setPrecosEditados,
    ] = useState<
        Record<string, string>
    >({});

    const [
        precoModal,
        setPrecoModal,
    ] = useState("");

    const [
        precoPromocionalModal,
        setPrecoPromocionalModal,
    ] = useState("");

    const [
        produtoEditando,
        setProdutoEditando,
    ] = useState<FormularioProduto>(
        formularioInicial
    );

    const [
        modalAberta,
        setModalAberta,
    ] = useState(false);

    const [
        salvo,
        setSalvo,
    ] = useState(false);

    const [
        produtosAlterados,
        setProdutosAlterados,
    ] = useState<string[]>([]);




    const [promocoesSemanais, setPromocoesSemanais] =
        useState<PromocaoSemanal[]>(
            diasSemana.map((dia) => ({
                dia,
                produtoNome: "",
                preco: 0,
                ativa: false,
            }))
        );



    /* =========================================================
       SALVAR LOCAL
       ========================================================= */

    const salvarProdutos = (
        lista: ProdutoAdmin[]
    ) => {
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

    /* =========================================================
       SALVAR PRODUTO NO BACKEND
       ========================================================= */

    const salvarProdutoNoBackend =
        async (
            produto: ProdutoAdmin
        ) => {
            const resposta =
                await fetch(
                    `${API_URL}/cardapio/${encodeURIComponent(
                        produto.nome
                    )}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            preco:
                                produto.preco,

                            precoPromocional:
                                produto.precoPromocional,

                            disponivel:
                                produto.disponivel,

                            promocaoDoDia:
                                produto.promocaoDoDia,

                            diaPromocao:
                                produto.diaPromocao,
                        }),
                    }
                );

            let dados:
                CardapioServidor | {
                    error?: string;
                } = {};

            try {
                dados =
                    await resposta.json();
            } catch {
                dados = {};
            }

            if (!resposta.ok) {
                const mensagem =
                    "error" in dados
                        ? dados.error
                        : undefined;

                throw new Error(
                    String(
                        mensagem ||
                        "Erro ao salvar produto no backend."
                    )
                );
            }

            return dados;
        };

    /* =========================================================
       CARREGAR DADOS
       ========================================================= */

    useEffect(() => {
        const carregarDados =
            async () => {
                const produtosBase =
                    criarProdutosBase();

                /*
                 * PRIMEIRO:
                 * carregamos o que já foi salvo
                 * localmente.
                 */

                let listaFinal =
                    produtosBase;

                const dadosSalvos =
                    localStorage.getItem(
                        STORAGE_KEY
                    );

                if (dadosSalvos) {
                    try {
                        const dados:
                            ProdutoSalvo[] =
                            JSON.parse(
                                dadosSalvos
                            );

                        if (
                            Array.isArray(
                                dados
                            )
                        ) {
                            const produtosBaseAtualizados =
                                produtosBase.map(
                                    (
                                        produtoBase
                                    ) => {
                                        const salvo =
                                            dados.find(
                                                (
                                                    produto
                                                ) =>
                                                    produto.nome ===
                                                    produtoBase.nome
                                            );

                                        if (
                                            !salvo
                                        ) {
                                            return produtoBase;
                                        }

                                        let preco =
                                            produtoBase.preco;

                                        let precoPromocional =
                                            produtoBase.precoPromocional;

                                        if (
                                            typeof salvo.preco ===
                                            "number"
                                        ) {
                                            preco =
                                                salvo.preco;
                                        }

                                        if (
                                            typeof salvo.preco ===
                                            "string"
                                        ) {
                                            preco =
                                                converterPreco(
                                                    salvo.preco
                                                );
                                        }

                                        if (
                                            typeof salvo.precoPromocional ===
                                            "number"
                                        ) {
                                            precoPromocional =
                                                salvo.precoPromocional;
                                        }

                                        if (
                                            typeof salvo.precoPromocional ===
                                            "string"
                                        ) {
                                            precoPromocional =
                                                converterPreco(
                                                    salvo.precoPromocional
                                                );
                                        }

                                        return {
                                            ...produtoBase,

                                            preco,
                                            precoPromocional,

                                            disponivel:
                                                salvo.disponivel !==
                                                false,

                                            promocaoDoDia:
                                                salvo.promocaoDoDia ===
                                                true,

                                            diaPromocao:
                                                salvo.diaPromocao ??
                                                "",

                                            /*
                                             * Imagem oficial
                                             * continua vindo
                                             * do cardapio.ts.
                                             */
                                            img:
                                                produtoBase.img,
                                        };
                                    }
                                );

                            const nomesBase =
                                new Set(
                                    produtosBase.map(
                                        (
                                            produto
                                        ) =>
                                            produto.nome
                                    )
                                );

                            const produtosNovos:
                                ProdutoAdmin[] =
                                dados
                                    .filter(
                                        (
                                            produto
                                        ) =>
                                            !nomesBase.has(
                                                produto.nome
                                            )
                                    )
                                    .map(
                                        (
                                            produto,
                                            index
                                        ) => {
                                            let preco =
                                                0;

                                            let precoPromocional =
                                                0;

                                            if (
                                                typeof produto.preco ===
                                                "number"
                                            ) {
                                                preco =
                                                    produto.preco;
                                            }

                                            if (
                                                typeof produto.preco ===
                                                "string"
                                            ) {
                                                preco =
                                                    converterPreco(
                                                        produto.preco
                                                    );
                                            }

                                            if (
                                                typeof produto.precoPromocional ===
                                                "number"
                                            ) {
                                                precoPromocional =
                                                    produto.precoPromocional;
                                            }

                                            if (
                                                typeof produto.precoPromocional ===
                                                "string"
                                            ) {
                                                precoPromocional =
                                                    converterPreco(
                                                        produto.precoPromocional
                                                    );
                                            }

                                            return {
                                                id:
                                                    produto.id ??
                                                    `novo-${Date.now()}-${index}`,

                                                nome:
                                                    produto.nome,

                                                preco,
                                                precoPromocional,

                                                img:
                                                    produto.img ??
                                                    produto.foto ??
                                                    "",

                                                desc:
                                                    produto.desc ??
                                                    "",

                                                hover:
                                                    produto.hover ??
                                                    "hover:border-brand-yellow/40",

                                                disponivel:
                                                    produto.disponivel !==
                                                    false,

                                                promocaoDoDia:
                                                    produto.promocaoDoDia ===
                                                    true,

                                                diaPromocao:
                                                    produto.diaPromocao ??
                                                    "",

                                                produtoNovo:
                                                    true,
                                            };
                                        }
                                    );

                            listaFinal = [
                                ...produtosBaseAtualizados,
                                ...produtosNovos,
                            ];
                        }
                    } catch (error) {
                        console.error(
                            "Erro ao ler cardápio local:",
                            error
                        );
                    }
                }

                /*
                 * SEGUNDO:
                 * tenta buscar a versão oficial
                 * no backend.
                 */

                try {
                    const resposta =
                        await fetch(
                            `${API_URL}/cardapio`
                        );

                    if (
                        resposta.ok
                    ) {
                        const servidor:
                            CardapioServidor =
                            await resposta.json();

                        listaFinal =
                            listaFinal.map(
                                (
                                    produto
                                ) => {
                                    const config =
                                        servidor[
                                        produto.nome
                                        ];

                                    if (
                                        !config
                                    ) {
                                        return produto;
                                    }

                                    return {
                                        ...produto,

                                        preco:
                                            typeof config.preco ===
                                                "number"
                                                ? config.preco
                                                : produto.preco,

                                        precoPromocional:
                                            typeof config.precoPromocional ===
                                                "number"
                                                ? config.precoPromocional
                                                : produto.precoPromocional,

                                        disponivel:
                                            typeof config.disponivel ===
                                                "boolean"
                                                ? config.disponivel
                                                : produto.disponivel,

                                        promocaoDoDia:
                                            typeof config.promocaoDoDia ===
                                                "boolean"
                                                ? config.promocaoDoDia
                                                : produto.promocaoDoDia,

                                        diaPromocao:
                                            typeof config.diaPromocao ===
                                                "string"
                                                ? config.diaPromocao
                                                : produto.diaPromocao,

                                        /*
                                         * Nunca substitui
                                         * a imagem original.
                                         */
                                        img:
                                            produto.img,
                                    };
                                }
                            );

                        localStorage.setItem(
                            STORAGE_KEY,
                            JSON.stringify(
                                listaFinal
                            )
                        );
                    }
                } catch (error) {
                    /*
                     * Se o backend estiver
                     * desligado, não quebra
                     * o ADM.
                     */
                    console.warn(
                        "Backend do cardápio indisponível. Usando dados locais.",
                        error
                    );
                }

                setProdutos(
                    listaFinal
                );
            };

        carregarDados();
    }, []);

    /* =========================================================
       PREÇO DO CARD
       ========================================================= */

    const alterarPreco = (
        id: string,
        valor: string
    ) => {
        const valorFiltrado =
            valor.replace(
                /[^\d,]/g,
                ""
            );

        setPrecosEditados(
            (prev) => ({
                ...prev,
                [id]:
                    valorFiltrado,
            })
        );
    };

    /* =========================================================
       ATUALIZAR PREÇO
       ========================================================= */

    const atualizarPreco =
        async (
            id: string
        ) => {
            const valorDigitado =
                precosEditados[id];

            if (
                valorDigitado ===
                undefined ||
                valorDigitado.trim() ===
                ""
            ) {
                alert(
                    "Digite um preço."
                );
                return;
            }

            const novoPreco =
                converterPreco(
                    valorDigitado
                );

            const produto =
                produtos.find(
                    (item) =>
                        item.id === id
                );

            if (!produto) {
                alert(
                    "Produto não encontrado."
                );
                return;
            }

            const produtoAtualizado: ProdutoAdmin =
            {
                ...produto,
                preco: novoPreco,
            };

            try {
                /*
                 * PRIMEIRO salva no backend.
                 */
                await salvarProdutoNoBackend(
                    produtoAtualizado
                );

                /*
                 * DEPOIS atualiza localmente.
                 */
                const listaAtualizada =
                    produtos.map(
                        (item) =>
                            item.id ===
                                id
                                ? produtoAtualizado
                                : item
                    );

                salvarProdutos(
                    listaAtualizada
                );

                setPrecosEditados(
                    (prev) => {
                        const copia = {
                            ...prev,
                        };

                        delete copia[id];

                        return copia;
                    }
                );

                setProdutosAlterados(
                    (lista) =>
                        lista.includes(id)
                            ? lista
                            : [
                                ...lista,
                                id,
                            ]
                );

                setTimeout(() => {
                    setProdutosAlterados(
                        (lista) =>
                            lista.filter(
                                (
                                    produtoId
                                ) =>
                                    produtoId !==
                                    id
                            )
                    );
                }, 3000);
            } catch (error) {
                console.error(
                    "Erro ao atualizar preço:",
                    error
                );

                alert(
                    "Não foi possível atualizar o preço no servidor. Verifique se o Node está rodando na porta 3001."
                );
            }
        };

    /* =========================================================
       DISPONIBILIDADE
       ========================================================= */

    const alterarDisponibilidade =
        async (
            id: string
        ) => {
            const produto =
                produtos.find(
                    (item) =>
                        item.id === id
                );

            if (!produto) {
                return;
            }

            const produtoAtualizado: ProdutoAdmin =
            {
                ...produto,

                disponivel:
                    !produto.disponivel,
            };

            try {
                await salvarProdutoNoBackend(
                    produtoAtualizado
                );

                const listaAtualizada =
                    produtos.map(
                        (item) =>
                            item.id ===
                                id
                                ? produtoAtualizado
                                : item
                    );

                salvarProdutos(
                    listaAtualizada
                );
            } catch (error) {
                console.error(
                    "Erro ao alterar disponibilidade:",
                    error
                );

                alert(
                    "Não foi possível alterar a disponibilidade no servidor."
                );
            }
        };

    /* =========================================================
       MODAL - ADICIONAR
       ========================================================= */

    const abrirModalAdicionar =
        () => {
            setPrecoModal("");
            setPrecoPromocionalModal("");

            setProdutoEditando({
                ...formularioInicial,
            });

            setModalAberta(true);
        };

    /* =========================================================
       MODAL - EDITAR
       ========================================================= */

    const abrirModalEditar = (
        produto: ProdutoAdmin
    ) => {
        setPrecoModal(
            formatarPreco(
                produto.preco
            )
        );

        setPrecoPromocionalModal(
            produto.precoPromocional > 0
                ? formatarPreco(produto.precoPromocional)
                : ""
        );

        setProdutoEditando({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            precoPromocional: produto.precoPromocional,
            img: produto.img,
            desc: produto.desc,
            disponivel:
                produto.disponivel,
            promocaoDoDia:
                produto.promocaoDoDia,
            diaPromocao:
                produto.diaPromocao,
            produtoNovo:
                produto.produtoNovo ===
                true,
        });

        setModalAberta(true);
    };

    /* =========================================================
       FECHAR MODAL
       ========================================================= */

    const fecharModal = () => {
        setModalAberta(false);

        setPrecoModal("");
        setPrecoPromocionalModal("");

        setProdutoEditando({
            ...formularioInicial,
        });
    };

    /* =========================================================
       ALTERAR CAMPO DA MODAL
       ========================================================= */

    const alterarCampo = (
        campo: keyof FormularioProduto,
        valor:
            | string
            | number
            | boolean
    ) => {
        setProdutoEditando(
            (produto) => ({
                ...produto,
                [campo]:
                    valor,
            })
        );
    };

    /* =========================================================
       FOTO
       ========================================================= */

    const selecionarFoto = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const arquivo =
            event.target.files?.[0];

        if (!arquivo) {
            return;
        }

        const leitor =
            new FileReader();

        leitor.onload = () => {
            if (
                typeof leitor.result ===
                "string"
            ) {
                setProdutoEditando(
                    (produto) => ({
                        ...produto,
                        img:
                            leitor.result as string,
                    })
                );
            }
        };

        leitor.readAsDataURL(
            arquivo
        );
    };

    /* =========================================================
       SALVAR PRODUTO DA MODAL
       ========================================================= */

    const salvarProdutoModal =
        async () => {
            if (
                !produtoEditando.nome.trim()
            ) {
                alert(
                    "Digite o nome do produto."
                );
                return;
            }

            if (
                precoModal.trim() ===
                ""
            ) {
                alert(
                    "Digite o valor do produto."
                );
                return;
            }

            const precoFinal =
                converterPreco(
                    precoModal
                );

            if (precoFinal < 0) {
                alert(
                    "Digite um valor válido."
                );
                return;
            }

            let precoPromocionalFinal = 0;

            if (precoPromocionalModal.trim() !== "") {
                precoPromocionalFinal =
                    converterPreco(
                        precoPromocionalModal
                    );

                if (precoPromocionalFinal <= 0) {
                    alert(
                        "Digite um preço promocional válido."
                    );
                    return;
                }

                if (
                    produtoEditando.promocaoDoDia &&
                    precoPromocionalFinal >= precoFinal
                ) {
                    alert(
                        "O preço promocional deve ser menor que o preço normal."
                    );
                    return;
                }
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

            let listaAtualizada:
                ProdutoAdmin[];

            /* ===============================================
               PRODUTO EXISTENTE
               =============================================== */

            if (
                produtoEditando.id !==
                null
            ) {
                listaAtualizada =
                    produtos.map(
                        (produto) => {
                            if (
                                produto.id !==
                                produtoEditando.id
                            ) {
                                return produto;
                            }

                            /*
                             * Produtos que já
                             * vieram do cardapio.ts:
                             *
                             * nome e imagem
                             * permanecem originais.
                             */
                            if (
                                !produto.produtoNovo
                            ) {
                                return {
                                    ...produto,

                                    preco:
                                        precoFinal,

                                    precoPromocional:
                                        precoPromocionalFinal,

                                    disponivel:
                                        produtoEditando.disponivel,

                                    promocaoDoDia:
                                        produtoEditando.promocaoDoDia,

                                    diaPromocao:
                                        produtoEditando.diaPromocao,
                                };
                            }

                            /*
                             * Produto criado
                             * manualmente.
                             */
                            return {
                                ...produto,

                                nome:
                                    produtoEditando.nome.trim(),

                                preco:
                                    precoFinal,

                                img:
                                    produtoEditando.img,

                                desc:
                                    produtoEditando.desc,

                                disponivel:
                                    produtoEditando.disponivel,

                                promocaoDoDia:
                                    produtoEditando.promocaoDoDia,

                                diaPromocao:
                                    produtoEditando.diaPromocao,
                            };
                        }
                    );

                const produtoFinal =
                    listaAtualizada.find(
                        (produto) =>
                            produto.id ===
                            produtoEditando.id
                    );

                /*
                 * Só envia para o backend
                 * se for produto que já existe
                 * no catálogo.
                 */
                if (
                    produtoFinal &&
                    !produtoFinal.produtoNovo
                ) {
                    try {
                        await salvarProdutoNoBackend(
                            produtoFinal
                        );
                    } catch (error) {
                        console.error(
                            "Erro ao salvar produto:",
                            error
                        );

                        alert(
                            "Não foi possível salvar as alterações no servidor."
                        );

                        return;
                    }
                }
            } else {
                /* =========================================
                   PRODUTO NOVO
                   ========================================= */

                const novoProduto:
                    ProdutoAdmin = {
                    id:
                        `novo-${Date.now()}`,

                    nome:
                        produtoEditando.nome.trim(),

                    preco:
                        precoFinal,

                    precoPromocional:
                        precoPromocionalFinal,

                    img:
                        produtoEditando.img,

                    desc:
                        produtoEditando.desc,

                    hover:
                        "hover:border-brand-yellow/40",

                    disponivel:
                        produtoEditando.disponivel,

                    promocaoDoDia:
                        produtoEditando.promocaoDoDia,

                    diaPromocao:
                        produtoEditando.diaPromocao,

                    produtoNovo:
                        true,
                };

                /*
                 * Produto novo fica
                 * localmente por enquanto.
                 *
                 * O backend ainda não possui
                 * POST /cardapio.
                 */
                listaAtualizada = [
                    ...produtos,
                    novoProduto,
                ];
            }

            salvarProdutos(
                listaAtualizada
            );

            fecharModal();
        };

    /* =========================================================
       EXCLUIR PRODUTO
       ========================================================= */

    const excluirProduto =
        () => {
            if (
                produtoEditando.id ===
                null
            ) {
                fecharModal();
                return;
            }

            const confirmar =
                window.confirm(
                    "Tem certeza que deseja excluir este produto?"
                );

            if (!confirmar) {
                return;
            }

            const listaAtualizada =
                produtos.filter(
                    (produto) =>
                        produto.id !==
                        produtoEditando.id
                );

            salvarProdutos(
                listaAtualizada
            );

            fecharModal();
        };

    /* =========================================================
       RENDER
       ========================================================= */

    return (
        <div className="w-full max-w-none">

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
                            onClick={
                                abrirModalAdicionar
                            }
                            className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#e5c34b] text-black font-bold px-5 py-3 rounded-xl transition"
                        >
                            <Plus
                                size={20}
                            />
                            Adicionar Produto
                        </button>

                    </div>

                </div>

                {/* PRODUTOS */}

                <div className="p-5 md:p-6">

                    {produtos.length ===
                        0 ? (

                        <div className="text-center py-12">

                            <p className="text-gray-500">
                                Nenhum produto cadastrado.
                            </p>

                            <button
                                type="button"
                                onClick={
                                    abrirModalAdicionar
                                }
                                className="mt-4 text-[#D4AF37] hover:underline"
                            >
                                Adicionar primeiro produto
                            </button>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5">

                            {produtos.map(
                                (produto) => {

                                    const foiAlterado =
                                        produtosAlterados.includes(
                                            produto.id
                                        );

                                    const valorDigitado =
                                        precosEditados[
                                        produto.id
                                        ];

                                    const valorExibido =
                                        valorDigitado !==
                                            undefined
                                            ? valorDigitado
                                            : formatarPreco(
                                                produto.preco
                                            );

                                    return (
                                        <div
                                            key={
                                                produto.id
                                            }
                                            className="bg-[#111111] border border-gray-800 rounded-2xl p-5 hover:border-[#D4AF37]/40 transition"
                                        >

                                            {/* IMAGEM */}

                                            <div className="mb-4">

                                                <div className="w-full h-44 rounded-xl overflow-hidden bg-[#0b0b0b] border border-gray-800">

                                                    {produto.img ? (

                                                        <img
                                                            src={
                                                                produto.img
                                                            }
                                                            alt={
                                                                produto.nome
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />

                                                    ) : (

                                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">

                                                            <ImagePlus
                                                                size={
                                                                    32
                                                                }
                                                            />

                                                            <span className="text-sm mt-2">
                                                                Sem foto
                                                            </span>

                                                        </div>

                                                    )}

                                                </div>

                                            </div>

                                            {/* NOME */}

                                            <div className="flex items-start justify-between gap-3">

                                                <div>

                                                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                                                        Produto
                                                    </span>

                                                    <h3 className="text-lg font-bold text-white mt-1">
                                                        {
                                                            produto.nome
                                                        }
                                                    </h3>

                                                    {produto.promocaoDoDia &&
                                                        produto.diaPromocao && (

                                                            <span className="inline-flex mt-2 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold">
                                                                🔥 Promoção •{" "}
                                                                {
                                                                    produto.diaPromocao
                                                                }
                                                            </span>

                                                        )}

                                                </div>

                                                {/* DISPONIBILIDADE */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        alterarDisponibilidade(
                                                            produto.id
                                                        )
                                                    }
                                                    className={`p-2.5 rounded-xl transition cursor-pointer ${produto.disponivel
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
                                                        <Eye
                                                            size={
                                                                20
                                                            }
                                                        />
                                                    ) : (
                                                        <EyeOff
                                                            size={
                                                                20
                                                            }
                                                        />
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
                                                        type="text"
                                                        inputMode="decimal"
                                                        value={
                                                            valorExibido
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            alterarPreco(
                                                                produto.id,
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="0,00"
                                                        className="w-full h-11 bg-black border border-gray-800 rounded-r-xl px-3 text-white font-bold outline-none focus:border-[#D4AF37] transition"
                                                    />

                                                </div>

                                            </div>

                                            {/* ATUALIZAR */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    atualizarPreco(
                                                        produto.id
                                                    )
                                                }
                                                className={`w-full mt-4 py-3 rounded-xl font-bold transition cursor-pointer ${foiAlterado
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
                                                    abrirModalEditar(
                                                        produto
                                                    )
                                                }
                                                className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition font-semibold cursor-pointer"                                            >
                                                <Pencil
                                                    size={
                                                        18
                                                    }
                                                />

                                                Alterar produto
                                            </button>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    )}

                </div>

                {/* RODAPÉ */}

                <div className="p-5 md:p-6 border-t border-gray-800">

                    {salvo && (

                        <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium">

                            <CheckCircle2
                                size={
                                    18
                                }
                            />

                            Alterações salvas com sucesso.

                        </div>

                    )}

                </div>

            </div>

            {/* =================================================
                MODAL
            ================================================= */}

            {modalAberta && (

                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#181818] border border-[#D4AF37]/20 rounded-2xl shadow-2xl">

                        {/* CABEÇALHO */}

                        <div className="flex items-center justify-between p-5 border-b border-gray-800">

                            <div>

                                <h2 className="text-2xl font-bold text-white">
                                    {produtoEditando.id
                                        ? "Alterar Produto"
                                        : "Adicionar Produto"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Configure o produto do cardápio.
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={
                                    fecharModal
                                }
                                className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition"
                            >
                                <X
                                    size={
                                        22
                                    }
                                />
                            </button>

                        </div>

                        {/* CONTEÚDO */}

                        <div className="p-5 space-y-5">

                            {/* FOTO */}

                            <div>

                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Foto do produto
                                </label>

                                {produtoEditando.produtoNovo ? (

                                    <label className="block cursor-pointer">

                                        <div className="w-full h-48 bg-[#0d0d0d] border border-gray-800 border-dashed rounded-xl flex items-center justify-center overflow-hidden hover:border-[#D4AF37]/60 transition">

                                            {produtoEditando.img ? (

                                                <img
                                                    src={
                                                        produtoEditando.img
                                                    }
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />

                                            ) : (

                                                <div className="flex flex-col items-center gap-2 text-gray-500">

                                                    <ImagePlus
                                                        size={
                                                            36
                                                        }
                                                    />

                                                    <span>
                                                        Clique para adicionar uma foto
                                                    </span>

                                                </div>

                                            )}

                                        </div>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={
                                                selecionarFoto
                                            }
                                            className="hidden"
                                        />

                                    </label>

                                ) : (

                                    <div className="w-full h-48 rounded-xl overflow-hidden bg-[#0d0d0d] border border-gray-800">

                                        {produtoEditando.img ? (

                                            <img
                                                src={
                                                    produtoEditando.img
                                                }
                                                alt={
                                                    produtoEditando.nome
                                                }
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <div className="h-full flex items-center justify-center text-gray-500">
                                                Imagem não encontrada
                                            </div>

                                        )}

                                    </div>

                                )}

                            </div>

                            {/* NOME */}

                            <div>

                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Nome do produto
                                </label>

                                <input
                                    type="text"
                                    value={
                                        produtoEditando.nome
                                    }
                                    onChange={(e) => {
                                        if (
                                            produtoEditando.produtoNovo
                                        ) {
                                            alterarCampo(
                                                "nome",
                                                e
                                                    .target
                                                    .value
                                            );
                                        }
                                    }}
                                    disabled={
                                        !produtoEditando.produtoNovo
                                    }
                                    className={`w-full h-12 border rounded-xl px-4 outline-none transition ${produtoEditando.produtoNovo
                                        ? "bg-black border-gray-800 text-white focus:border-[#D4AF37]"
                                        : "bg-[#0b0b0b] border-gray-800 text-gray-400 cursor-not-allowed"
                                        }`}
                                />

                            </div>

                            {/* DESCRIÇÃO */}

                            {produtoEditando.produtoNovo && (

                                <div>

                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Descrição
                                    </label>

                                    <textarea
                                        value={
                                            produtoEditando.desc
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            alterarCampo(
                                                "desc",
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                        rows={
                                            3
                                        }
                                        placeholder="Descreva os ingredientes do produto"
                                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37] transition resize-none"
                                    />

                                </div>

                            )}

                            {/* VALOR */}

                            <div>

                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Valor
                                </label>

                                <div className="flex">

                                    <span className="h-12 px-4 flex items-center bg-black border border-gray-800 border-r-0 rounded-l-xl text-gray-400">
                                        R$
                                    </span>

                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={
                                            precoModal
                                        }
                                        onChange={(
                                            e
                                        ) => {
                                            let valor =
                                                e.target.value.replace(
                                                    /[^\d,]/g,
                                                    ""
                                                );

                                            const partes =
                                                valor.split(
                                                    ","
                                                );

                                            if (
                                                partes.length >
                                                2
                                            ) {
                                                valor =
                                                    partes[0] +
                                                    "," +
                                                    partes
                                                        .slice(
                                                            1
                                                        )
                                                        .join(
                                                            ""
                                                        );
                                            }

                                            if (
                                                partes[1]
                                            ) {
                                                valor =
                                                    partes[0] +
                                                    "," +
                                                    partes[1].slice(
                                                        0,
                                                        2
                                                    );
                                            }

                                            setPrecoModal(
                                                valor
                                            );
                                        }}
                                        placeholder="0,00"
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
                                        className={`relative w-12 h-7 rounded-full transition ${produtoEditando.disponivel
                                            ? "bg-green-500"
                                            : "bg-gray-700"
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${produtoEditando.disponivel
                                                ? "left-6"
                                                : "left-1"
                                                }`}
                                        />
                                    </button>

                                </div>

                            </div>

                            {/* PROMOÇÃO */}

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
                                        className={`relative w-12 h-7 rounded-full transition ${produtoEditando.promocaoDoDia
                                            ? "bg-[#D4AF37]"
                                            : "bg-gray-700"
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${produtoEditando.promocaoDoDia
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
                                            onChange={(
                                                e
                                            ) =>
                                                alterarCampo(
                                                    "diaPromocao",
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="w-full h-12 bg-black border border-gray-800 rounded-xl px-4 text-white outline-none focus:border-[#D4AF37] transition"
                                        >

                                            <option value="">
                                                Selecione o dia
                                            </option>

                                            {diasSemana.map(
                                                (
                                                    dia
                                                ) => (

                                                    <option
                                                        key={
                                                            dia
                                                        }
                                                        value={
                                                            dia
                                                        }
                                                    >
                                                        {
                                                            dia
                                                        }
                                                    </option>

                                                )
                                            )}

                                        </select>

                                        <div className="mt-4">

                                            <label className="block text-sm text-gray-400 mb-2">
                                                Preço promocional
                                            </label>

                                            <div className="flex">

                                                <span className="h-12 px-4 flex items-center bg-black border border-gray-800 border-r-0 rounded-l-xl text-gray-400">
                                                    R$
                                                </span>

                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    value={precoPromocionalModal}
                                                    onChange={(e) => {
                                                        let valor =
                                                            e.target.value.replace(
                                                                /[^\d,]/g,
                                                                ""
                                                            );

                                                        const partes =
                                                            valor.split(",");

                                                        if (
                                                            partes.length > 2
                                                        ) {
                                                            valor =
                                                                partes[0] +
                                                                "," +
                                                                partes
                                                                    .slice(1)
                                                                    .join("");
                                                        }

                                                        if (partes[1]) {
                                                            valor =
                                                                partes[0] +
                                                                "," +
                                                                partes[1].slice(
                                                                    0,
                                                                    2
                                                                );
                                                        }

                                                        setPrecoPromocionalModal(
                                                            valor
                                                        );
                                                    }}
                                                    placeholder="0,00"
                                                    className="w-full h-12 bg-black border border-gray-800 rounded-r-xl px-4 text-white font-bold outline-none focus:border-[#D4AF37] transition"
                                                />

                                            </div>

                                            <p className="text-xs text-gray-500 mt-2">
                                                Será aplicado somente no dia da promoção.
                                            </p>

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                        {/* RODAPÉ */}

                        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-t border-gray-800">

                            {produtoEditando.id ? (

                                <button
                                    type="button"
                                    onClick={
                                        excluirProduto
                                    }
                                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition font-semibold"
                                >
                                    <Trash2
                                        size={
                                            18
                                        }
                                    />
                                    Excluir produto
                                </button>

                            ) : (

                                <div />

                            )}

                            <div className="flex flex-col sm:flex-row gap-3">

                                <button
                                    type="button"
                                    onClick={
                                        fecharModal
                                    }
                                    className="px-5 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition font-semibold"
                                >
                                    Fechar
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        salvarProdutoModal
                                    }
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#e5c34b] text-black font-bold transition"
                                >
                                    <Save
                                        size={
                                            18
                                        }
                                    />
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