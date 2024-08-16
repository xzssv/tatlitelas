import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, orderBy, collectionData } from '@angular/fire/firestore';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Photo {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class GalleryComponent implements OnInit {
  photos$: Observable<Photo[]>;
  selectedPhoto: Photo | null = null;
  eventId: string | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private firestore: Firestore,
    private authService: AuthService
  ) {
    this.photos$ = new Observable<Photo[]>();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.getCurrentUser().subscribe(user => {
        console.log('Current user:', user);
        if (user) {
          this.eventId = user.eventId || null;
          console.log('Current user eventId:', this.eventId);
          this.loadPhotos();
        } else {
          console.log('No user logged in');
          this.router.navigate(['/login']);
        }
      });
    }
  }

  loadPhotos() {
    console.log('Loading photos for eventId:', this.eventId);
    const photosRef = collection(this.firestore, 'photos');
    let q;
    if (this.eventId) {
      q = query(photosRef,
        where('eventId', '==', this.eventId),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(photosRef, orderBy('createdAt', 'desc'));
    }

    this.photos$ = collectionData(q, { idField: 'id' }).pipe(
      map(actions => {
        console.log('Fetched photos:', actions);
        return actions as Photo[];
      })
    );

    this.photos$.subscribe(
      photos => console.log('Number of photos loaded:', photos.length),
      error => console.error('Error fetching photos:', error)
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  openLightbox(photo: Photo) {
    this.selectedPhoto = photo;
  }

  closeLightbox() {
    this.selectedPhoto = null;
  }
}