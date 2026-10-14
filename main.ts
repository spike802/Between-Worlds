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

    if (meusLivros.length === 0) {
        console.log("Nenhum livro cadastrado.");
        return;
    }

    for (const livro of meusLivros) {
        console.log("\n--------------------------------");
        console.log(`Nome: ${livro.nome}`);
        console.log(`Descrição: ${livro.descricao}`);
        console.log(`Preço: R$ ${livro.preco}`);
        console.log(`Autor(es): ${livro.autores}`);
        console.log(`Data de publicação: ${livro.dataPubli}`);
        console.log(`Número de páginas: ${livro.paginas}`);
        console.log(`ISBN: ${livro.ismbm}`);
        console.log(`Estoque: ${livro.estoque}`);
        console.log("--------------------------------");
    }
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
    console.log("5 - Cadastrar de usuário");
    console.log("6 - Mostrar clientes cadastrados");
    console.log("7 - Sair");


    opcao = Number(prompt("Escolha uma opção:"));

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
            console.log("Cadastro de Usuarios");
            cadastrarCliente(client)
            break;

        case 6:
            console.log("Mostrar clientes cadastrados");
            break;
        case 7:
            console.log("Saindo do sistema...");
            break;

        default:
            console.log("Opção inválida!");
    }
} while (opcao !== 7);