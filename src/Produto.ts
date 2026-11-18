export class Produtos {
    private static readonly PRECO_MAXIMO = 100_000_000;

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
        if (!Number.isFinite(valor) || valor < 0 || valor > Produtos.PRECO_MAXIMO) {
            throw new Error("Preço inválido.");
        }
        this._preco = valor;
    }

    public aplicarDesconto(porcentagem: number): void {
        if (!Number.isFinite(porcentagem) || porcentagem <= 0 || porcentagem > 100) {
            throw new Error("Porcentagem de desconto inválida.");
        }
        const valorDesconto = this._preco * (porcentagem / 100);
        this.preco = Number((this._preco - valorDesconto).toFixed(2));
    }

    public reduzirEstoque(quantidade: number): void {
        if (!Number.isFinite(quantidade) || quantidade <= 0) {
            throw new Error("Quantidade inválida para baixa de estoque.");
        }
        if (quantidade > this._estoque) {
            throw new Error("Estoque insuficiente.");
        }
        this._estoque -= quantidade;
    }

    public adicionarEstoque(quantidade: number): void {
        if (!Number.isFinite(quantidade) || quantidade <= 0) {
            throw new Error("Quantidade inválida para reposição.");
        }
        this._estoque += quantidade;
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