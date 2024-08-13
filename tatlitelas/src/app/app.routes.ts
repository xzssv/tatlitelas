import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery/gallery.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard'; // Make sure this path is correct

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "gallery",
        component: GalleryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "login",
        component: LoginComponent
    }
];