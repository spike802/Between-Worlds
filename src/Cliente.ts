export class Cliente {
<<<<<<< HEAD
  private cpf: string  ;
  private nome: string;
  private email:string;
  private endereco:string;
  private cep:string;
=======
  cpf: string  ;
  nome: string;
  email:string;
  endereco:string;
  cep:string;
>>>>>>> 2e7f3fd44e4cf503b0f1b6b0f91b9ed71f97686e

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