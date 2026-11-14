import promptSync from 'prompt-sync';
import { Produtos } from './Produto.ts';
import { Livro } from './Livro.ts';
import { ActionFigure } from './ActionFigure.ts';
import { Figurinha } from './Figurinha.ts';
import { Cliente } from './Cliente.ts';
import { Vendas } from './Vendas.ts';
import { salvarProdutos, carregarProdutos, salvarClientes, carregarClientes, salvarVendas, carregarVendas } from './Salvar.ts';

const prompt = promptSync({ sigint: true });


const meusProdutos: Produtos[] = carregarProdutos();
const meusClientes: Cliente[] = carregarClientes();
const minhasVendas: Vendas[] = carregarVendas(meusProdutos, meusClientes);


// CADASTRO E REPOSIÇÃO DE PRODUTOS
export function cadastrarProduto(): void {
    console.log("\n===== CADASTRAR PRODUTO =====");
    console.log("1 - Livro");
    console.log("2 - Action Figure");
    console.log("3 - Figurinha");
    const tipo = Number(prompt("Escolha o tipo de produto: "));

    if (tipo === 1) {
        const book = new Livro();
        const nome = prompt("Nome do livro: ") || "";
        const descricao = prompt("Descrição: ") || "";
        const preco = Number(prompt("Preço: ") || 0);
        const autores = prompt("Autor(es): ") || "";
        const dataPubli = prompt("Data de publicação: ") || "";
        const paginas = Number(prompt("Número de páginas: ") || 0);
        const ismbm = prompt("ISMBM: ") || "";
        const estoque = Number(prompt("Quantidade em estoque: ") || 0);

        book.cadastrarLivro(nome, descricao, preco, autores, dataPubli, paginas, ismbm, estoque);
        meusProdutos.push(book);
        salvarProdutos(meusProdutos);
        console.log("Livro cadastrado com sucesso!");

    } else if (tipo === 2) {
        const af = new ActionFigure();
        const nome = prompt("Nome da Action Figure: ") || "";
        const descricao = prompt("Descrição: ") || "";
        const preco = Number(prompt("Preço: ") || 0);
        const franquia = prompt("Franquia: ") || "";
        const material = prompt("Material: ") || "";
        const estoque = Number(prompt("Quantidade em estoque: ") || 0);

        af.cadastrarActionFigure(nome, descricao, preco, franquia, material, estoque);
        meusProdutos.push(af);
        salvarProdutos(meusProdutos);
        console.log("Action Figure cadastrada com sucesso!");

    } else if (tipo === 3) {
        const fig = new Figurinha();
        const nome = prompt("Nome da Figurinha: ") || "";
        const descricao = prompt("Descrição: ") || "";
        const preco = Number(prompt("Preço: ") || 0);
        const colecao = prompt("Coleção: ") || "";
        const raridade = prompt("Raridade: ") || "";
        const estoque = Number(prompt("Quantidade em estoque: ") || 0);

        fig.cadastrarFigurinha(nome, descricao, preco, colecao, raridade, estoque);
        meusProdutos.push(fig);
        salvarProdutos(meusProdutos);
        console.log("Figurinha cadastrada com sucesso!");

    } else {
        console.log("Tipo de produto inválido.");
    }
}

export function reporEstoque(): void {
    console.log("\n========== REPOR ESTOQUE ==========");

    if (meusProdutos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.table(meusProdutos.map((p, index) => ({
        Código: index,
        Nome: p.nome,
        "Estoque Atual": p.estoque
    })));

    const codigo = Number(prompt("Digite o Código do produto para repor: "));
    const produto = meusProdutos[codigo];

    if (!produto) {
        console.log("Erro: Produto não encontrado.");
        return;
    }

    const quantidade = Number(prompt(`Quantidade a adicionar em '${produto.nome}': `));

    try {
        produto.adicionarEstoque(quantidade);
        salvarProdutos(meusProdutos);
        console.log(`Estoque atualizado! Novo estoque de '${produto.nome}': ${produto.estoque} unidades.`);
    } catch (error: any) {
        console.log("Erro ao repor estoque:", error.message);
    }
}

// MOSTRUÁRIO E BUSCA
export function mostrarProdutos(): void {
    console.log("\n========== MOSTRUÁRIO ==========");

    if (meusProdutos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    const tabela = meusProdutos.map((item) => {
        let detalhes = "";
        let tipo = "Produto";

        if (item instanceof Livro) {
            tipo = "Livro";
            detalhes = `Autor: ${item.autores} | Págs: ${item.paginas} | ISMBM: ${item.ismbm}`;
        } else if (item instanceof ActionFigure) {
            tipo = "Action Figure";
            detalhes = `Franquia: ${item.franquia} | Material: ${item.material}`;
        } else if (item instanceof Figurinha) {
            tipo = "Figurinha";
            detalhes = `Coleção: ${item.colecao} | Raridade: ${item.raridade}`;
        }

        return {
            Tipo: tipo,
            Nome: item.nome,
            Preço: `R$ ${item.preco.toFixed(2)}`,
            Estoque: item.estoque,
            Detalhes: detalhes
        };
    });

    console.table(tabela);
}

export function buscarProduto(): void {
    console.log("\n========== BUSCAR PRODUTO ==========");
    const termo = (prompt("Digite o nome do produto para buscar: ") || "").toLowerCase();

    const encontrados = meusProdutos.filter(p => p.nome.toLowerCase().includes(termo));

    if (encontrados.length === 0) {
        console.log("Nenhum produto encontrado com esse nome.");
        return;
    }

    console.table(encontrados.map(p => ({
        Nome: p.nome,
        Descrição: p.descricao,
        Preço: `R$ ${p.preco.toFixed(2)}`,
        Estoque: p.estoque
    })));
}

// CLIENTES
export function cadastrarCliente(): void {
    console.log("\n===== CADASTRAR CLIENTE =====");
    const cpf = prompt("Digite seu CPF: ") || "";
    const nome = prompt("Digite seu nome: ") || "";
    const email = prompt("Digite seu email: ") || "";
    const endereco = prompt("Digite seu endereço: ") || "";
    const cep = prompt("Digite seu CEP: ") || "";

    const client = new Cliente();
    client.cadastrarCliente(cpf, nome, email, endereco, cep);

    meusClientes.push(client);
    salvarClientes(meusClientes);
    console.log("Cliente cadastrado com sucesso!");
}

export function mostrarClientes(): void {
    console.log("\n========== CLIENTES CADASTRADOS ==========");

    if (meusClientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
    }

    console.table(meusClientes.map(c => ({
        CPF: c.cpf,
        Nome: c.nome,
        Email: c.email,
        Endereço: c.endereco,
        CEP: c.cep
    })));
}

// VENDAS E DESCONTOS
export function realizarVenda(): void {
    console.log("\n========== CARRINHO ==========");

    if (meusClientes.length === 0 || meusProdutos.length === 0) {
        console.log("É necessário ter ao menos um cliente e um produto cadastrados.");
        return;
    }

    const cpfCliente = prompt("Digite o CPF do cliente comprador: ") || "";
    const clienteEncontrado = meusClientes.find(c => c.cpf === cpfCliente);

    if (!clienteEncontrado) {
        console.log("Erro: Cliente não encontrado. Cadastre o cliente antes de realizar a venda.");
        return;
    }

    const nomeCompra = prompt("Qual produto vai comprar? ") || "";
    const produtoEncontrado = meusProdutos.find(p => p.nome.toLowerCase() === nomeCompra.toLowerCase());

    if (!produtoEncontrado) {
        console.log("Erro: Produto não encontrado no sistema.");
        return;
    }

    const quantidade = Number(prompt("Quantos serão comprados? ") || 0);

    try {
        const venda = new Vendas(produtoEncontrado, clienteEncontrado);
        venda.vender(quantidade);

        minhasVendas.push(venda);
        salvarProdutos(meusProdutos);
        salvarVendas(minhasVendas);

        console.log("\n===== RESUMO DA VENDA =====");
        console.log(`Cliente: ${clienteEncontrado.nome} (CPF: ${clienteEncontrado.cpf})`);
        console.log(`Produto: ${quantidade}x ${produtoEncontrado.nome}`);
        console.log(`Total pago: R$ ${venda.valorTotal.toFixed(2)}`);
    } catch (error: any) {
        console.log("Erro na venda:", error.message);
    }
}

export function mostrarVendas(): void {
    console.log("\n========== HISTÓRICO DE VENDAS ==========");

    if (minhasVendas.length === 0) {
        console.log("Nenhuma venda registrada.");
        return;
    }

    console.table(minhasVendas.map(v => ({
        Data: v.data,
        Cliente: v.cliente.nome,
        CPF: v.cliente.cpf,
        Produto: v.produto.nome || "(Produto removido)",
        Qtd: v.quantidade,
        Total: `R$ ${v.valorTotal.toFixed(2)}`
    })));
}

export function aplicarDesconto(): void {
    console.log("\n========== APLICAR DESCONTO ==========");

    if (meusProdutos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.table(meusProdutos.map((p, index) => ({
        Código: index,
        Nome: p.nome,
        Preço: `R$ ${p.preco.toFixed(2)}`
    })));

    const codigo = Number(prompt("Digite o Código do produto: "));
    const produto = meusProdutos[codigo];

    if (!produto) {
        console.log("Erro: Produto não encontrado.");
        return;
    }

    const porcentagem = Number(prompt("Digite a porcentagem de desconto (1 a 100): "));

    if (!Number.isFinite(porcentagem) || porcentagem <= 0 || porcentagem > 100) {
        console.log("Porcentagem inválida!");
        return;
    }

    const precoOriginal = produto.preco;
    const desconto = precoOriginal * (porcentagem / 100);
    produto.preco = Number((precoOriginal - desconto).toFixed(2));

    salvarProdutos(meusProdutos);

    console.log(`\nDesconto aplicado em '${produto.nome}'!`);
    console.log(`De R$ ${precoOriginal.toFixed(2)} por R$ ${produto.preco.toFixed(2)}`);
}