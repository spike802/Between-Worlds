import { Encadernacao } from "./Encardenaçao.ts";
import { Etaria } from "./etaria.ts";

//classe
export class Livro {

    //campos/atributos
    nome: string;
    descricao: string;
    preco: number;
    autores: string;
    dataPubli: string;
    paginas: number;
    conteudo: string;
    ismbm: string;
    encadernacao: Encadernacao;
    etaria: Etaria;
    estoque: number;


    constructor() {
        this.nome = "";
        this.descricao = "";
        this.preco = 0;
        this.autores = "";
        this.dataPubli = "";
        this.paginas = 0;
        this.conteudo = "";
        this.ismbm = "";
        this.encadernacao = new Encadernacao(""); //linkar
        this.etaria = new Etaria(""); //linkar
        this.estoque = 0;
    }

    cadastrarLivro(nome: string, descricao: string, preco: number, autores: string, dataPubli: string, paginas: number, conteudo: string, ismbm: string, estoque: number): void {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.autores = autores;
        this.dataPubli = dataPubli
        this.paginas = paginas;
        this.conteudo = conteudo;
        this.ismbm = ismbm;
        this.estoque = estoque



    }
    aplicarDesconto(porcentagem: number) {
        this.preco = this.preco - (this.preco * (porcentagem / 100));
    }


    vender(quantidade: number): void {
        this.estoque -= quantidade;

    }
}