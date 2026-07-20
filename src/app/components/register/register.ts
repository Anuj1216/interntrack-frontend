import { Component } from '@angular/core';
import {
  FormsModule
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  AuthService,
  User
} from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';

  email = '';

  password = '';

  role = '';

  errorMessage = '';

  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    const user: User = {

      name: this.name,

      email: this.email,

      password: this.password,

      role: this.role.toUpperCase()

    };

    this.authService
      .register(user)
      .subscribe({

        next: () => {

          this.successMessage =
            'Registration successful!';

          this.errorMessage = '';

          setTimeout(() => {

            this.router.navigate([
              '/login'
            ]);

          }, 1000);

        },

        error: (error) => {

          this.errorMessage =
            error.error ||
            'Registration failed';

          this.successMessage = '';

        }

      });

  }

}