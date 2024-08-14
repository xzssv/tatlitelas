import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private readonly isBrowser: boolean;

    constructor(
        private auth: Auth,
        private firestore: Firestore,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.initAuthListener();
        }
    }

    private initAuthListener() {
        onAuthStateChanged(this.auth, (firebaseUser) => {
            if (firebaseUser) {
                this.getUserData(firebaseUser.uid).then(userData => {
                    this.currentUserSubject.next(userData);
                });
            } else {
                this.currentUserSubject.next(null);
            }
        });
    }

    private async getUserData(userId: string): Promise<User | null> {
        const userDoc = await getDoc(doc(this.firestore, 'users', userId));
        if (userDoc.exists()) {
            return userDoc.data() as User;
        }
        return null;
    }

    async login(email: string, password: string): Promise<void> {
        if (this.isBrowser) {
            await signInWithEmailAndPassword(this.auth, email, password);
        }
    }

    async register(email: string, password: string, name: string, isEventOwner: boolean): Promise<void> {
        if (this.isBrowser) {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user: User = {
                id: userCredential.user.uid,
                name,
                email,
                isEventOwner
            };
            await setDoc(doc(this.firestore, 'users', user.id), user);
        }
    }

    async logout(): Promise<void> {
        if (this.isBrowser) {
            await signOut(this.auth);
        }
    }

    getCurrentUser(): Observable<User | null> {
        return this.currentUserSubject.asObservable();
    }

    isLoggedIn(): boolean {
        return this.auth.currentUser !== null;
    }

    isEventOwner(): boolean {
        const user = this.currentUserSubject.value;
        return user ? user.isEventOwner : false;
    }

    async getEventSettings(): Promise<any> {
        const user = this.currentUserSubject.value;
        if (user && user.isEventOwner) {
            const eventDoc = await getDoc(doc(this.firestore, 'events', user.id));
            if (eventDoc.exists()) {
                return eventDoc.data();
            }
        }
        return null;
    }

    async saveEventSettings(settings: any): Promise<void> {
        const user = this.currentUserSubject.value;
        if (user && user.isEventOwner) {
            await updateDoc(doc(this.firestore, 'events', user.id), settings);
        }
    }
}