import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Event as CustomEvent } from '../../models/event.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  eventTypes = [
    'Düğün Etkinlikleri',
    'Doğum Günü',
    'Lansman',
    'Festival',
    'Fuar',
    'Kurumsal Etkinlikler'
  ];

  eventSettings: Partial<CustomEvent> & {
    description?: string,
    startDate?: string,
    endDate?: string,
    eventType?: string
  } = {
      id: '',
      name: '',
      date: new Date(),
      ownerId: '',
      brideName: '',
      groomName: '',
      eventDate: '',
      eventId: '',
      description: '',
      startDate: this.formatDateForInput(new Date()),
      endDate: this.formatDateForInput(new Date()),
      eventType: ''
    };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadEventSettings();
  }

  loadEventSettings() {
    this.authService.getEventSettings().then(settings => {
      if (settings) {
        this.eventSettings = { ...this.eventSettings, ...settings };
        if (settings.date) {
          this.eventSettings.startDate = this.formatDateForInput(new Date(settings.date));
          this.eventSettings.endDate = this.formatDateForInput(new Date(settings.date));
        }
      }
    });
  }

  generateEventId() {
    this.eventSettings.eventId = Math.floor(100000 + Math.random() * 900000).toString();
  }

  saveEventSettings() {
    // Combine start and end dates into a single date range string
    this.eventSettings.eventDate = `${this.eventSettings.startDate} - ${this.eventSettings.endDate}`;

    this.authService.saveEventSettings(this.eventSettings).then(() => {
      alert('Ayarlar başarıyla kaydedildi!');
    }).catch(error => {
      console.error('Ayarlar kaydedilirken hata oluştu:', error);
      alert('Ayarlar kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}