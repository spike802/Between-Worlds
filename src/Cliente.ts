export class Cliente {
  private _cpf: string  ;
  private _nome: string;
  private _email:string;
  private _endereco:string;
  private _cep:string;

constructor(){
    this._cpf ="";
    this._nome ="";
    this._email ="";
    this._endereco ="";
    this._cep ="";
    
}


cadastrarCliente( cpf: string, nome: string, email:string, endereco:string,cep:string):void{  
this._cpf = cpf
this._nome = nome
this._email = email
this._endereco = endereco
this._cep = cep

}

}