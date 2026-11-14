//npm i prompt-sync
import promptSync from 'prompt-sync';
import { cadastrarProduto, mostrarProdutos, reporEstoque, realizarVenda, mostrarVendas, buscarProduto, cadastrarCliente, mostrarClientes, aplicarDesconto } from './src/Utilitarios.ts';

const prompt = promptSync({ sigint: true });
let opcao: number;

do {
    console.log("\n===== LOJA BETWEEN WORLDS =====");
    console.log("1 - Cadastro de produtos");
    console.log("2 - Mostruário");
    console.log("3 - Repor estoque");
    console.log("4 - Sistema de venda");
    console.log("5 - Histórico de vendas");
    console.log("6 - Sistema de busca");
    console.log("7 - Cadastrar usuário");
    console.log("8 - Mostrar clientes cadastrados");
    console.log("9 - Aplicar desconto em um produto");
    console.log("0 - Sair");

    opcao = Number(prompt("Escolha uma opção: "));

    switch (opcao) {
        case 1:
            cadastrarProduto();
            break;
        case 2:
            mostrarProdutos();
            break;
        case 3:
            reporEstoque();
            break;
        case 4:
            realizarVenda();
            break;
        case 5:
            mostrarVendas();
            break;
        case 6:
            buscarProduto();
            break;
        case 7:
            cadastrarCliente();
            break;
        case 8:
            mostrarClientes();
            break;
        case 9:
            aplicarDesconto();
            break;
        case 0:
            console.log("Saindo do sistema...");
            break;
        default:
            console.log("Opção inválida!");
    }

} while (opcao !== 0);