import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

interface Photo {
  id: string;
  name: string;
  url: string;
  date: Date;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class GalleryComponent implements OnInit {
  photos: Photo[] = [];
  selectedPhoto: Photo | null = null;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPhotos();
    }
  }

  loadPhotos() {
    const savedPhotos = localStorage.getItem('photos');
    if (savedPhotos) {
      this.photos = JSON.parse(savedPhotos);
    }
  }

  goBack() {
    this.router.navigate(['/home']);  // Değiştirildi: '/' yerine '/home'
  }

  openLightbox(photo: Photo) {
    this.selectedPhoto = photo;
  }

  closeLightbox() {
    this.selectedPhoto = null;
  }
}