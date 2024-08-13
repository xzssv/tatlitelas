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
    template: `
    <div class="container mx-auto mt-8 p-4">
      <h1 class="text-3xl font-bold mb-6">Yönetim Paneli</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-transparent p-6 rounded-lg shadow">
          <h2 class="text-2xl font-bold mb-4">Etkinlik Ayarları</h2>
          <form (ngSubmit)="saveEventSettings()" #settingsForm="ngForm">
            <div class="mb-4">
              <label for="brideName" class="block mb-2">Gelin Adı</label>
              <input type="text" id="brideName" name="brideName" [(ngModel)]="eventSettings.brideName" required class="w-full px-3 py-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="groomName" class="block mb-2">Damat Adı</label>
              <input type="text" id="groomName" name="groomName" [(ngModel)]="eventSettings.groomName" required class="w-full px-3 py-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="eventDate" class="block mb-2">Etkinlik Tarihi</label>
              <input type="date" id="eventDate" name="eventDate" [(ngModel)]="eventSettings.eventDate" required class="w-full px-3 py-2 border rounded">
            </div>
            <div class="mb-4">
              <label for="eventId" class="block mb-2">Etkinlik ID</label>
              <input type="text" id="eventId" name="eventId" [(ngModel)]="eventSettings.eventId" required class="w-full px-3 py-2 border rounded">
            </div>
            <button type="button" (click)="generateEventId()" class="bg-green-500 text-white px-4 py-2 rounded mr-2">Etkinlik ID Oluştur</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ayarları Kaydet</button>
          </form>
        </div>
        
        <div class="bg-transparent p-6 rounded-lg shadow">
          <h2 class="text-2xl font-bold mb-4">Kısayollar</h2>
          <div class="grid grid-cols-2 gap-4">
            <button (click)="goToHome()" class="bg-green-500 text-white p-2 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Anasayfa
            </button>
            <button (click)="goToGallery()" class="bg-blue-500 text-white p-2 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              Galeri
            </button>
            <label for="fileInput" class="cursor-pointer bg-yellow-500 text-white p-2 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Yükle
            </label>
            <input type="file" id="fileInput" (change)="onFileSelected($event)" multiple accept="image/*" class="hidden">
            <button (click)="logout()" class="bg-red-500 text-white p-2 rounded flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  `
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