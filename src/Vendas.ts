import { Cliente } from "./Cliente.ts";
import { Livro } from "./Livro.ts";


export class Vendas {

    private _livro: Livro;
    private _cliente: Cliente;

    constructor() {
        this._livro = new Livro;
        this._cliente = new Cliente;
    }

    vender(quantidade: number): void {
        if (quantidade > this._livro.estoque) {
            throw new Error("Estoque insuficiente");
        }
        this._livro.reduzirEstoque(quantidade);
    }

    
}