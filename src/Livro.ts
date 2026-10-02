
//classe
export class Livro {

    //campos/atributos
    private nome: string;
    private descricao: string;
    private _preco: number;
    private autores: string;
    private dataPubli: string;
    private paginas: number;
    private ismbm: string;
    private _estoque: number;


    constructor() {
        this.nome = "";
        this.descricao = "";
        this._preco = 0;
        this.autores = "";
        this.dataPubli = "";
        this.paginas = 0;
        this.ismbm = "";
        this._estoque = 0;
    }

    cadastrarLivro(nome: string, descricao: string, preco: number, autores: string, dataPubli: string, paginas: number, ismbm: string): void {
        this.nome = nome;
        this.descricao = descricao;
        this._preco = preco;
        this.autores = autores;
        this.dataPubli = dataPubli;
        this.paginas = paginas;
        this.ismbm = ismbm;
    }

    public get preco(): number {
        return this.preco;
    }

    public set preco(preco: number) {
        if (preco < 0 || preco > 100_000_000) {
            throw new Error("Preço inválido");
        }
        this._preco = preco;
    }

    aplicarDesconto(porcentagem: number) {
        this._preco = this._preco - (this._preco * (porcentagem / 100));
    }


    vender(quantidade: number): void {
        this._estoque -= quantidade;

    }
}