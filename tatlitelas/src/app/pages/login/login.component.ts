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
    <!-- Template kodunuz burada kalacak -->
  `,
  styles: [`
    /* Stil kodlarınız burada kalacak */
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