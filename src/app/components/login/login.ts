import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  AuthService,
  User
} from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';

  password: string = '';

  errorMessage: string = '';

  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.loading = true;

    this.errorMessage = '';

    this.authService
      .login(
        this.email,
        this.password
      )
      .subscribe({

        next: (user: User) => {

          this.loading = false;

          localStorage.setItem(
            'currentUser',
            JSON.stringify(user)
          );

          if (
            user.role.toUpperCase()
            === 'STUDENT'
          ) {

            this.router.navigate([
              '/dashboard'
            ]);

          } else if (
            user.role.toUpperCase()
            === 'EMPLOYER'
          ) {

            this.router.navigate([
              '/employer-dashboard'
            ]);

          }

        },

        error: (error) => {

          this.loading = false;

          this.errorMessage =
            error.error ||
            'Invalid email or password';

        }

      });

  }

}