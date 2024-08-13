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
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class GalleryComponent implements OnInit {
  photos: Photo[] = [];
  selectedPhoto: Photo | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    const savedPhotos = localStorage.getItem('photos');
    if (savedPhotos) {
      this.photos = JSON.parse(savedPhotos);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  openLightbox(photo: Photo) {
    this.selectedPhoto = photo;
  }

  closeLightbox() {
    this.selectedPhoto = null;
  }
}