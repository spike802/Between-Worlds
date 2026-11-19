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

    public set preco(valor: number) {
        if (valor < 0) {
            throw new Error("Preço inválido.");
        }
        this._preco = valor;
    }

    public aplicarDesconto(porcentagem: number): void {
        if (porcentagem <= 0 || porcentagem > 100) {
            throw new Error("Porcentagem inválida.");
        }
        this._preco = Number((this._preco - (this._preco * porcentagem / 100)).toFixed(2));
    }

    public reduzirEstoque(quantidade: number): void {
        if (quantidade <= 0 || quantidade > this._estoque) {
            throw new Error("Quantidade inválida ou estoque insuficiente.");
        }
        this._estoque -= quantidade;
    }

    public adicionarEstoque(quantidade: number): void {
        if (quantidade <= 0) {
            throw new Error("Quantidade inválida.");
        }
        this._estoque += quantidade;
    }

    public get nome(): string { return this._nome; }
    public get descricao(): string { return this._descricao; }
    public get preco(): number { return this._preco; }
    public get estoque(): number { return this._estoque; }
}