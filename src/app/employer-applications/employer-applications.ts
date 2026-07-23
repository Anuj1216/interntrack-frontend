import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  ApplicationService
} from '../services/application';

@Component({
  selector: 'app-employer-applications',
  standalone: true,
  imports: [],
  templateUrl: './employer-applications.html',
  styleUrl: './employer-applications.css'
})
export class EmployerApplications
  implements OnInit {

  currentUser: any = null;

  applications: any[] = [];

  loading = true;

  errorMessage = '';

  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private cdr: ChangeDetectorRef
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

    this.loadApplications();

  }

  loadApplications(): void {

    this.loading = true;

    this.applicationService
      .getApplicationsByEmployer(
        this.currentUser.id
      )
      .subscribe({

        next: (
          data: any[]
        ) => {

          this.applications =
            data;

          this.loading =
            false;

          this.cdr.detectChanges();

        },

        error: (
          error: any
        ) => {

          console.error(
            'Error loading applications:',
            error
          );

          this.errorMessage =
            'Unable to load applications';

          this.loading =
            false;

          this.cdr.detectChanges();

        }

      });

  }

  approveApplication(
    id: number
  ): void {

    this.applicationService
      .updateStatus(
        id,
        'APPROVED'
      )
      .subscribe({

        next: () => {

          this.loadApplications();

        },

        error: (
          error: any
        ) => {

          console.error(
            'Error approving application:',
            error
          );

        }

      });

  }

  rejectApplication(
    id: number
  ): void {

    this.applicationService
      .updateStatus(
        id,
        'REJECTED'
      )
      .subscribe({

        next: () => {

          this.loadApplications();

        },

        error: (
          error: any
        ) => {

          console.error(
            'Error rejecting application:',
            error
          );

        }

      });

  }

  goBack(): void {

    this.router.navigate([
      '/employer-dashboard'
    ]);

  }

  logout(): void {

    localStorage.removeItem(
      'currentUser'
    );

    this.router.navigate([
      '/login'
    ]);

  }

}