import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    if (typeof window !== 'undefined') {
      const savedPhotos = localStorage.getItem('photos');
      if (savedPhotos) {
        this.photos = JSON.parse(savedPhotos);
      }
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}