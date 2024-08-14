import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';

@Component({
    selector: 'app-example',
    template: `
    <div *ngFor="let item of items">
      {{ item.name }}
    </div>
  `
})
export class ExampleComponent {
    items: any[] = [];

    constructor(private firestoreService: FirestoreService) {
        this.loadItems();
    }

    async loadItems() {
        this.items = await this.firestoreService.getCollection('items');
    }

    async addItem(item: any) {
        await this.firestoreService.addDocument('items', item);
        this.loadItems(); // Listeyi yenile
    }
}