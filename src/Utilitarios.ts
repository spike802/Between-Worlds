import promptSync from 'prompt-sync';
import { Produtos } from './Produto.ts';
import { Livro } from './Livro.ts';
import { ActionFigure } from './ActionFigure.ts';
import { Figurinha } from './Figurinha.ts';
import { Cliente } from './Cliente.ts';
import { Vendas } from './Vendas.ts';
import { salvarProdutos, carregarProdutos, salvarClientes, carregarClientes, salvarVendas, carregarVendas } from './Salvar.ts';

const prompt = promptSync({ sigint: true });

const listaProdutos: Produtos[] = carregarProdutos();
const listaClientes: Cliente[] = carregarClientes();
const listaVendas: Vendas[] = carregarVendas(listaProdutos, listaClientes);

function lerDadosBaseProduto() {
    const nome = prompt("Nome do produto: ") || "";
    const descricao = prompt("Descrição: ") || "";
    const preco = Number(prompt("Preço: ") || 0);
    const estoque = Number(prompt("Quantidade em estoque: ") || 0);

    return { nome, descricao, preco, estoque };
}

function exibirTabelaProdutos(produtos: Produtos[]): void {
    const linhasTabela = produtos.map((produto, posicao) => {
        let categoria = "Produto";
        let especificacoes = "";

        if (produto instanceof Livro) {
            categoria = "Livro";
            especificacoes = `Autor: ${produto.autores} | Págs: ${produto.paginas} | ISBN: ${produto.isbn}`;
        } else if (produto instanceof ActionFigure) {
            categoria = "Action Figure";
            especificacoes = `Franquia: ${produto.franquia} | Material: ${produto.material}`;
        } else if (produto instanceof Figurinha) {
            categoria = "Figurinha";
            especificacoes = `Coleção: ${produto.colecao} | Raridade: ${produto.raridade}`;
        }

        return {
            Número: posicao + 1,
            Categoria: categoria,
            Nome: produto.nome,
            Preço: `R$ ${produto.preco.toFixed(2)}`,
            Estoque: produto.estoque,
            Especificações: especificacoes
        };
    });

    console.table(linhasTabela);
}

function selecionarProdutoPorNumero(): Produtos | undefined {
    exibirTabelaProdutos(listaProdutos);
    const numeroEscolhido = Number(prompt("Digite o Número do produto: "));
    return listaProdutos[numeroEscolhido - 1];
}

export function cadastrarProduto(): void {
    console.log("\n===== CADASTRAR PRODUTO =====");
    console.log("1 - Livro");
    console.log("2 - Action Figure");
    console.log("3 - Figurinha");
    const tipoEscolhido = Number(prompt("Escolha o tipo de produto: "));

    if (tipoEscolhido < 1 || tipoEscolhido > 3 || !Number.isFinite(tipoEscolhido)) {
        console.log("Tipo de produto inválido.");
        return;
    }

    try {
        const dadosBase = lerDadosBaseProduto();

        if (tipoEscolhido === 1) {
            const livro = new Livro();
            const autores = prompt("Autor(es): ") || "";
            const dataPublicacao = prompt("Data de publicação: ") || "";
            const paginas = Number(prompt("Número de páginas: ") || 0);
            const isbn = prompt("ISBN: ") || "";

            livro.cadastrarLivro(
                dadosBase.nome,
                dadosBase.descricao,
                dadosBase.preco,
                autores,
                dataPublicacao,
                paginas,
                isbn,
                dadosBase.estoque
            );
            listaProdutos.push(livro);
            console.log("Livro cadastrado com sucesso!");

        } else if (tipoEscolhido === 2) {
            const actionFigure = new ActionFigure();
            const franquia = prompt("Franquia: ") || "";
            const material = prompt("Material: ") || "";

            actionFigure.cadastrarActionFigure(
                dadosBase.nome,
                dadosBase.descricao,
                dadosBase.preco,
                franquia,
                material,
                dadosBase.estoque
            );
            listaProdutos.push(actionFigure);
            console.log("Action Figure cadastrada com sucesso!");

        } else if (tipoEscolhido === 3) {
            const figurinha = new Figurinha();
            const colecao = prompt("Coleção: ") || "";
            const raridade = prompt("Raridade: ") || "";

            figurinha.cadastrarFigurinha(
                dadosBase.nome,
                dadosBase.descricao,
                dadosBase.preco,
                colecao,
                raridade,
                dadosBase.estoque
            );
            listaProdutos.push(figurinha);
            console.log("Figurinha cadastrada com sucesso!");
        }

        salvarProdutos(listaProdutos);
    } catch (erro: any) {
        console.log("Erro ao cadastrar produto:", erro.message);
    }
}

export function reporEstoque(): void {
    console.log("\n========== REPOR ESTOQUE ==========");

    if (listaProdutos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    const produtoSelecionado = selecionarProdutoPorNumero();

    if (!produtoSelecionado) {
        console.log("Erro: Produto não encontrado.");
        return;
    }

    const quantidadeReposicao = Number(prompt(`Quantidade a adicionar em '${produtoSelecionado.nome}': `));

    try {
        produtoSelecionado.adicionarEstoque(quantidadeReposicao);
        salvarProdutos(listaProdutos);
        console.log(`Estoque atualizado! Novo estoque de '${produtoSelecionado.nome}': ${produtoSelecionado.estoque} unidades.`);
    } catch (erro: any) {
        console.log("Erro ao repor estoque:", erro.message);
    }
}

export function mostrarProdutos(): void {
    console.log("\n========== MOSTRUÁRIO ==========");

    if (listaProdutos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    exibirTabelaProdutos(listaProdutos);
}

export function buscarProduto(): void {
    console.log("\n========== BUSCAR PRODUTO ==========");
    const termoBusca = (prompt("Digite o nome do produto para buscar: ") || "").toLowerCase();

    const produtosEncontrados = listaProdutos.filter(produto =>
        produto.nome.toLowerCase().includes(termoBusca)
    );

    if (produtosEncontrados.length === 0) {
        console.log("Nenhum produto encontrado com esse nome.");
        return;
    }

    exibirTabelaProdutos(produtosEncontrados);
}

export function cadastrarCliente(): void {
    console.log("\n===== CADASTRAR CLIENTE =====");
    const cpf = prompt("Digite seu CPF: ") || "";
    const nome = prompt("Digite seu nome: ") || "";
    const email = prompt("Digite seu email: ") || "";
    const endereco = prompt("Digite seu endereço: ") || "";
    const cep = prompt("Digite seu CEP: ") || "";

    const novoCliente = new Cliente();
    novoCliente.cadastrarCliente(cpf, nome, email, endereco, cep);

    listaClientes.push(novoCliente);
    salvarClientes(listaClientes);
    console.log("Cliente cadastrado com sucesso!");
}

export function mostrarClientes(): void {
    console.log("\n========== CLIENTES CADASTRADOS ==========");

    if (listaClientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
    }

    console.table(listaClientes.map(cliente => ({
        CPF: cliente.cpf,
        Nome: cliente.nome,
        Email: cliente.email,
        Endereço: cliente.endereco,
        CEP: cliente.cep
    })));
}

export function realizarVenda(): void {
    console.log("\n========== CARRINHO ==========");

    if (listaClientes.length === 0 || listaProdutos.length === 0) {
        console.log("É necessário ter ao menos um cliente e um produto cadastrados.");
        return;
    }

    const cpfComprador = prompt("Digite o CPF do cliente comprador: ") || "";
    const clienteEncontrado = listaClientes.find(cliente => cliente.cpf === cpfComprador);

    if (!clienteEncontrado) {
        console.log("Erro: Cliente não encontrado. Cadastre o cliente antes de realizar a venda.");
        return;
    }

    const nomeProdutoCompra = prompt("Qual produto vai comprar? ") || "";
    const produtoEncontrado = listaProdutos.find(
        produto => produto.nome.toLowerCase() === nomeProdutoCompra.toLowerCase()
    );

    if (!produtoEncontrado) {
        console.log("Erro: Produto não encontrado no sistema.");
        return;
    }

    const quantidadeCompra = Number(prompt("Quantos serão comprados? ") || 0);

    try {
        const novaVenda = new Vendas(produtoEncontrado, clienteEncontrado);
        novaVenda.vender(quantidadeCompra);

        listaVendas.push(novaVenda);
        salvarProdutos(listaProdutos);
        salvarVendas(listaVendas);

        console.log("\n===== RESUMO DA VENDA =====");
        console.log(`Cliente: ${clienteEncontrado.nome} (CPF: ${clienteEncontrado.cpf})`);
        console.log(`Produto: ${quantidadeCompra}x ${produtoEncontrado.nome}`);
        console.log(`Total pago: R$ ${novaVenda.valorTotal.toFixed(2)}`);
    } catch (erro: any) {
        console.log("Erro na venda:", erro.message);
    }
}

export function mostrarVendas(): void {
    console.log("\n========== HISTÓRICO DE VENDAS ==========");

    if (listaVendas.length === 0) {
        console.log("Nenhuma venda registrada.");
        return;
    }

    console.table(listaVendas.map(venda => ({
        Data: venda.data,
        Cliente: venda.cliente.nome,
        CPF: venda.cliente.cpf,
        Produto: venda.produto.nome || "(Produto removido)",
        Quantidade: venda.quantidade,
        Total: `R$ ${venda.valorTotal.toFixed(2)}`
    })));
}

export function aplicarDesconto(): void {
    console.log("\n========== APLICAR DESCONTO ==========");

    if (listaProdutos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    const produtoSelecionado = selecionarProdutoPorNumero();

    if (!produtoSelecionado) {
        console.log("Erro: Produto não encontrado.");
        return;
    }

    const porcentagemDesconto = Number(prompt("Digite a porcentagem de desconto (1 a 100): "));
    const precoAnterior = produtoSelecionado.preco;

    try {
        produtoSelecionado.aplicarDesconto(porcentagemDesconto);
        salvarProdutos(listaProdutos);

        console.log(`\nDesconto aplicado em '${produtoSelecionado.nome}'!`);
        console.log(`De R$ ${precoAnterior.toFixed(2)} por R$ ${produtoSelecionado.preco.toFixed(2)}`);
    } catch (erro: any) {
        console.log("Erro ao aplicar desconto:", erro.message);
    }
}