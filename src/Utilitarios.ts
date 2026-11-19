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

export function cadastrarProduto(): void {
    console.log("\n1 - Livro | 2 - Action Figure | 3 - Figurinha");
    const tipo = Number(prompt("Tipo de produto: "));

    const nome = prompt("Nome: ") || "";
    const descricao = prompt("Descrição: ") || "";
    const preco = Number(prompt("Preço: ") || 0);
    const estoque = Number(prompt("Estoque: ") || 0);

    try {
        if (tipo === 1) {
            const livro = new Livro();
            const autores = prompt("Autor(es): ") || "";
            const dataPubli = prompt("Data de publicação: ") || "";
            const paginas = Number(prompt("Páginas: ") || 0);
            const isbn = prompt("ISBN: ") || "";

            livro.cadastrarLivro(nome, descricao, preco, autores, dataPubli, paginas, isbn, estoque);
            meusProdutos.push(livro);
        } else if (tipo === 2) {
            const af = new ActionFigure();
            const franquia = prompt("Franquia: ") || "";
            const material = prompt("Material: ") || "";

            af.cadastrarActionFigure(nome, descricao, preco, material, estoque);
            meusProdutos.push(af);
        } else if (tipo === 3) {
            const fig = new Figurinha();
            const colecao = prompt("Coleção: ") || "";
            const raridade = prompt("Raridade: ") || "";

            fig.cadastrarFigurinha(nome, descricao, preco, colecao, raridade, estoque);
            meusProdutos.push(fig);
        } else {
            console.log("Tipo inválido.");
            return;
        }

        salvarProdutos(meusProdutos);
        console.log("Produto cadastrado com sucesso!");
    } catch (erro: any) {
        console.log("Erro:", erro.message);
    }
}

export function mostrarProdutos(): void {
    if (meusProdutos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.table(meusProdutos.map((p, index) => ({
        Código: index + 1,
        Nome: p.nome,
        Descrição: p.descricao,
        Preço: `R$ ${p.preco.toFixed(2)}`,
        Estoque: p.estoque
    })));
}

export function reporEstoque(): void {
    mostrarProdutos();
    if (meusProdutos.length === 0) return;

    const codigo = Number(prompt("Digite o Código do produto: ")) - 1;
    const produto = meusProdutos[codigo];

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    try {
        const qtd = Number(prompt("Quantidade a adicionar: "));
        produto.adicionarEstoque(qtd);
        salvarProdutos(meusProdutos);
        console.log("Estoque atualizado!");
    } catch (erro: any) {
        console.log("Erro:", erro.message);
    }
}

export function buscarProduto(): void {
    const busca = (prompt("Nome do produto: ") || "").toLowerCase();
    const encontrados = meusProdutos.filter(p => p.nome.toLowerCase().includes(busca));

    if (encontrados.length === 0) {
        console.log("Nenhum produto encontrado.");
        return;
    }

    console.table(encontrados.map(p => ({
        Nome: p.nome,
        Preço: `R$ ${p.preco.toFixed(2)}`,
        Estoque: p.estoque
    })));
}

export function cadastrarCliente(): void {
    const cpf = prompt("CPF: ") || "";
    const nome = prompt("Nome: ") || "";
    const email = prompt("Email: ") || "";
    const endereco = prompt("Endereço: ") || "";
    const cep = prompt("CEP: ") || "";

    const cliente = new Cliente();
    cliente.cadastrarCliente(cpf, nome, email, endereco, cep);

    meusClientes.push(cliente);
    salvarClientes(meusClientes);
    console.log("Cliente cadastrado!");
}

export function mostrarClientes(): void {
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

export function realizarVenda(): void {
    const cpf = prompt("CPF do cliente: ") || "";
    const cliente = meusClientes.find(c => c.cpf === cpf);

    if (!cliente) {
        console.log("Cliente não encontrado.");
        return;
    }

    const nomeProduto = prompt("Nome do produto: ") || "";
    const produto = meusProdutos.find(p => p.nome.toLowerCase() === nomeProduto.toLowerCase());

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    const qtd = Number(prompt("Quantidade: "));

    try {
        const venda = new Vendas(produto, cliente);
        venda.vender(qtd);

        minhasVendas.push(venda);
        salvarProdutos(meusProdutos);
        salvarVendas(minhasVendas);

        console.log(`Venda realizada! Total: R$ ${venda.valorTotal.toFixed(2)}`);
    } catch (erro: any) {
        console.log("Erro:", erro.message);
    }
}

export function mostrarVendas(): void {
    if (minhasVendas.length === 0) {
        console.log("Nenhuma venda registrada.");
        return;
    }

    console.table(minhasVendas.map(v => ({
        Data: v.data,
        Cliente: v.cliente.nome,
        Produto: v.produto.nome,
        Qtd: v.quantidade,
        Total: `R$ ${v.valorTotal.toFixed(2)}`
    })));
}

export function aplicarDesconto(): void {
    mostrarProdutos();
    if (meusProdutos.length === 0) return;

    const codigo = Number(prompt("Digite o Código do produto: ")) - 1;
    const produto = meusProdutos[codigo];

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    try {
        const porcentagem = Number(prompt("Porcentagem de desconto (1 a 100): "));
        produto.aplicarDesconto(porcentagem);
        salvarProdutos(meusProdutos);
        console.log(`Desconto aplicado! Novo preço: R$ ${produto.preco.toFixed(2)}`);
    } catch (erro: any) {
        console.log("Erro:", erro.message);
    }
}