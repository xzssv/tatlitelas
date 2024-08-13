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
    <div class="container mx-auto mt-8">
      <div class="max-w-md mx-auto">
        <h2 class="text-2xl font-bold mb-4">Login</h2>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div *ngIf="isEventOwner" class="mb-4">
            <label for="email" class="block mb-2">Email</label>
            <input type="email" id="email" name="email" [(ngModel)]="email" required class="w-full px-3 py-2 border rounded">
          </div>
          <div *ngIf="isEventOwner" class="mb-4">
            <label for="password" class="block mb-2">Password</label>
            <input type="password" id="password" name="password" [(ngModel)]="password" required class="w-full px-3 py-2 border rounded">
          </div>
          <div *ngIf="!isEventOwner" class="mb-4">
            <label for="name" class="block mb-2">Name</label>
            <input type="text" id="name" name="name" [(ngModel)]="name" required class="w-full px-3 py-2 border rounded">
          </div>
          <div *ngIf="!isEventOwner" class="mb-4">
            <label for="surname" class="block mb-2">Surname</label>
            <input type="text" id="surname" name="surname" [(ngModel)]="surname" required class="w-full px-3 py-2 border rounded">
          </div>
          <div *ngIf="!isEventOwner" class="mb-4">
            <label for="eventId" class="block mb-2">Event ID</label>
            <input type="text" id="eventId" name="eventId" [(ngModel)]="eventId" required class="w-full px-3 py-2 border rounded">
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </form>
        <button (click)="toggleUserType()" class="mt-4 text-blue-500">
          {{ isEventOwner ? 'Switch to Participant Login' : 'Switch to Event Owner Login' }}
        </button>
      </div>
    </div>
  `
})
export class LoginComponent {
    isEventOwner = true;
    email = '';
    password = '';
    name = '';
    surname = '';
    eventId = '';

    constructor(private router: Router, private authService: AuthService) { }

    onSubmit() {
        if (this.isEventOwner) {
            if (this.authService.login(this.email, this.password)) {
                this.router.navigate(['/']);
            } else {
                alert('Invalid credentials');
            }
        } else {
            if (this.authService.participantLogin(this.name, this.surname, this.eventId)) {
                this.router.navigate(['/gallery']);
            } else {
                alert('Invalid event ID');
            }
        }
    }

    toggleUserType() {
        this.isEventOwner = !this.isEventOwner;
    }
}