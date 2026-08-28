export class Cliente {
  cpf: Number  ;
  nome: string;
  email:string;
  endereço:string;
  cep:Number;
constructor( cpf: Number, nome: string, email:string, endereço:string,cep:Number){
    this.cpf =cpf;
    this.nome =nome;
    this.email =email;
    this.endereço =endereço;
    this.cep =cep;
    
}}