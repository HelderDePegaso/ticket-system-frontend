import { Component , inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthHttpClient } from '../../core/http/auth-httpclient/auth-httpclient';
import { LoginData } from '../../core/interface/login-data';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf , RouterLink ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit { 

  form!: FormGroup
  authHttp = inject(AuthHttpClient)
  fb = inject(FormBuilder)

  submitting = false;
  errorMessage: string | null = null;

  ngOnInit (): void {
    this.form = this.fb.group({
      name: ['' , [Validators.required , Validators.minLength(3)]]  ,
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, [Validators.requiredTrue]]  
    })

    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
      var options = {
        damping: '0.5'
      };
  
      (window as any).Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }
  }

   async onSubmit() {
    console.log("Submit")
    this.errorMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mostra erros nos campos
      return;
    }

    this.submitting = true;
    const { name, email, password } = this.form.value;

    try {
      const response = await this.authHttp.signup({ name, email, password } as LoginData);
      console.log('Usuário cadastrado com sucesso', response);
      // Redirecionar, limpar form ou mostrar mensagem
    } catch (error: any) {
      this.errorMessage = error?.message || 'Ocorreu um erro no cadastro';
      console.error(error);
    } finally {
      this.submitting = false;
    }
  }

}
