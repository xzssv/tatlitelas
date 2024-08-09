import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';

const routes: Routes = [
    {
        path: 'gallery',
        component: GalleryComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class GalleryModule { }