export class Cliente {
  cpf: string  ;
  nome: string;
  email:string;
  endereco:string;
  cep:string;

constructor(){
    this.cpf ="";
    this.nome ="";
    this.email ="";
    this.endereco ="";
    this.cep ="";
    
}


cadastrarCliente( cpf: string, nome: string, email:string, endereco:string,cep:string):void{  
this.cpf = cpf
this.nome = nome
this.email = email
this.endereco = endereco
this.cep = cep

}

}