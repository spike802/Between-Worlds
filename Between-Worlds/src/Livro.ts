import { Encadernacao } from "./Encardenaçao.ts";
import { Etaria } from "./etaria.ts";

//classe
export class Livro {
//campos/atributos
/* nome:string ;
descricao:string ;
preco:number ;
autores:string ;
dataPubli:string ;
paginas:number ;
conteudo:string ;
ismbm:string ; */
encadernacao: Encadernacao;
etaria:Etaria ;


constructor(encardenacao:Encadernacao ,etaria: Etaria){
    /* this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.autores =autores;
    this.dataPubli = dataPubli;
    this.paginas = paginas;
    this.conteudo = conteudo;
    this.ismbm = ismbm; */
    this.encadernacao = encardenacao; //linkar
    this.etaria = etaria; //linkar
    
    let book = new Livro(encardenacao, etaria)
}


}

