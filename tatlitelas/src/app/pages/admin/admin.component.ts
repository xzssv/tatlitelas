import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Event as CustomEvent } from '../../models/event.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  eventSettings: Partial<CustomEvent> = {
    brideName: '',
    groomName: '',
    eventDate: '',
    eventId: ''
  };

  selectedFiles: FileList | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const settings = this.authService.getEventSettings();
    if (settings) {
      this.eventSettings = { ...this.eventSettings, ...settings };
    }
  }

  generateEventId() {
    this.eventSettings.eventId = Math.floor(100000 + Math.random() * 900000).toString();
  }

  saveEventSettings() {
    this.authService.saveEventSettings(this.eventSettings);
    alert('Ayarlar başarıyla kaydedildi!');
  }

  goToGallery() {
    this.router.navigate(['/gallery']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.selectedFiles = element.files;
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.uploadPhotos();
    }
  }

  uploadPhotos() {
    if (this.selectedFiles) {
      // Fotoğraf yükleme mantığını burada uygulayın
      console.log('Fotoğraflar yükleniyor:', this.selectedFiles);
      alert('Fotoğraflar başarıyla yüklendi!');
    } else {
      alert('Lütfen yüklemek için fotoğraf seçin.');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}