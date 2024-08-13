import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Event } from '../models/event.model';
import { Participant } from '../models/participant.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private users: User[] = [
        { id: '1', name: 'Event Owner', email: 'owner@example.com', password: 'password', isEventOwner: true },
        { id: '2', name: 'Participant', email: 'participant@example.com', password: 'password', isEventOwner: false }
    ];
    private events: Event[] = [];
    private participants: Participant[] = [];
    private currentUser: User | null = null;

    constructor() {
        // Initialize with a sample event
        this.events.push({
            id: 'event1',
            name: 'Sample Event',
            date: new Date(),
            ownerId: '1'
        });
    }

    login(email: string, password: string): boolean {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    participantLogin(name: string, surname: string, eventId: string): boolean {
        const event = this.events.find(e => e.id === eventId);
        if (event) {
            const participant: Participant = {
                id: Date.now().toString(),
                name,
                surname,
                eventId
            };
            this.participants.push(participant);
            localStorage.setItem('currentParticipant', JSON.stringify(participant));
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentParticipant');
    }

    isLoggedIn(): boolean {
        return this.currentUser !== null || localStorage.getItem('currentParticipant') !== null;
    }

    isEventOwner(): boolean {
        return this.currentUser?.isEventOwner || false;
    }

    getCurrentUser(): User | null {
        if (!this.currentUser) {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                this.currentUser = JSON.parse(storedUser);
            }
        }
        return this.currentUser;
    }

    getCurrentParticipant(): Participant | null {
        const storedParticipant = localStorage.getItem('currentParticipant');
        return storedParticipant ? JSON.parse(storedParticipant) : null;
    }

    createEvent(event: Event): void {
        this.events.push(event);
    }

    getEventById(eventId: string): Event | undefined {
        return this.events.find(e => e.id === eventId);
    }
}