import * as fs from 'fs';
import { Livro } from './Livro.ts';
import { ActionFigure } from './ActionFigure.ts';
import { Figurinha } from './Figurinha.ts';
import { Produtos } from './Produto.ts';
import { Cliente } from './Cliente.ts';
import { Vendas } from './Vendas.ts';

export function salvarProdutos(listaDeProdutos: Produtos[]): void {
    const linhas: string[] = [];

    for (const item of listaDeProdutos) {
        if (item instanceof Livro) {
            linhas.push(`LIVRO;${item.nome};${item.descricao};${item.preco};${item.autores};${item.dataPubli};${item.paginas};${item.ismbm};${item.estoque}`);
        } else if (item instanceof ActionFigure) {
            linhas.push(`ACTION_FIGURE;${item.nome};${item.descricao};${item.preco};${item.franquia};${item.material};${item.estoque}`);
        } else if (item instanceof Figurinha) {
            linhas.push(`FIGURINHA;${item.nome};${item.descricao};${item.preco};${item.colecao};${item.raridade};${item.estoque}`);
        }
    }

    fs.writeFileSync("produtos.txt", linhas.join("\n"), "utf-8");
}

export function carregarProdutos(): Produtos[] {
    const produtosCarregados: Produtos[] = [];

    if (fs.existsSync("produtos.txt")) {
        const linhas = fs.readFileSync("produtos.txt", "utf-8").split("\n");

        for (const linha of linhas) {
            if (linha.trim() === "") continue;

            const partes = linha.split(";");
            const tipo = partes[0];

            if (tipo === "LIVRO") {
                const livro = new Livro();
                livro.cadastrarLivro(
                    partes[1] || "",
                    partes[2] || "",
                    Number(partes[3] || 0),
                    partes[4] || "",
                    partes[5] || "",
                    Number(partes[6] || 0),
                    partes[7] || "",
                    Number(partes[8] || 0)
                );
                produtosCarregados.push(livro);
            } else if (tipo === "ACTION_FIGURE") {
                const af = new ActionFigure();
                af.cadastrarActionFigure(
                    partes[1] || "",
                    partes[2] || "",
                    Number(partes[3] || 0),
                    partes[4] || "",
                    partes[5] || "",
                    Number(partes[6] || 0)
                );
                produtosCarregados.push(af);
            } else if (tipo === "FIGURINHA") {
                const fig = new Figurinha();
                fig.cadastrarFigurinha(
                    partes[1] || "",
                    partes[2] || "",
                    Number(partes[3] || 0),
                    partes[4] || "",
                    partes[5] || "",
                    Number(partes[6] || 0)
                );
                produtosCarregados.push(fig);
            }
        }
    }
    return produtosCarregados;
}

export function salvarClientes(listaDeClientes: Cliente[]): void {
    const dados = listaDeClientes.map(cliente => {
        return `${cliente.cpf};${cliente.nome};${cliente.email};${cliente.endereco};${cliente.cep}`;
    });

    fs.writeFileSync("clientes.txt", dados.join("\n"), "utf-8");
}

export function carregarClientes(): Cliente[] {
    const clientesCarregados: Cliente[] = [];

    if (fs.existsSync("clientes.txt")) {
        const linhas = fs.readFileSync("clientes.txt", "utf-8").split("\n");

        for (const linha of linhas) {
            if (linha.trim() === "") continue;

            const partes = linha.split(";");
            const novoCliente = new Cliente();

            novoCliente.cadastrarCliente(
                partes[0] || "",
                partes[1] || "",
                partes[2] || "",
                partes[3] || "",
                partes[4] || ""
            );

            clientesCarregados.push(novoCliente);
        }
    }
    return clientesCarregados;
}

export function salvarVendas(listaDeVendas: Vendas[]): void {
    const linhas = listaDeVendas.map(venda => {
        return `${venda.data};${venda.cliente.cpf};${venda.cliente.nome};${venda.produto.nome};${venda.quantidade};${venda.valorTotal}`;
    });

    fs.writeFileSync("vendas.txt", linhas.join("\n"), "utf-8");
}

export function carregarVendas(produtos: Produtos[], clientes: Cliente[]): Vendas[] {
    const vendasCarregadas: Vendas[] = [];

    if (fs.existsSync("vendas.txt")) {
        const linhas = fs.readFileSync("vendas.txt", "utf-8").split("\n");

        for (const linha of linhas) {
            if (linha.trim() === "") continue;

            const partes = linha.split(";");
            const data = partes[0] || "";
            const cpfCliente = partes[1] || "";
            const nomeCliente = partes[2] || "";
            const nomeProduto = partes[3] || "";
            const quantidade = Number(partes[4] || 0);

            // Busca o cliente e o produto correspondentes ou cria referências básicas caso tenham sido removidos
            let cliente = clientes.find(c => c.cpf === cpfCliente);
            if (!cliente) {
                cliente = new Cliente();
                cliente.cadastrarCliente(cpfCliente, nomeCliente, "", "", "");
            }

            let produto = produtos.find(p => p.nome === nomeProduto);
            if (!produto) {
                produto = new Produtos();
                // Calcula o preço unitário aproximado pelo total salvo
                const valorTotalSalvo = Number(partes[5] || 0);
                produto.preco = quantidade > 0 ? valorTotalSalvo / quantidade : 0;
            }

            const venda = new Vendas(produto, cliente, quantidade, data);
            vendasCarregadas.push(venda);
        }
    }
    return vendasCarregadas;
}