import { Component, inject } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthHttpClient } from '../../core/http/auth-httpclient/auth-httpclient';
import { LoginData } from '../../core/interface/login-data';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css'
})
export class SingInComponent { 
  form!: FormGroup;
  fb = inject(FormBuilder);
  authHttp = inject(AuthHttpClient);
  submitting = false;
  errorMessage: string | null = null;

  constructor(private router: Router) { }
  
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]], // TODO minLength deve ser 6
      rememberMe: [true]
    });
  }

  async onSubmit() {
    this.errorMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mostra erros nos campos
      return;
    }

    this.submitting = true;

    try {
      const { email, password } = this.form.value;
      const response = await this.authHttp.login({ logon: email, password } as LoginData);
      console.log('Login realizado com sucesso', response);
      // Redirecionar ou guardar token
      sessionStorage.setItem('token', (response.data as any).token); 
      this.router.navigate(['/main'])
    } catch (error: any) {
      console.error(error);
      this.errorMessage = error?.message || 'Erro no login';
    } finally {
      this.submitting = false;
    }
  }
}
