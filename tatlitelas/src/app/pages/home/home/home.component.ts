import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen h-full p-8 max-w-4xl mx-auto">
      <h1 class="text-center text-5xl font-dancing text-primary mb-2">{{ title }}</h1>
      <p class="text-center text-3xl font-great-vibes text-secondary mb-8">{{ date }}</p>
      <div class="w-full max-w-md flex items-center justify-center gap-4 mb-8">
        <button (click)="triggerFileInput()" class="btnc animate-bounce w-36 bg-green-500 text-white py-3 px-6 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          Yükle
        </button>
      </div>
      <input type="file" id="fileInput" (change)="onFileSelected($event)" style="display: none;" multiple accept="image/*">
    </div>
    <button (click)="goToGallery()" class="fixed-gallery-btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
      <span class="gallery-text">Galeri</span>
    </button>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Buse & Aydoğan';
  date = '28.09.24';

  constructor(private router: Router) { }

  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      // Dosya yükleme işlemlerini burada gerçekleştirin
      console.log('Seçilen dosyalar:', fileList);
    }
  }

  goToGallery() {
    this.router.navigate(['/gallery']);
  }
}