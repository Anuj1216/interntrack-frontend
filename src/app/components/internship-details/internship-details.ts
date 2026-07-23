import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Internship } from '../../models/internship';
import { InternshipService } from '../../services/internship';
import { ApplicationService } from '../../services/application';

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

  applying = false;

  applicationMessage = '';

  applicationError = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private internshipService: InternshipService,
    private applicationService: ApplicationService,
    private cdr: ChangeDetectorRef
  ) { }

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

  apply(): void {

    console.log("Apply Clicked!")

    const storedUser =
      localStorage.getItem('currentUser');

    if (!storedUser) {

      this.router.navigate(['/login']);

      return;

    }


    const user =
      JSON.parse(storedUser);

    const studentId =
      user.id;

    if (!this.internship?.id) {

      this.applicationError =
        'Unable to apply for this internship';

      return;

    }

    this.applying = true;

    this.applicationService
      .applyForInternship(
        this.internship.id,
        studentId
      )
      .subscribe({

        next: () => {

          this.applying = false;

          this.applicationMessage =
            'Application submitted successfully!';

          this.cdr.detectChanges();

        },

        error: (error) => {

          this.applying = false;

          this.applicationError =
            'You have already applied for this internship.';

          this.cdr.detectChanges();

        }

      });

  }

}