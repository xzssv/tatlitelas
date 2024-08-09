import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    /* Diğer stil tanımlamaları buraya... */
  `]
})
export class HomeComponent {
  title: string = 'Buse & Aydoğan';
  date: string = '28.09.24';

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      console.log("Dosya(lar) seçildi:", fileList);
      // Burada dosya yükleme işlemlerini gerçekleştirebilirsiniz
    }
  }

  openGallery() {
    console.log('Galeri açma işlevi çağrıldı');
    // Burada galeri açma mantığını uygulayabilirsiniz
  }
}