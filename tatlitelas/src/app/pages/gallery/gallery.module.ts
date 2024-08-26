import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: GalleryComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        GalleryComponent  // Standalone bileşeni import ediyoruz, deklare etmiyoruz
    ]
})
export class GalleryModule { }