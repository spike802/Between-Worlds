import { Produtos } from "./Produto.ts";

export class Livro extends Produtos {
    private _autores: string;
    private _dataPublicacao: string;
    private _paginas: number;
    private _isbn: string;

    constructor() {
        super();
        this._autores = "";
        this._dataPublicacao = "";
        this._paginas = 0;
        this._isbn = "";
    }

    public cadastrarLivro(
        nome: string,
        descricao: string,
        preco: number,
        autores: string,
        dataPublicacao: string,
        paginas: number,
        isbn: string,
        estoque: number = 0
    ): void {
        this._nome = nome;
        this._descricao = descricao;
        this.preco = preco;
        this._estoque = estoque;
        this._autores = autores;
        this._dataPublicacao = dataPublicacao;
        this._paginas = paginas;
        this._isbn = isbn;
    }

    public get autores(): string {
        return this._autores;
    }

    public get dataPublicacao(): string {
        return this._dataPublicacao;
    }

    public get paginas(): number {
        return this._paginas;
    }

    public get isbn(): string {
        return this._isbn;
    }
}