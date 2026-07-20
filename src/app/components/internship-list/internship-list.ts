import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { Internship } from '../../models/internship';
import { InternshipService } from '../../services/internship';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-internship-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './internship-list.html',
  styleUrl: './internship-list.css',
})
export class InternshipList implements OnInit {

  internships: Internship[] = [];

  loading = true;

  errorMessage = '';

  constructor(
    private internshipService: InternshipService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('InternshipList initialized');

    this.internshipService
      .getInternships()
      .subscribe({

        next: (data) => {

          console.log('API data:', data);

          this.internships = data;

          this.loading = false;

          this.cdr.detectChanges();

          console.log(
            'Internships:',
            this.internships.length
          );

        },

        error: (error) => {

          console.error('API error:', error);

          this.errorMessage =
            'Unable to load internships';

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

}