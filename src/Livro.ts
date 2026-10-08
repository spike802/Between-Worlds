
//classe
export class Livro {

    //campos/atributos
    private _nome: string;
    private _descricao: string;
    private _preco: number;
    private _autores: string;
    private _dataPubli: string;
    private _paginas: number;
    private _ismbm: string;
    private _estoque: number;


    constructor() {
        this._nome = "";
        this._descricao = "";
        this._preco = 0;
        this._autores = "";
        this._dataPubli = "";
        this._paginas = 0;
        this._ismbm = "";
        this._estoque = 0;
    }

    cadastrarLivro(nome: string, descricao: string, preco: number, autores: string, dataPubli: string, paginas: number, ismbm: string, estoque: number = 0): void {
        this._nome = nome;
        this._descricao = descricao;
        this._preco = preco;
        this._autores = autores;
        this._dataPubli = dataPubli;
        this._paginas = paginas;
        this._ismbm = ismbm;
        this._estoque = estoque;
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

    public set preco(preco: number) {
        if (preco < 0 || preco > 100_000_000) {
            throw new Error("Preço inválido");
        }
        this._preco = preco;
    }
    public get estoque(): number {
        return this._estoque;
    }

    aplicarDesconto(porcentagem: number) {
        this._preco = this._preco - (this._preco * (porcentagem / 100));
    }


    vender(quantidade: number): void {
        if (quantidade > this._estoque) {
            throw new Error("Estoque insuficiente");
        }
        this._estoque -= quantidade;

    }
}