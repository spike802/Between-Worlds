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
public get cpf(): string {
        return this._cpf;
    }
public get nome(): string {
        return this._nome;
    }
public get email(): string {
        return this._email;
    }
public get endereco(): string {
        return this._endereco;
    }
public get cep(): string {
        return this._cep;
    }

}