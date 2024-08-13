import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(private router: Router) { }

    onSubmit() {
        // Burada gerçek kimlik doğrulama mantığınızı uygulayın
        if (this.username === 'admin' && this.password === 'password') {
            // Başarılı giriş, ana sayfaya yönlendir
            this.router.navigate(['/']);
        } else {
            alert('Invalid credentials');
        }
    }
}