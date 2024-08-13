import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto mt-8 p-4">
      <div class="max-w-4xl mx-auto bg-transparent rounded-lg shadow-md overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Etkinlik Sahibi Girişi -->
          <div class="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gray-200">
            <h2 class="text-2xl font-bold mb-6 text-center text-primary">Etkinlik Sahibi Girişi</h2>
            <form (ngSubmit)="onOwnerSubmit()" #ownerForm="ngForm">
              <div class="mb-4">
                <label for="email" class="block mb-2 text-secondary">Email</label>
                <input type="email" id="email" name="email" [(ngModel)]="email" required class="w-full px-3 py-2 border rounded text-primary bg-transparent">
              </div>
              <div class="mb-4">
                <label for="password" class="block mb-2 text-secondary">Şifre</label>
                <input type="password" id="password" name="password" [(ngModel)]="password" required class="w-full px-3 py-2 border rounded text-primary bg-transparent">
              </div>
              <button type="submit" class="w-full bg-custom-green text-white px-4 py-2 rounded hover:bg-custom-brown transition duration-300">
                Giriş Yap
              </button>
            </form>
          </div>

          <!-- Katılımcı Girişi -->
          <div class="w-full md:w-1/2 p-8">
            <h2 class="text-2xl font-bold mb-6 text-center text-primary">Katılımcı Girişi</h2>
            <form (ngSubmit)="onParticipantSubmit()" #participantForm="ngForm">
              <div class="mb-4">
                <label for="eventId" class="block mb-2 text-secondary">Etkinlik ID</label>
                <input type="text" id="eventId" name="eventId" [(ngModel)]="eventId" required class="w-full px-3 py-2 border rounded text-primary bg-transparent">
              </div>
              <button type="submit" class="w-full bg-custom-green text-white px-4 py-2 rounded hover:bg-custom-brown transition duration-300">
                Etkinliğe Katıl
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      background: linear-gradient(to bottom, #FFF8E7 0%, #FBE7E9 50%, #F8D5DA 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  eventId = '';

  constructor(private router: Router, private authService: AuthService) { }

  onOwnerSubmit() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/admin']);
    } else {
      alert('Geçersiz kimlik bilgileri');
    }
  }

  onParticipantSubmit() {
    if (this.authService.participantLogin(this.eventId)) {
      this.router.navigate(['/home']);
    } else {
      alert('Geçersiz etkinlik ID');
    }
  }
}