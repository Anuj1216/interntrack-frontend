import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Internship } from '../../models/internship';
import { InternshipService } from '../../services/internship';

@Component({
  selector: 'app-internship-details',
  standalone: true,
  imports: [],
  templateUrl: './internship-details.html',
  styleUrl: './internship-details.css'
})
export class InternshipDetails implements OnInit {

  internship: Internship | null = null;

  loading = true;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private internshipService: InternshipService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    console.log('Internship ID:', id);

    this.internshipService
      .getInternshipById(id)
      .subscribe({

        next: (data) => {

          console.log('Details received:', data);

          this.internship = data;

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading details:',
            error
          );

          this.errorMessage =
            'Unable to load internship details';

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

  goBack(): void {

    this.router.navigate(['/']);

  }

  applyNow(): void {

    if (!this.internship) {
      return;
    }

    this.router.navigate([
      '/apply',
      this.internship.id
    ]);

  }

}