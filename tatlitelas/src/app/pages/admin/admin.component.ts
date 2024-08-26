import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Event } from '../../models/event.model';

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

  userEvents: Event[] = [];
  currentEvent: Partial<Event> = this.initializeNewEvent();
  showBrideGroomNames: boolean = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserEvents();
  }

  loadUserEvents() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.firestoreService.getUserEvents(user.id).then(events => {
          this.userEvents = events;
        });
      }
    });
  }

  createNewEvent() {
    this.currentEvent = this.initializeNewEvent();
    this.showBrideGroomNames = false;
  }

  editEvent(event: Event) {
    this.currentEvent = { ...event };
    this.showBrideGroomNames = event.eventType === 'Düğün Etkinlikleri';
  }

  deleteEvent(event: Event) {
    if (confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) {
      this.firestoreService.deleteEvent(event.id).then(() => {
        this.loadUserEvents();
        alert('Etkinlik başarıyla silindi!');
      }).catch(error => {
        console.error('Etkinlik silinirken hata oluştu:', error);
        alert('Etkinlik silinirken bir hata oluştu. Lütfen tekrar deneyin.');
      });
    }
  }

  initializeNewEvent(): Partial<Event> {
    return {
      name: '',
      eventType: '',
      brideName: '',
      groomName: '',
      startDateTime: this.formatDateTimeForInput(new Date()),
      endDateTime: this.formatDateTimeForInput(new Date(Date.now() + 3600000)), // 1 hour later
      eventCode: this.generateNumericEventCode(),
      description: '',
      hideEventName: false,
      qrOnly: false
    };
  }

  onEventTypeChange() {
    this.showBrideGroomNames = this.currentEvent.eventType === 'Düğün Etkinlikleri';
  }

  generateEventCode() {
    this.currentEvent.eventCode = this.generateNumericEventCode();
  }

  generateNumericEventCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  saveEventSettings() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        const eventData: Event = {
          ...this.currentEvent as Event,
          ownerId: user.id
        };

        if (eventData.id) {
          // Update existing event
          this.firestoreService.updateEvent(eventData).then(() => {
            this.loadUserEvents();
            this.currentEvent = this.initializeNewEvent();
            alert('Etkinlik başarıyla güncellendi!');
          });
        } else {
          // Create new event
          this.firestoreService.createEvent(eventData).then(() => {
            this.loadUserEvents();
            this.currentEvent = this.initializeNewEvent();
            alert('Yeni etkinlik başarıyla oluşturuldu!');
          });
        }
      }
    });
  }

  cancel() {
    this.currentEvent = this.initializeNewEvent();
    this.showBrideGroomNames = false;
  }

  private formatDateTimeForInput(date: Date): string {
    return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
  }
}