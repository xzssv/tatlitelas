import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Event } from '../models/event.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private currentEventSubject: BehaviorSubject<Event | null> = new BehaviorSubject<Event | null>(null);

    constructor(
        private auth: Auth,
        private firestore: Firestore
    ) {
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

    async login(email: string, password: string): Promise<boolean> {
        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    async register(email: string, password: string, name: string, isEventOwner: boolean): Promise<boolean> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user: User = {
                id: userCredential.user.uid,
                name,
                email,
                isEventOwner
            };
            await setDoc(doc(this.firestore, 'users', user.id), user);
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    }

    async logout() {
        try {
            await signOut(this.auth);
            this.currentEventSubject.next(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    getCurrentUser(): Observable<User | null> {
        return this.currentUserSubject.asObservable();
    }

    getCurrentEvent(): Observable<Event | null> {
        return this.currentEventSubject.asObservable();
    }

    isLoggedIn(): boolean {
        return this.auth.currentUser !== null;
    }

    isEventOwner(): boolean {
        const user = this.currentUserSubject.value;
        return user ? user.isEventOwner : false;
    }

    async saveEventSettings(settings: Partial<Event>) {
        if (this.isEventOwner()) {
            const user = this.currentUserSubject.value;
            if (user && settings.id) {
                const eventRef = doc(this.firestore, 'events', settings.id);
                await setDoc(eventRef, settings, { merge: true });
                const updatedEvent = await getDoc(eventRef);
                this.currentEventSubject.next(updatedEvent.data() as Event);
            }
        }
    }

    getEventSettings(): Event | null {
        return this.currentEventSubject.value;
    }

    async getEventById(eventId: string): Promise<Event | null> {
        const eventDoc = await getDoc(doc(this.firestore, 'events', eventId));
        if (eventDoc.exists()) {
            return eventDoc.data() as Event;
        }
        return null;
    }

    async participantLogin(eventId: string): Promise<boolean> {
        try {
            const event = await this.getEventById(eventId);
            if (event) {
                this.currentEventSubject.next(event);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Participant login error:', error);
            return false;
        }
    }







}

