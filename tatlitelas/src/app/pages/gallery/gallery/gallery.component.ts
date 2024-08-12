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

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    // Fotoğrafları yükleme mantığınızı burada uygulayın
  }

  goBack() {
    this.router.navigate(['/']);
  }
}