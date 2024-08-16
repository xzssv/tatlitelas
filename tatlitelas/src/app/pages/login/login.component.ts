import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,  // For common Angular directives
    FormsModule,   // For template-driven forms
    // Angular Material modules
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLogin = true;
  email = '';
  password = '';
  name = '';
  isEventOwner = false;
  loader = false;

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  async onSubmit() {
this.loader=true;

    if (this.isLogin) {
      try {
        await this.authService.login(this.email, this.password);
        this.router.navigate(['/home']);

      } catch (error) {
        console.error('Login error:', error);
        // Hata mesajını kullanıcıya göster
      } finally {
        this.loader = false;  // İşlem bittiğinde veya hata olduğunda false yapıyoruz
      }
      
    } else {
      try {
        await this.authService.register(this.email, this.password, this.name, this.isEventOwner);
        this.router.navigate(['/home']);  
      } catch (error) {
        console.error('Registration error:', error);
        // Hata mesajını kullanıcıya göster
      } finally {
        this.loader = false;  // İşlem bittiğinde veya hata olduğunda false yapıyoruz
      }
    }
    
  }
}