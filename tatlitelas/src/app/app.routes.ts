import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery/gallery.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './services/auth.guard';
import { TestComponent } from './pages/test/test.component';
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
        path: "admin",
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    { path: 'test', component: TestComponent }
];