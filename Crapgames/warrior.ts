 
 import Personagem from "./personagem.ts"
 export default class Warrior extends Personagem {
    constructor(nome:string ){
       super nome, forca, habilidademental, poderdeataque, esquiva, resistencia, vidaatual, vidamaxima

       
    }
    Ataque (personagem: Personagem){
      const forca = Number(Math.ceil(Math.random()) ) * 10
      const poderAtaque = forca * 10

    }

    Esquiva(personagem:Personagem){
        const esquiva = Number(Math.ceil(Math.random()) ) * 51
    }
    
    Resistencia(personagem:Personagem){
        const defesa = Number(Math.ceil(Math.random()) ) * 9
    }
     
    Habilidademental(personagem:Personagem){
    let 0
    }
    VidaMaxima(personagem:Personagem){
        const maximo = Number(Math.floor(Math.random())) * 40000
    }
     VidaAtual(){
        const VidaAtual = VidaMaxima
     }

     AprimorarHabilidade(){
        const forca = habilidade 

     }
      regenerarVida(): void {
     this._VidaAtual += this._vidaMaxima * 0.05
}
 }