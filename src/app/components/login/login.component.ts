import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) { 
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  login(){
    const email = this.loginUsuario.value.email
    const senha = this.loginUsuario.value.senha
    console.log(email,senha)
    this.afAuth.signInWithEmailAndPassword(email,senha).then(
      (user)=> {
        if(user.user?.emailVerified){
          this.router.navigate(['/inicial'])
        }else {
          this.router.navigate(['/verificar-email'])
        }
        
        
      }
    ).catch(
      (error) => {
        this.toastr.error(this.firebaseError.firebaseCodeError(error.code), 'Erro:')
      }
    )
  }
}
