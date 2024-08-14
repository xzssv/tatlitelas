import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group" *ngIf="!isLogin">
          <label for="name">Name:</label>
          <input type="text" id="name" [(ngModel)]="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" [(ngModel)]="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required>
        </div>
        <div class="form-group" *ngIf="!isLogin">
          <label>
            <input type="checkbox" [(ngModel)]="isEventOwner" name="isEventOwner">
            Is Event Owner
          </label>
        </div>
        <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
      </form>
      <p>
        {{ isLogin ? 'Don\'t have an account?' : 'Already have an account?' }}
        <a href="#" (click)="toggleMode(); $event.preventDefault()">
          {{ isLogin ? 'Register' : 'Login' }}
        </a>
      </p>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 300px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    
    h2 {
      text-align: center;
      color: #333;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
    }
    
    input[type="text"],
    input[type="email"],
    input[type="password"] {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLogin = true;
  email = '';
  password = '';
  name = '';
  isEventOwner = false;

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  async onSubmit() {
    if (this.isLogin) {
      try {
        await this.authService.login(this.email, this.password);
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Login error:', error);
        // Hata mesajını kullanıcıya göster
      }
    } else {
      try {
        await this.authService.register(this.email, this.password, this.name, this.isEventOwner);
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Registration error:', error);
        // Hata mesajını kullanıcıya göster
      }
    }
  }
}