import { Produtos } from "./Produto.ts";

export class Livro extends Produtos {
    private _autores: string;
    private _dataPubli: string;
    private _paginas: number;
    private _isbn: string;

    constructor() {
        super();
        this._autores = "";
        this._dataPubli = "";
        this._paginas = 0;
        this._isbn = "";
    }

    public cadastrarLivro(nome: string, descricao: string, preco: number, autores: string, dataPubli: string, paginas: number, isbn: string, estoque: number): void {
        this._nome = nome;
        this._descricao = descricao;
        this.preco = preco;
        this._autores = autores;
        this._dataPubli = dataPubli;
        this._paginas = paginas;
        this._isbn = isbn;
        this._estoque = estoque;
    }

    public get autores(): string { return this._autores; }
    public get dataPubli(): string { return this._dataPubli; }
    public get paginas(): number { return this._paginas; }
    public get isbn(): string { return this._isbn; }
}