import { Personagem } from "./personagem.ts"

export default class Priest extends Personagem {

    constructor(nome: string) {
        
            super(nome + " o Sacerdote", forca, 0, poderdeataque, 0, resistencia, vidaatual, vidamaxima)
        }

    public Atacar(Personagem: Personagem): void {
        let converter = false
        const sorte1 = Number(Math.ceil(Math.random()) * 4)
        const sorte2 = Number(Math.ceil(Math.random()) * 10)
        if (sorte1 == sorte2) {
            converter = true
            
        }



    }

    public ContraAtacar(personagem: Personagem): void {
        
    }


    public AprimorarHablidade(): void {
        throw new Error("Este personagem não pode executar esta ação")
    }

    public regenerarVida(): void {
        this._vidaatual += this._vidamaxima * 0.1
    }

    public criarPriest(nome: string, forca: number, poderdeataque: number, resistencia: number, vidaatual: number, vidamaxima: number): Priest {
        return new Priest(nome, forca, poderdeataque, resistencia, vidaatual, vidamaxima)
    }
}