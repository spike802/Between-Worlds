import promptSync from 'prompt-sync';
    const prompt = promptSync({ sigint: true }); 
    
let opcao: number;

do {
    console.log("\n===== LIVRARIA =====");
    console.log("1 - Cadastro de produtos");
    console.log("2 - Mostruário");
    console.log("3 - Sistema de venda");
    console.log("4 - Sistema de busca");
    console.log("5 - Sair");

    
    opcao = Number(prompt("Escolha uma opção:"));

    switch (opcao) {
        case 1:
            console.log("Cadastro de produtos");
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
            console.log("Saindo do sistema...");
            break;

        default:
            console.log("Opção inválida!");
    }
} while (opcao !== 5);



//npm i prompt-sync