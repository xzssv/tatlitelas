import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(private firestore: Firestore) { }

    // Koleksiyona yeni bir döküman ekler
    addDocument(collectionName: string, data: any): Promise<any> {
        const collectionRef = collection(this.firestore, collectionName);
        return addDoc(collectionRef, data);
    }

    // Belirli bir dökümanı günceller
    updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
        const docRef = doc(this.firestore, collectionName, docId);
        return updateDoc(docRef, data);
    }

    // Belirli bir dökümanı siler
    deleteDocument(collectionName: string, docId: string): Promise<void> {
        const docRef = doc(this.firestore, collectionName, docId);
        return deleteDoc(docRef);
    }

    // Belirli bir dökümanı getirir
    getDocument(collectionName: string, docId: string): Promise<any> {
        const docRef = doc(this.firestore, collectionName, docId);
        return getDoc(docRef).then(doc => {
            if (doc.exists()) {
                return { id: doc.id, ...doc.data() };
            } else {
                return null;
            }
        });
    }

    // Bir koleksiyondaki tüm dökümanları getirir
    getCollection(collectionName: string): Promise<any[]> {
        const collectionRef = collection(this.firestore, collectionName);
        return getDocs(collectionRef).then(snapshot => {
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
    }
}