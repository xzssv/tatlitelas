import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Buse & Aydoğan';
  date = '28.09.24';
  eventId: string | null = null;

  constructor(
    private router: Router,
    private storage: Storage,
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.eventId = user.eventId || null;
      }
    });
  }

  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && this.eventId) {
      Array.from(fileList).forEach((file: File) => {
        this.uploadFile(file);
      });
    }
  }

  uploadFile(file: File) {
    if (!this.eventId) return;

    const filePath = `${this.eventId}/${new Date().getTime()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Upload progress can be tracked here
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.saveFileData(downloadURL, file.name);
        });
      }
    );
  }

  saveFileData(url: string, fileName: string) {
    addDoc(collection(this.firestore, 'photos'), {
      eventId: this.eventId,
      url: url,
      name: fileName,
      createdAt: new Date()
    });
  }

  goToGallery() {
    this.router.navigate(['/gallery']);
  }
}