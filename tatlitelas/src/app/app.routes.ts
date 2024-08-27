import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { LoginComponent } from './pages/login/login.component';
import { EventComponent } from './pages/event/event.component';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [LoginGuard] // Yeni eklenen guard
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "gallery",
        component: GalleryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "event",
        component: EventComponent,
        canActivate: [AuthGuard]
    }
];