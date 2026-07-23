import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  Internship
} from '../../models/internship';

import {
  InternshipService
} from '../../services/internship';


@Component({
  selector: 'app-create-internship',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-internship.html',
  styleUrl: './create-internship.css'
})
export class CreateInternship
  implements OnInit {

  internship: Internship = {

    title: '',
    company: '',
    location: '',
    description: '',
    skills: '',
    stipend: ''

  };

  loading = false;

  errorMessage = '';

  currentUser: any = null;

  constructor(
    private internshipService: InternshipService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const storedUser =
      localStorage.getItem(
        'currentUser'
      );

    if (!storedUser) {

      this.router.navigate([
        '/login'
      ]);

      return;

    }

    this.currentUser =
      JSON.parse(
        storedUser
      );

    if (
      this.currentUser.role
        .toUpperCase()
        !== 'EMPLOYER'
    ) {

      this.router.navigate([
        '/'
      ]);

      return;

    }

  }

  createInternship(): void {

    if (!this.currentUser) {

      this.errorMessage =
        'You must be logged in as an employer.';

      return;

    }

    this.loading = true;

    this.errorMessage = '';

    this.internshipService
      .createInternship(
        this.currentUser.id,
        this.internship
      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate([
            '/employer-dashboard'
          ]);

        },

        error: (error) => {

          this.loading = false;

          console.error(
            'Error creating internship:',
            error
          );

          this.errorMessage =
            'Unable to create internship';

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/employer-dashboard'
    ]);

  }

}