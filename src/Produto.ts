//O tornar a superclasse, para criar outros produtos derivados, 

// produtos:
// Livro
// ActionFigure
// figurinhas

export class Produtos {
    
    protected _nome: string;
    protected _descricao: string;
    protected _preco: number;
    protected _estoque: number;

    constructor() {
        this._nome = "";
        this._descricao = "";
        this._preco = 0;
        this._estoque = 0;
    }

    public set preco(preco: number) {
        if (preco < 0 || preco > 100_000_000) {
            throw new Error("Preço inválido");
        }
        this._preco = preco;
    }

    public reduzirEstoque(quantidade: number): void {
        this._estoque -= quantidade;
    }

    public get nome(): string {
        return this._nome;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public get preco(): number {
        return this._preco;
    }

    public get estoque(): number {
        return this._estoque;
    }
}