import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor(private storage: Storage) { }

    async uploadPhoto(file: File): Promise<string> {
        const storageRef = ref(this.storage, 'photos/' + file.name);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    }
}