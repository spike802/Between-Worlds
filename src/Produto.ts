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

    public adicionarEstoque(quantidade: number): void {
        if (quantidade <= 0) {
            throw new Error("Quantidade inválida para reposição.");
        }
        this._estoque += quantidade;
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