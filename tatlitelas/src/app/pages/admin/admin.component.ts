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
  currentStep: number = 0;
  isSubmitting: boolean = false;
  isEditing: boolean = false;

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
    this.currentStep = 0;
    this.isEditing = false;
  }

  editEvent(event: Event) {
    this.currentEvent = { ...event };
    this.showBrideGroomNames = event.eventType === 'Düğün Etkinlikleri';
    this.currentStep = 0;
    this.isEditing = true;
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
      endDateTime: this.formatDateTimeForInput(new Date(Date.now() + 3600000)),
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
    if (!this.isEditing) {
      this.currentEvent.eventCode = this.generateNumericEventCode();
    }
  }

  generateNumericEventCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  saveEventSettings() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        const eventData: Event = {
          ...this.currentEvent as Event,
          ownerId: user.id
        };

        const saveOperation = this.isEditing
          ? this.firestoreService.updateEvent(eventData)
          : this.firestoreService.createEvent(eventData);

        saveOperation.then(() => {
          this.loadUserEvents();
          this.isSubmitting = false;
          alert(this.isEditing ? 'Etkinlik başarıyla güncellendi!' : 'Yeni etkinlik başarıyla oluşturuldu!');
          if (!this.isEditing) {
            this.createNewEvent(); // Reset form after creating new event
          }
        }).catch(error => {
          console.error('Etkinlik kaydedilirken hata oluştu:', error);
          alert('Etkinlik kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
          this.isSubmitting = false;
        });
      }
    });
  }

  setStep(step: number) {
    this.currentStep = step;
  }

  getQRCodeUrl(): string {
    const eventCode = this.currentEvent.eventCode || '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${eventCode}`;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  private formatDateTimeForInput(date: Date): string {
    return date.toISOString().slice(0, 16);
  }
}