//npm i prompt-sync
import { Cliente } from './src/Cliente.ts';
import { Vendas } from './src/Vendas.ts';
import { Livro } from './src/Livro.ts';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });
import * as fs from 'fs';


let opcao: number;

const book: Livro = new Livro();
const client: Cliente = new Cliente();
const vendas: Vendas = new Vendas();



function aplicarDescontoLivro(): void {
    console.log("\n========== APLICAR DESCONTO ==========");

    if (meusLivros.length === 0) {
        console.log("Nenhum livro cadastrado.");
        return;
    }

    // Mostra os livros com nome, ISBN e preço
    const livrosTabela = meusLivros.map((livro) => ({
        Nome: livro.nome,
        ISBN: livro.ismbm,
        Preço: `R$ ${livro.preco.toFixed(2)}`
    }));

    console.table(livrosTabela);

    // Seleciona o livro pelo ISBN
    const isbn = prompt(
        "Digite o ISBN do livro que deseja selecionar: "
    ) || "";

    const livroEncontrado = meusLivros.find(
        livro => livro.ismbm === isbn
    );

    if (!livroEncontrado) {
        console.log("Erro: Livro não encontrado.");
        return;
    }

    console.log(`\nLivro selecionado: ${livroEncontrado.nome}`);
    console.log(`ISBN: ${livroEncontrado.ismbm}`);
    console.log(`Preço atual: R$ ${livroEncontrado.preco.toFixed(2)}`);

    // Solicita a porcentagem do desconto
    const porcentagem = Number(
        prompt("Digite a porcentagem de desconto (1 a 100): ")
    );

    if (
        !Number.isFinite(porcentagem) ||
        porcentagem <= 0 ||
        porcentagem > 100
    ) {
        console.log("Porcentagem inválida!");
        return;
    }

    const precoOriginal = livroEncontrado.preco;
    const desconto = precoOriginal * (porcentagem / 100);

    livroEncontrado.preco = Number(
        (precoOriginal - desconto).toFixed(2)
    );

    // Salva o preço atualizado
    salvarLivros(meusLivros);

    console.log("\n========== DESCONTO APLICADO ==========");
    console.log(`Livro: ${livroEncontrado.nome}`);
    console.log(`Preço original: R$ ${precoOriginal.toFixed(2)}`);
    console.log(`Desconto aplicado: ${porcentagem}%`);
    console.log(`Valor descontado: R$ ${desconto.toFixed(2)}`);
    console.log(`Novo preço: R$ ${livroEncontrado.preco.toFixed(2)}`);
}



function salvarLivros(listaDeLivros: Livro[]) {

    const dados = listaDeLivros.map(livro => {

        return `${livro.nome};${livro.descricao};${livro.preco};${livro.autores};${livro.dataPubli};${livro.paginas};${livro.ismbm};${livro.estoque}`;
    });


    fs.writeFileSync("livros.txt", dados.join("\n"), "utf-8");
}


function carregarLivros(): Livro[] {
    const livrosCarregados: Livro[] = [];

    if (fs.existsSync("livros.txt")) {
        const linhas = fs.readFileSync("livros.txt", "utf-8").split("\n");


        for (const linha of linhas) {
            if (linha.trim() === "") continue;

            const partes = linha.split(";");


            const novoLivro = new Livro();


            novoLivro.cadastrarLivro(
                partes[0] || "",         // nome
                partes[1] || "",         // descricao
                Number(partes[2] || 0),  // preco
                partes[3] || "",         // autores
                partes[4] || "",         // dataPubli
                Number(partes[5] || 0),  // paginas
                partes[6] || "",         // ismbm
                Number(partes[7] || 0)   // estoque
            );

            livrosCarregados.push(novoLivro);
        }
    }
    return livrosCarregados;
}


let meusLivros: Livro[] = carregarLivros();



function cadastrarLivro(book: Livro) {
    const nome = prompt("Digite o nome do livro: ") || "";
    const descricao = prompt("Digite a descrição do livro: ") || "";
    const preco = Number(prompt("Digite o preço do livro: ") || 0);
    const autores = prompt("Digite o(s) autor(es) do livro: ") || "";
    const dataPubli = prompt("Digite a data de publicação do livro: ") || "";
    const paginas = Number(prompt("Digite o número de páginas do livro: ") || 0);
    const ismbm = prompt("Digite o ISMBM do livro: ") || "";
    const estoque = Number(prompt("Digite a quantidade em estoque do livro: ") || 0);


    book.cadastrarLivro(nome, descricao, preco, autores, dataPubli, paginas, ismbm, estoque);

    meusLivros.push(book);
    salvarLivros(meusLivros);
}



function cadastrarCliente(client: Cliente) {
    const cpf = prompt("digite seu cpf:") || "";
    const nome = prompt("digite seu nome:") || "";
    const email = prompt("digite seu email:") || "";
    const endereco = prompt("digite seu endereço:") || "";
    const cep = prompt("digite seu cep:") || "";

    client.cadastrarCliente(cpf, nome, email, endereco, cep);
}



function mostrarLivros(): void {
    console.log("\n========== MOSTRUÁRIO ==========");

    // Verifica se existem livros cadastrados
    if (meusLivros.length === 0) {
        console.log("Nenhum livro cadastrado.");
        return;
    }

    
    const livrosTabela = Object.fromEntries(
        meusLivros.map((livro) => [
            livro.ismbm,
            {
                Nome: livro.nome,
                Descrição: livro.descricao,
                Preço: `R$ ${livro.preco}`,
                "Autor(es)": livro.autores,
                "Data de publicação": livro.dataPubli,
                "Número de páginas": livro.paginas,
                Estoque: livro.estoque
            }
        ])
    );

    // Exibe os livros em formato de tabela
    console.table(livrosTabela);
}



function vender(vendas: Vendas): void {
    console.log("\n========== CARRINHO ==========");

    const livroCompra = prompt("Qual livro vai comprar? ") || "";
    const quantidadeDigitada = prompt("Quantos serão comprados? ") || "0";
    const quantidade = parseInt(quantidadeDigitada);

    // 1. Procurar o livro na sua lista
    const livroEncontrado = meusLivros.find(livro => livro.nome === livroCompra);

    if (!livroEncontrado) {
        console.log("Erro: Livro não encontrado no sistema.");
        return;
    }

    try {
        if (quantidade > livroEncontrado.estoque) {
            console.log("Erro: Estoque insuficiente.");
        } else {
            livroEncontrado.reduzirEstoque(quantidade);

            console.log(`\nSucesso! Venda de ${quantidade}x '${livroEncontrado.nome}' realizada.`);
        }
    } catch (error: any) {
        console.log("Ocorreu um erro na venda:", error.message);
    }
}


do {
    console.log("\n===== LIVRARIA =====");
    console.log("1 - Cadastro de produtos");
    console.log("2 - Mostruário");
    console.log("3 - Sistema de venda");
    console.log("4 - Sistema de busca");
    console.log("5 - Cadastrar usuário");
    console.log("6 - Mostrar clientes cadastrados");
    console.log("7 - Aplicar desconto em um livro");
    console.log("8 - Sair");

    opcao = Number(prompt("Escolha uma opção: "));

    switch (opcao) {
        case 1:
            console.log("Cadastro de produtos");
            cadastrarLivro(book);
            break;

        case 2:
            mostrarLivros();
            break;

        case 3:
            console.log("Sistema de venda");
            vender(vendas);
            break;

        case 4:
            console.log("Sistema de busca");
            break;

        case 5:
            console.log("Cadastro de usuários");
            cadastrarCliente(client);
            break;

        case 6:
            console.log("Mostrar clientes cadastrados");
            break;

        case 7:
            aplicarDescontoLivro();
            break;

        case 8:
            console.log("Saindo do sistema...");
            break;

        default:
            console.log("Opção inválida!");
    }

} while (opcao !== 8);
