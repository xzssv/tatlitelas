import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery/gallery.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
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
        path: "admin",
        component: AdminComponent,
        canActivate: [AuthGuard]
    }
];