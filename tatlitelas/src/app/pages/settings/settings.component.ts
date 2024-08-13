import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../models/event.model';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">Event Settings</h2>
      <form (ngSubmit)="onSubmit()" #settingsForm="ngForm">
        <div class="mb-4">
          <label for="brideName" class="block mb-2">Bride's Name</label>
          <input type="text" id="brideName" name="brideName" [(ngModel)]="eventSettings.brideName" required class="w-full px-3 py-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="groomName" class="block mb-2">Groom's Name</label>
          <input type="text" id="groomName" name="groomName" [(ngModel)]="eventSettings.groomName" required class="w-full px-3 py-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="eventDate" class="block mb-2">Event Date</label>
          <input type="date" id="eventDate" name="eventDate" [(ngModel)]="eventSettings.eventDate" required class="w-full px-3 py-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="eventId" class="block mb-2">Event ID</label>
          <input type="text" id="eventId" name="eventId" [(ngModel)]="eventSettings.eventId" required class="w-full px-3 py-2 border rounded">
        </div>
        <button type="button" (click)="generateEventId()" class="bg-green-500 text-white px-4 py-2 rounded mr-2">Generate Event ID</button>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save Settings</button>
      </form>
    </div>
  `
})
export class SettingsComponent implements OnInit {
    eventSettings: Partial<Event> = {
        brideName: '',
        groomName: '',
        eventDate: '',
        eventId: ''
    };

    constructor(private authService: AuthService) { }

    ngOnInit() {
        const settings = this.authService.getEventSettings();
        if (settings) {
            this.eventSettings = { ...this.eventSettings, ...settings };
        }
    }

    generateEventId() {
        this.eventSettings.eventId = Math.floor(100000 + Math.random() * 900000).toString();
    }

    onSubmit() {
        this.authService.saveEventSettings(this.eventSettings);
        alert('Settings saved successfully!');
    }
}