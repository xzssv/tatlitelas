import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    constructor(private auth: Auth, private firestore: Firestore) {
        this.initAuthListener();
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
        await signInWithEmailAndPassword(this.auth, email, password);
    }

    async register(email: string, password: string, name: string, isEventOwner: boolean): Promise<void> {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user: User = {
            id: userCredential.user.uid,
            name,
            email,
            isEventOwner
        };
        await setDoc(doc(this.firestore, 'users', user.id), user);
    }

    async logout(): Promise<void> {
        await signOut(this.auth);
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
}