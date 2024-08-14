import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-example',
    template: `
    <ul>
      <li *ngFor="let item of items$ | async">
        {{ item.name }}
      </li>
    </ul>
  `
})
export class ExampleComponent {
    items$: Observable<any[]>;

    constructor(firestore: Firestore) {
        const itemsCollection = collection(firestore, 'items');
        this.items$ = collectionData(itemsCollection);
    }
}