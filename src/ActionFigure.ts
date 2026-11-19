import { Produtos } from "./Produto.ts";

export class ActionFigure extends Produtos {
    private _material: string;

    constructor() {
        super();
        this._material = "";
    }

    public cadastrarActionFigure(nome: string, descricao: string, preco: number, material: string, estoque: number): void {
        this._nome = nome;
        this._descricao = descricao;
        this.preco = preco;
        this._material = material;
        this._estoque = estoque;
    }

    public get material(): string {
        return this._material;
    }
}