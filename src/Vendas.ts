import { Cliente } from "./Cliente.ts";
import { Produtos } from "./Produto.ts";

export class Vendas {
    private _produto: Produtos;
    private _cliente: Cliente;
    private _quantidade: number;
    private _valorTotal: number;
    private _data: string;

    constructor(
        produto: Produtos = new Produtos(),
        cliente: Cliente = new Cliente(),
        quantidade: number = 0,
        data: string = new Date().toLocaleDateString("pt-BR")
    ) {
        this._produto = produto;
        this._cliente = cliente;
        this._quantidade = quantidade;
        this._valorTotal = produto.preco * quantidade;
        this._data = data;
    }

    public vender(quantidade: number): void {
        if (quantidade <= 0 || !Number.isFinite(quantidade)) {
            throw new Error("Quantidade inválida.");
        }
        if (quantidade > this._produto.estoque) {
            throw new Error("Estoque insuficiente.");
        }
        this._quantidade = quantidade;
        this._valorTotal = Number((this._produto.preco * quantidade).toFixed(2));
        this._produto.reduzirEstoque(quantidade);
    }

    public get produto(): Produtos {
        return this._produto;
    }

    public get cliente(): Cliente {
        return this._cliente;
    }

    public get quantidade(): number {
        return this._quantidade;
    }

    public get valorTotal(): number {
        return this._valorTotal;
    }

    public get data(): string {
        return this._data;
    }
}