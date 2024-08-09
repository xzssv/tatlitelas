import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
      this.uploadFile(fileList);
    }
  }

  uploadFile(files: FileList) {
    console.log('Dosya yükleme işlevi çağrıldı', files);
  }

  openGallery() {
    console.log('Galeri açma işlevi çağrıldı');
  }
}