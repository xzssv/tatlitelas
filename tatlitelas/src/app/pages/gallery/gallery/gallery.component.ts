import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, orderBy, collectionData, deleteDoc, doc, DocumentData } from '@angular/fire/firestore';
import { AuthService } from '../../../services/auth.service';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage, ref, deleteObject } from '@angular/fire/storage';

interface Photo {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  selected?: boolean;
  eventId: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class GalleryComponent implements OnInit, OnDestroy {
  photos$: Observable<Photo[]>;
  selectedPhotos: Photo[] = [];
  eventId: string | null = null;
  private photosSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private storage: Storage,
    private authService: AuthService
  ) {
    this.photos$ = new Observable<Photo[]>();
  }

  ngOnInit() {
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

  ngOnDestroy() {
    if (this.photosSubscription) {
      this.photosSubscription.unsubscribe();
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
      map((actions: DocumentData[]) => {
        console.log('Fetched photos:', actions);
        return actions.map((photo: DocumentData) => ({
          id: photo['id'] as string,
          name: photo['name'] as string,
          url: photo['url'] as string,
          createdAt: (photo['createdAt'] as unknown as { toDate: () => Date }).toDate(),
          eventId: photo['eventId'] as string,
          selected: false
        } as Photo));
      })
    );

    this.photosSubscription = this.photos$.subscribe(
      photos => {
        console.log('Number of photos loaded:', photos.length);
        this.updateSelectedPhotos();
      },
      error => console.error('Error fetching photos:', error)
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  selectAllPhotos() {
    this.photos$ = this.photos$.pipe(
      map(photos => photos.map(photo => ({ ...photo, selected: true })))
    );
    this.updateSelectedPhotos();
  }

  deselectAllPhotos() {
    this.photos$ = this.photos$.pipe(
      map(photos => photos.map(photo => ({ ...photo, selected: false })))
    );
    this.updateSelectedPhotos();
  }

  togglePhotoSelection(photo: Photo) {
    photo.selected = !photo.selected;
    this.updateSelectedPhotos();
  }

  updateSelectedPhotos() {
    this.photos$.pipe(
      map(photos => photos.filter(photo => photo.selected))
    ).subscribe(selectedPhotos => {
      this.selectedPhotos = selectedPhotos;
      console.log('Selected photos:', this.selectedPhotos.length);
    });
  }

  async deleteSelectedPhotos() {
    console.log('Deleting selected photos:', this.selectedPhotos.length);
    for (const photo of this.selectedPhotos) {
      await this.deletePhoto(photo);
    }
    this.loadPhotos();
  }

  async deleteAllPhotos() {
    try {
      const photos = await firstValueFrom(this.photos$);
      if (photos) {
        for (const photo of photos) {
          await this.deletePhoto(photo);
        }
      }
      this.loadPhotos();
    } catch (error) {
      console.error('Error deleting all photos:', error);
    }
  }

  private async deletePhoto(photo: Photo) {
    try {
      // Delete from Firestore
      await deleteDoc(doc(this.firestore, 'photos', photo.id));

      // Delete from Storage
      const storageRef = ref(this.storage, photo.url);
      await deleteObject(storageRef);

      console.log('Photo deleted successfully:', photo.id);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  }

  downloadSelectedPhotos() {
    this.selectedPhotos.forEach(photo => {
      const link = document.createElement('a');
      link.href = photo.url;
      link.download = photo.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}