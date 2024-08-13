import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../models/event.model';

@Component({
    selector: 'app-create-event',
    standalone: true,
    imports: [FormsModule],
    template: `
    <div class="container mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">Create New Event</h2>
      <form (ngSubmit)="onSubmit()" #eventForm="ngForm">
        <div class="mb-4">
          <label for="name" class="block mb-2">Event Name</label>
          <input type="text" id="name" name="name" [(ngModel)]="event.name" required class="w-full px-3 py-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="date" class="block mb-2">Event Date</label>
          <input type="date" id="date" name="date" [(ngModel)]="event.date" required class="w-full px-3 py-2 border rounded">
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Create Event</button>
      </form>
    </div>
  `,
    styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
    event: Event = {
        id: '',
        name: '',
        date: new Date(),
        ownerId: ''
    };

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            this.event.id = Date.now().toString();
            this.event.ownerId = currentUser.id;
            this.authService.createEvent(this.event);
            this.router.navigate(['/']);
        }
    }
}