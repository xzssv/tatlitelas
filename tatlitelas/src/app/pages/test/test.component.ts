import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    isLoggedIn = false;
    userEmail = '';
    email = '';
    password = '';
    testDocuments: any[] = [];
    selectedFile: File | null = null;
    uploadedFileUrl = '';

    constructor(
        private authService: AuthService,
        private firestoreService: FirestoreService,
        private storageService: StorageService
    ) { }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(user => {
            this.isLoggedIn = !!user;
            this.userEmail = user ? user.email : '';
        });
    }

    login() {
        this.authService.login(this.email, this.password)
            .then(() => console.log('Login successful'))
            .catch(error => console.error('Login failed:', error));
    }

    logout() {
        this.authService.logout()
            .then(() => console.log('Logout successful'))
            .catch(error => console.error('Logout failed:', error));
    }

    addTestDocument() {
        const testData = { message: 'Test document', timestamp: new Date() };
        this.firestoreService.addDocument('tests', testData)
            .then(() => console.log('Document added successfully'))
            .catch(error => console.error('Error adding document:', error));
    }

    getTestDocuments() {
        this.firestoreService.getCollection('tests')
            .then(docs => {
                this.testDocuments = docs;
                console.log('Documents retrieved successfully');
            })
            .catch(error => console.error('Error getting documents:', error));
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    uploadFile() {
        if (this.selectedFile) {
            this.storageService.uploadPhoto(this.selectedFile)
                .then(url => {
                    this.uploadedFileUrl = url;
                    console.log('File uploaded successfully');
                })
                .catch(error => console.error('Error uploading file:', error));
        }
    }
}