//npm i prompt-sync
import { Cliente } from './src/Cliente.ts';

import { Livro } from './src/Livro.ts';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

let opcao: number;

import * as fs from 'fs';




function salvarLivros(listaDeLivros: Livro[]) {
   
    const dados = listaDeLivros.map(livro => {
        
        return `${livro.nome};${livro.descricao};${livro.preco};${livro.autores};${livro.dataPubli};${livro.paginas};${livro.ismbm}`;
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
                partes[0] || "",         
                partes[1] || "",         
                Number(partes[2] || 0),  
                partes[3] || "",         
                partes[4] || "",         
                Number(partes[5] || 0),  
                partes[6] || ""          
            );

            livrosCarregados.push(novoLivro);
        }
    }
    return livrosCarregados;
}

let meusLivros: Livro[] = carregarLivros();

const book: Livro = new Livro();
const client: Cliente = new Cliente();

function cadastrarLivro(book: Livro) {
    const nome = prompt("Digite o nome do livro: ") || "";
    const descricao = prompt("Digite a descrição do livro: ") || "";
    const preco = Number(prompt("Digite o preço do livro: ") || 0);
    const autores = prompt("Digite o(s) autor(es) do livro: ") || "";
    const dataPubli = prompt("Digite a data de publicação do livro: ") || "";
    const paginas = Number(prompt("Digite o número de páginas do livro: ") || 0);
    const ismbm = prompt("Digite o ISMBM do livro: ") || "";

    book.cadastrarLivro(nome, descricao, preco, autores, dataPubli, paginas, ismbm);
}

meusLivros.push(book);
salvarLivros(meusLivros);

function cadastrarCliente(client: Cliente) {
    const cpf = prompt("digite seu cpf:")|| "";
    const nome = prompt("digite seu nome:") || "";
    const email = prompt("digite seu email:") || "";
    const endereco = prompt("digite seu endereço:") || "";
    const cep = prompt("digite seu cep:") || "";

    client.cadastrarCliente(cpf, nome, email, endereco, cep);
}

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
            console.log("Mostrar clientes cadastrados");
        case 7:
            console.log("Saindo do sistema...");
            break;


        default:
            console.log("Opção inválida!");
    }
} while (opcao !== 7);