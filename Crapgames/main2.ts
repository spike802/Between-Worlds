 import {personagem} from './personagem';
 import {warrior} from './warrior';
 import {Priest} from './Priest';

  function escolherClasse() {
    console.log("Escolha sua classe: ");
    console.log("1 - Warrior");
    console.log("2 - Priest");

    const opcao = prompt("Digite o número da classe desejada: ");

    let personagemEscolhido: personagem;

    if (opcao === "1") {

  }else if (opcao === "2") {


  }else {
    console.log("Opção inválida. Por favor, escolha uma classe válida.");
    return;
  }
}