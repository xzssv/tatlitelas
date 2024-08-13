import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // Burada gerçek kimlik doğrulama mantığınızı uygulayın
        const isAuthenticated = this.checkIfUserIsAuthenticated();

        if (isAuthenticated) {
            return true;
        } else {
            // Kullanıcı kimliği doğrulanmamışsa, giriş sayfasına yönlendir
            return this.router.createUrlTree(['/login']);
        }
    }

    private checkIfUserIsAuthenticated(): boolean {
        // Burada gerçek kimlik doğrulama kontrolünüzü yapın
        // Örneğin, bir token kontrolü veya oturum durumu kontrolü
        return false; // Şu an için her zaman false dönüyor, gerçek uygulamada değiştirin
    }
}