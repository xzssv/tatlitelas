export interface User {
    id: string;
    name: string;
    email: string;
    isEventOwner: boolean;
    eventId?: string; // Eventid eklendi
}