import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firabase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  firebaseCodeError(code: string){
    switch(code){
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'Usuario já existe';
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'A senha deve conter no minimo 6 caracteres';
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Email invalido'
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Senha incorreta'
      case FirebaseCodeErrorEnum.UserNotFound:
      return 'Usuario não encontrado'  
        default:
        return 'Erro desconhecido'
    }
  }
}
