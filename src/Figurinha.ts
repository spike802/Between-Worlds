import { Produtos } from "./Produto.ts";

export class Figurinha extends Produtos {
    private _colecao: string;
    private _raridade: string;

    constructor() {
        super();
        this._colecao = "";
        this._raridade = "";
    }

    cadastrarFigurinha(nome: string, descricao: string, preco: number, colecao: string, raridade: string, estoque: number = 0): void {
        this._nome = nome;
        this._descricao = descricao;
        this.preco = preco;
        this._estoque = estoque;  
        this._colecao = colecao;
        this._raridade = raridade;
    }

    public get colecao(): string {
        return this._colecao;
    }

    public get raridade(): string {
        return this._raridade;
    }
}