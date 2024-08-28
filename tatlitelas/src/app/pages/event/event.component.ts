import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Event } from '../../models/event.model';
import Swal from 'sweetalert2';
import Choices from 'choices.js';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit() {
    setTimeout(() => {
      const element = document.getElementById('choices-eventType');
      if (element) {
        new Choices(element as HTMLSelectElement, {
          searchEnabled: false,
          itemSelectText: '',
          shouldSort: false,
          classNames: {
            containerOuter: 'choices',
            containerInner: 'choices__inner',
            input: 'choices__input',
            inputCloned: 'choices__input--cloned',
            list: 'choices__list',
            listItems: 'choices__list--multiple',
            listSingle: 'choices__list--single',
            listDropdown: 'choices__list--dropdown',
            item: 'choices__item',
            itemSelectable: 'choices__item--selectable',
            itemDisabled: 'choices__item--disabled',
            itemChoice: 'choices__item--choice',
            placeholder: 'choices__placeholder',
            group: 'choices__group',
            groupHeading: 'choices__heading',
            button: 'choices__button',
            activeState: 'is-active',
            focusState: 'is-focused',
            openState: 'is-open',
            disabledState: 'is-disabled',
            highlightedState: 'is-highlighted',
            selectedState: 'is-selected',
            flippedState: 'is-flipped',
            loadingState: 'is-loading',
            noResults: 'has-no-results',
            noChoices: 'has-no-choices'
          } as any // Type assertion to avoid TypeScript errors
        });
      }
    }, 0);
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

    if (this.isEditing) {
      this.showConfirmationDialog();
    } else {
      this.performSaveOperation();
    }
  }

  showConfirmationDialog() {
    Swal.fire({
      title: 'Değişiklikleri kaydetmek istiyor musunuz?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Kaydet',
      denyButtonText: `Kaydetme`,
      cancelButtonText: 'İptal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.performSaveOperation();
      } else if (result.isDenied) {
        Swal.fire('Değişiklikler kaydedilmedi', '', 'info');
      }
    });
  }

  performSaveOperation() {
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
          this.showSuccessMessage();
          if (!this.isEditing) {
            this.createNewEvent();
          }
        }).catch(error => {
          console.error('Etkinlik kaydedilirken hata oluştu:', error);
          Swal.fire({
            icon: 'error',
            title: 'Hata!',
            text: 'Etkinlik kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.',
          });
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

  showSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Başarılı!',
      text: this.isEditing ? 'Etkinlik başarıyla güncellendi!' : 'Yeni etkinlik başarıyla oluşturuldu!',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'inline-block px-6 py-3 mb-0 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25'
      }
    });
  }

  private formatDateTimeForInput(date: Date): string {
    return date.toISOString().slice(0, 16);
  }
}