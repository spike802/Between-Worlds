import * as fs from 'fs';
import { Livro } from './Livro.ts';
import { ActionFigure } from './ActionFigure.ts';
import { Figurinha } from './Figurinha.ts';
import { Produtos } from './Produto.ts';
import { Cliente } from './Cliente.ts';
import { Vendas } from './Vendas.ts';

export function salvarProdutos(lista: Produtos[]): void {
    const linhas: string[] = [];

    for (const item of lista) {
        if (item instanceof Livro) {
            linhas.push(`LIVRO;${item.nome};${item.descricao};${item.preco};${item.autores};${item.dataPubli};${item.paginas};${item.isbn};${item.estoque}`);
        } else if (item instanceof ActionFigure) {
            linhas.push(`ACTION_FIGURE;${item.nome};${item.descricao};${item.preco};${item.material};${item.estoque}`);
        } else if (item instanceof Figurinha) {
            linhas.push(`FIGURINHA;${item.nome};${item.descricao};${item.preco};${item.colecao};${item.raridade};${item.estoque}`);
        }
    }

    fs.writeFileSync("produtos.txt", linhas.join("\n"), "utf-8");
}

export function carregarProdutos(): Produtos[] {
    const lista: Produtos[] = [];

    if (!fs.existsSync("produtos.txt")) {
        return lista;
    }

    const linhas = fs.readFileSync("produtos.txt", "utf-8").split("\n");

    for (const linha of linhas) {
        if (linha.trim() === "") continue;
        const dados = linha.split(";");

        if (dados[0] === "LIVRO") {
            const livro = new Livro();
            livro.cadastrarLivro(
                dados[1] || "",
                dados[2] || "",
                Number(dados[3] || 0),
                dados[4] || "",
                dados[5] || "",
                Number(dados[6] || 0),
                dados[7] || "",
                Number(dados[8] || 0)
            );
            lista.push(livro);
        } else if (dados[0] === "ACTION_FIGURE") {
            const af = new ActionFigure();
            af.cadastrarActionFigure(
                dados[1] || "",
                dados[2] || "",
                Number(dados[3] || 0),
                dados[4] || "",
                Number(dados[5] || 0)
            );
            lista.push(af);
        } else if (dados[0] === "FIGURINHA") {
            const fig = new Figurinha();
            fig.cadastrarFigurinha(
                dados[1] || "",
                dados[2] || "",
                Number(dados[3] || 0),
                dados[4] || "",
                dados[5] || "",
                Number(dados[6] || 0)
            );
            lista.push(fig);
        }
    }

    return lista;
}

export function salvarClientes(lista: Cliente[]): void {
    const linhas: string[] = [];

    for (const cliente of lista) {
        linhas.push(`${cliente.cpf};${cliente.nome};${cliente.email};${cliente.endereco};${cliente.cep}`);
    }

    fs.writeFileSync("clientes.txt", linhas.join("\n"), "utf-8");
}

export function carregarClientes(): Cliente[] {
    const lista: Cliente[] = [];

    if (!fs.existsSync("clientes.txt")) {
        return lista;
    }

    const linhas = fs.readFileSync("clientes.txt", "utf-8").split("\n");

    for (const linha of linhas) {
        if (linha.trim() === "") continue;
        const dados = linha.split(";");

        const cliente = new Cliente();
        cliente.cadastrarCliente(
            dados[0] || "",
            dados[1] || "",
            dados[2] || "",
            dados[3] || "",
            dados[4] || ""
        );
        lista.push(cliente);
    }

    return lista;
}

export function salvarVendas(lista: Vendas[]): void {
    const linhas: string[] = [];

    for (const venda of lista) {
        linhas.push(`${venda.data};${venda.cliente.cpf};${venda.cliente.nome};${venda.produto.nome};${venda.quantidade};${venda.valorTotal}`);
    }

    fs.writeFileSync("vendas.txt", linhas.join("\n"), "utf-8");
}

export function carregarVendas(produtos: Produtos[], clientes: Cliente[]): Vendas[] {
    const lista: Vendas[] = [];

    if (!fs.existsSync("vendas.txt")) {
        return lista;
    }

    const linhas = fs.readFileSync("vendas.txt", "utf-8").split("\n");

    for (const linha of linhas) {
        if (linha.trim() === "") continue;
        const dados = linha.split(";");

        const cliente = new Cliente();
        cliente.cadastrarCliente(dados[1] || "", dados[2] || "", "", "", "");

        const quantidade = Number(dados[4] || 0);
        const valorTotal = Number(dados[5] || 0);

        const produto = new Produtos();
        produto.preco = quantidade > 0 ? valorTotal / quantidade : 0;

        const venda = new Vendas(produto, cliente, quantidade, dados[0] || "");
        lista.push(venda);
    }

    return lista;
}