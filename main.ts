//npm i prompt-sync
import { Cliente } from './src/Cliente.ts';

import { Livro } from './src/Livro.ts';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

let opcao: number;

import * as fs from 'fs';


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
        console.log("--------------------------------");
    }
}



// Função para salvar uma lista de livros no arquivo txt
function salvarLivros(listaDeLivros: Livro[]) {
    // Transforma cada livro em uma string separada por ponto e vírgula
    const dados = listaDeLivros.map(livro => {
        // Supondo que você consiga acessar as propriedades do livro. 
        // Caso sejam privadas, você precisará de métodos "get" na classe Livro.
        return `${livro.nome};${livro.descricao};${livro.preco};${livro.autores};${livro.dataPubli};${livro.paginas};${livro.ismbm}`;
    });

    // Salva no arquivo
    fs.writeFileSync("livros.txt", dados.join("\n"), "utf-8");
}

// Função para ler o arquivo txt e retornar um array de Livros
function carregarLivros(): Livro[] {
    const livrosCarregados: Livro[] = [];

    if (fs.existsSync("livros.txt")) {
        const linhas = fs.readFileSync("livros.txt", "utf-8").split("\n");

        // Usa for...of para iterar diretamente sobre os elementos, evitando o uso de índices [i]
        for (const linha of linhas) {
            if (linha.trim() === "") continue;

            const partes = linha.split(";");

            // Cria uma nova instância para cada linha lida
            const novoLivro = new Livro();

            // O uso de '|| ""' e '|| 0' garante que o TypeScript receba os tipos corretos
            novoLivro.cadastrarLivro(
                partes[0] || "",         // nome
                partes[1] || "",         // descricao
                Number(partes[2] || 0),  // preco
                partes[3] || "",         // autores
                partes[4] || "",         // dataPubli
                Number(partes[5] || 0),  // paginas
                partes[6] || ""          // ismbm
            );

            livrosCarregados.push(novoLivro);
        }
    }
    return livrosCarregados;
}

// ------------------------------------------- Uso no Programa Principal
// Carrega os dados existentes assim que o programa inicia
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
            mostrarLivros();
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
            break;
        case 7:
            console.log("Saindo do sistema...");
            break;


        default:
            console.log("Opção inválida!");
    }
} while (opcao !== 7);