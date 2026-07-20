import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Internship } from '../../models/internship';
import { InternshipService } from '../../services/internship';


@Component({
  selector: 'app-create-internship',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-internship.html',
  styleUrl: './create-internship.css'
})
export class CreateInternship {

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

  constructor(
    private internshipService: InternshipService,
    private router: Router
  ) {}

  createInternship(): void {

    this.loading = true;

    this.errorMessage = '';

    this.internshipService
      .createInternship(this.internship)
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