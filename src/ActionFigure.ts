import { Produtos } from "./Produto.ts";

export class ActionFigure extends Produtos {
    private _franquia: string;
    private _material: string;

    constructor() {
        super();
        this._franquia = "";
        this._material = "";
    }

    cadastrarActionFigure(nome: string, descricao: string, preco: number, franquia: string, material: string, estoque: number = 0): void {
        this._nome = nome;
        this._descricao = descricao;
        this.preco = preco;
        this._estoque = estoque;
        this._franquia = franquia;
        this._material = material;
    }

    public get franquia(): string {
        return this._franquia;
    }

    public get material(): string {
        return this._material;
    }
}