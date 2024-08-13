import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user.model';
import { Event } from '../models/event.model';
import { Participant } from '../models/participant.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private users: User[] = [];
    private currentUser: User | null = null;
    private currentEvent: Event | null = null;
    private currentParticipant: Participant | null = null;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        // Initialize with a sample event owner
        this.users.push({
            id: '1',
            name: 'Sample Owner',
            email: 'owner@example.com',
            password: 'password',
            isEventOwner: true
        });
    }

    private getLocalStorage(key: string): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(key);
        }
        return null;
    }

    private setLocalStorage(key: string, value: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, value);
        }
    }

    private removeLocalStorage(key: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(key);
        }
    }

    login(email: string, password: string): boolean {
        const user = this.users.find((u: User) => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            this.setLocalStorage('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    participantLogin(eventId: string): boolean {
        const event = this.getEventById(eventId);
        if (event) {
            this.currentEvent = event;
            this.setLocalStorage('currentEvent', JSON.stringify(event));
            return true;
        }
        return false;
    }

    getCurrentParticipant(): Participant | null {
        if (!this.currentParticipant) {
            const storedParticipant = this.getLocalStorage('currentParticipant');
            if (storedParticipant) {
                this.currentParticipant = JSON.parse(storedParticipant);
            }
        }
        return this.currentParticipant;
    }




    logout() {
        this.currentUser = null;
        this.currentEvent = null;
        this.removeLocalStorage('currentUser');
        this.removeLocalStorage('currentEvent');
    }

    isLoggedIn(): boolean {
        return this.getLocalStorage('currentUser') !== null || this.getLocalStorage('currentEvent') !== null;
    }

    isEventOwner(): boolean {
        const userString = this.getLocalStorage('currentUser');
        if (userString) {
            const user = JSON.parse(userString);
            return user.isEventOwner || false;
        }
        return false;
    }

    getCurrentUser(): User | null {
        if (!this.currentUser) {
            const storedUser = this.getLocalStorage('currentUser');
            if (storedUser) {
                this.currentUser = JSON.parse(storedUser);
            }
        }
        return this.currentUser;
    }

    getCurrentEvent(): Event | null {
        if (!this.currentEvent) {
            const storedEvent = this.getLocalStorage('currentEvent');
            if (storedEvent) {
                this.currentEvent = JSON.parse(storedEvent);
            }
        }
        return this.currentEvent;
    }

    saveEventSettings(settings: Partial<Event>) {
        if (this.isEventOwner()) {
            this.currentEvent = { ...this.currentEvent, ...settings } as Event;
            this.setLocalStorage('currentEvent', JSON.stringify(this.currentEvent));
        }
    }

    getEventSettings(): Event | null {
        return this.getCurrentEvent();
    }

    getEventById(eventId: string): Event | null {
        const storedEvent = this.getLocalStorage('currentEvent');
        if (storedEvent) {
            const event = JSON.parse(storedEvent);
            return event.eventId === eventId ? event : null;
        }
        return null;
    }
}