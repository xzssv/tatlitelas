import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery/gallery.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },

    {
        path: "gallery",
        component: GalleryComponent
    }
];
