import { Produtos } from "./Produto.ts";

export class Livro extends Produtos {
   
    private _autores: string;
    private _dataPubli: string;
    private _paginas: number;
    private _ismbm: string;

    constructor() {
        super(); 
        this._autores = "";
        this._dataPubli = "";
        this._paginas = 0;
        this._ismbm = "";
    }

    cadastrarLivro(nome: string, descricao: string, preco: number, autores: string, dataPubli: string, paginas: number, ismbm: string, estoque: number = 0): void {
        // Atributos herdados
        this._nome = nome;
        this._descricao = descricao;
        this.preco = preco; 
        this._estoque = estoque;
        this._autores = autores;
        this._dataPubli = dataPubli;
        this._paginas = paginas;
        this._ismbm = ismbm;
    }

    public get autores(): string {
        return this._autores;
    }

    public get dataPubli(): string {
        return this._dataPubli;
    }

    public get paginas(): number {
        return this._paginas;
    }

    public get ismbm(): string {
        return this._ismbm;
    }
}