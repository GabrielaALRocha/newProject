import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrar: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
    ) {
    this.registrar = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      repetirSenha: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  cadastrar(){
    const email = this.registrar.value.email;
    const senha = this.registrar.value.senha;
    const repetirSenha = this.registrar.value.repetirSenha;
    
    if(senha !== repetirSenha){
      this.toastr.error('as senhas não são iguais', 'Erro: ')
      return;
    }else
    this.afAuth.createUserWithEmailAndPassword(email,senha).then(
      () => {
/*         this.toastr.success('Um email foi enviado para confimação','Cadastrado')
        this.router.navigate(['/login']) */
        this.verificarEmail();
      }
    ).catch(
      (error) => {
        this.toastr.error(this.firebaseError.firebaseCodeError(error.code), 'Erro:')
      }
    )
  }

  verificarEmail(){
    this.afAuth.currentUser.then(
      (user) => {
        user?.sendEmailVerification().then(
          () =>{
            this.toastr.info('Um email foi enviado para confimação','Cadastrado')
        this.router.navigate(['/login']) 
          }
        )
      }
    )
  }
}
