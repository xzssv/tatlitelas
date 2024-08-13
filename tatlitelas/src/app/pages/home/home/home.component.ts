import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Photo {
  id: string;
  name: string;
  url: string;
  date: Date;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = 'Buse & Aydoğan';
  date: string = '28.09.24';

  photos: Photo[] = [];

  constructor(private router: Router) { }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  savePhotos() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('photos', JSON.stringify(this.photos));
    }
  }

  loadPhotos() {
    if (typeof window !== 'undefined') {
      const savedPhotos = localStorage.getItem('photos');
      if (savedPhotos) {
        this.photos = JSON.parse(savedPhotos);
      }
    }
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const newPhoto: Photo = {
            id: this.generateId(),
            name: file.name,
            url: e.target.result,
            date: new Date()
          };
          this.photos.push(newPhoto);
          this.savePhotos();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  ngOnInit() {
    this.loadPhotos();
  }

  openGallery() {
    this.router.navigate(['/gallery']);
  }
}