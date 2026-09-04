//npm i prompt-sync
import { Cliente } from './src/Cliente.ts';
import promptSync from 'prompt-sync';
import { Livro } from './src/Livro.ts';
const prompt = promptSync({ sigint: true });
let opcao: number;

const book: Livro = new Livro();
const client: Cliente = new Cliente();

do {
    console.log("\n===== LIVRARIA =====");
    console.log("1 - Cadastro de produtos");
    console.log("2 - Mostruário");
    console.log("3 - Sistema de venda");
    console.log("4 - Sistema de busca");
    console.log("5 - Cadastrar de usuário");
    console.log("6 - Sair");


    opcao = Number(prompt("Escolha uma opção:"));

    switch (opcao) {
        case 1:
            console.log("Cadastro de produtos");
            cadastrarLivro(book);
            break;

        case 2:
            console.log("Mostruário");
            break;

        case 3:
            console.log("Sistema de venda");
            break;

        case 4:
            console.log("Sistema de busca");
            break;

        case 5:
            console.log("Cadastro de Usuarios");
            cadastrarCliente(client)
            break;
        case 6:
            console.log("Saindo do sistema...");
            break;

        default:
            console.log("Opção inválida!");
    }
} while (opcao !== 6);


function cadastrarLivro(book: Livro) {
    const nome = prompt("Digite o nome do livro: ") || "";
    const descricao = prompt("Digite a descrição do livro: ") || "";
    const preco = Number(prompt("Digite o preço do livro: ") || 0);
    const autores = prompt("Digite o(s) autor(es) do livro: ") || "";
    const dataPubli = prompt("Digite a data de publicação do livro: ") || "";
    const paginas = Number(prompt("Digite o número de páginas do livro: ") || 0);
    const conteudo = prompt("Digite o conteúdo do livro: ") || "";
    const ismbm = prompt("Digite o ISMBM do livro: ") || "";

    book.cadastrarLivro(nome, descricao, preco, autores, dataPubli, paginas, conteudo, ismbm);
}

function cadastrarCliente(client: Cliente) {
    const cpf = prompt("digite seu cpf:")|| "";
    const nome = prompt("digite seu nome:") || "";
    const email = prompt("digite seu email:") || "";
    const endereco = prompt("digite seu endereço:") || "";
    const cep = prompt("digite seu cep:") || "";

    client.cadastrarCliente(cpf, nome, email, endereco, cep);
}