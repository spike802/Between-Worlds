import * as fs from 'fs';
import { Livro } from './Livro.ts';
import { ActionFigure } from './ActionFigure.ts';
import { Figurinha } from './Figurinha.ts';
import { Produtos } from './Produto.ts';
import { Cliente } from './Cliente.ts';
import { Vendas } from './Vendas.ts';

function limparSeparador(texto: string): string {
    return texto.replace(/;/g, ",");
}

export function salvarProdutos(listaDeProdutos: Produtos[]): void {
    const linhas: string[] = [];

    for (const item of listaDeProdutos) {
        const nome = limparSeparador(item.nome);
        const descricao = limparSeparador(item.descricao);

        if (item instanceof Livro) {
            linhas.push(`LIVRO;${nome};${descricao};${item.preco};${limparSeparador(item.autores)};${limparSeparador(item.dataPublicacao)};${item.paginas};${limparSeparador(item.isbn)};${item.estoque}`);
        } else if (item instanceof ActionFigure) {
            linhas.push(`ACTION_FIGURE;${nome};${descricao};${item.preco};${limparSeparador(item.franquia)};${limparSeparador(item.material)};${item.estoque}`);
        } else if (item instanceof Figurinha) {
            linhas.push(`FIGURINHA;${nome};${descricao};${item.preco};${limparSeparador(item.colecao)};${limparSeparador(item.raridade)};${item.estoque}`);
        }
    }

    fs.writeFileSync("produtos.txt", linhas.join("\n"), "utf-8");
}

export function carregarProdutos(): Produtos[] {
    const produtosCarregados: Produtos[] = [];

    if (!fs.existsSync("produtos.txt")) {
        return produtosCarregados;
    }

    const linhas = fs.readFileSync("produtos.txt", "utf-8").split("\n");

    for (const linha of linhas) {
        if (linha.trim() === "") continue;

        const colunas = linha.split(";");
        const tipoProduto = colunas[0];

        if (tipoProduto === "LIVRO") {
            const livro = new Livro();
            livro.cadastrarLivro(
                colunas[1] || "",
                colunas[2] || "",
                Number(colunas[3] || 0),
                colunas[4] || "",
                colunas[5] || "",
                Number(colunas[6] || 0),
                colunas[7] || "",
                Number(colunas[8] || 0)
            );
            produtosCarregados.push(livro);
        } else if (tipoProduto === "ACTION_FIGURE") {
            const actionFigure = new ActionFigure();
            actionFigure.cadastrarActionFigure(
                colunas[1] || "",
                colunas[2] || "",
                Number(colunas[3] || 0),
                colunas[4] || "",
                colunas[5] || "",
                Number(colunas[6] || 0)
            );
            produtosCarregados.push(actionFigure);
        } else if (tipoProduto === "FIGURINHA") {
            const figurinha = new Figurinha();
            figurinha.cadastrarFigurinha(
                colunas[1] || "",
                colunas[2] || "",
                Number(colunas[3] || 0),
                colunas[4] || "",
                colunas[5] || "",
                Number(colunas[6] || 0)
            );
            produtosCarregados.push(figurinha);
        }
    }

    return produtosCarregados;
}

export function salvarClientes(listaDeClientes: Cliente[]): void {
    const linhas = listaDeClientes.map(cliente => {
        return `${limparSeparador(cliente.cpf)};${limparSeparador(cliente.nome)};${limparSeparador(cliente.email)};${limparSeparador(cliente.endereco)};${limparSeparador(cliente.cep)}`;
    });

    fs.writeFileSync("clientes.txt", linhas.join("\n"), "utf-8");
}

export function carregarClientes(): Cliente[] {
    const clientesCarregados: Cliente[] = [];

    if (!fs.existsSync("clientes.txt")) {
        return clientesCarregados;
    }

    const linhas = fs.readFileSync("clientes.txt", "utf-8").split("\n");

    for (const linha of linhas) {
        if (linha.trim() === "") continue;

        const colunas = linha.split(";");
        const cliente = new Cliente();

        cliente.cadastrarCliente(
            colunas[0] || "",
            colunas[1] || "",
            colunas[2] || "",
            colunas[3] || "",
            colunas[4] || ""
        );

        clientesCarregados.push(cliente);
    }

    return clientesCarregados;
}

export function salvarVendas(listaDeVendas: Vendas[]): void {
    const linhas = listaDeVendas.map(venda => {
        return `${venda.data};${limparSeparador(venda.cliente.cpf)};${limparSeparador(venda.cliente.nome)};${limparSeparador(venda.produto.nome)};${venda.quantidade};${venda.valorTotal}`;
    });

    fs.writeFileSync("vendas.txt", linhas.join("\n"), "utf-8");
}

export function carregarVendas(produtos: Produtos[], clientes: Cliente[]): Vendas[] {
    const vendasCarregadas: Vendas[] = [];

    if (!fs.existsSync("vendas.txt")) {
        return vendasCarregadas;
    }

    const linhas = fs.readFileSync("vendas.txt", "utf-8").split("\n");

    for (const linha of linhas) {
        if (linha.trim() === "") continue;

        const colunas = linha.split(";");
        const data = colunas[0] || "";
        const cpfCliente = colunas[1] || "";
        const nomeCliente = colunas[2] || "";
        const nomeProduto = colunas[3] || "";
        const quantidade = Number(colunas[4] || 0);
        const valorTotalSalvo = Number(colunas[5] || 0);

        let cliente = clientes.find(item => item.cpf === cpfCliente);
        if (!cliente) {
            cliente = new Cliente();
            cliente.cadastrarCliente(cpfCliente, nomeCliente, "", "", "");
        }

        let produto = produtos.find(item => item.nome === nomeProduto);
        if (!produto) {
            produto = new Produtos();
            produto.preco = quantidade > 0 ? valorTotalSalvo / quantidade : 0;
        }

        const venda = new Vendas(produto, cliente, quantidade, data);
        vendasCarregadas.push(venda);
    }

    return vendasCarregadas;
}