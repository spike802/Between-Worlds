export class Personagem {
    protected _nome: string
    protected _forca: number
    protected _habilidademental: number
    protected _poderdeataque: number
    protected _esquiva: number
    protected _resistencia: number
    protected _vidaatual: number
    protected _vidamaxima: number

    constructor(nome: string, forca: number, habilidademental: number, poderdeataque: number, esquiva: number, resistencia: number, vidaatual: number, vidamaxima: number) {
        this._nome = nome
        this._forca = forca
        this._habilidademental = habilidademental
        this._poderdeataque = poderdeataque
        this._esquiva = esquiva
        this._resistencia = resistencia
        this._vidaatual = vidaatual
        this._vidamaxima = vidamaxima
    }

    Atacar(personagem: Personagem): void { 
        return console.log("nada")
    }
    ContraAtacar(personagem: Personagem): void { 
        return console.log("nada")
    }
    AprimorarHabilidade(): void { 
        return console.log("nada")
    }
    regenerarVida(): void { 
        return console.log("nada")

    }




}
