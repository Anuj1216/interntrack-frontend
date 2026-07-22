import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationService } from '../../services/application';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-list.html',
  styleUrl: './application-list.css'
})
export class Application implements OnInit {

  applications: any[] = [];

  loading = true;

  errorMessage = '';

  constructor(
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {

    this.loadApplications();

  }

  loadApplications(): void {

    this.loading = true;

    this.applicationService
      .getAllApplications()
      .subscribe({

        next: (data) => {

          this.applications = data;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Error loading applications:',
            error
          );

          this.errorMessage =
            'Unable to load applications.';

          this.loading = false;

        }

      });

  }

  approveApplication(
    applicationId: number
  ): void {

    this.applicationService
      .updateStatus(
        applicationId,
        'APPROVED'
      )
      .subscribe({

        next: () => {

          this.loadApplications();

        },

        error: (error) => {

          console.error(
            'Error approving application:',
            error
          );

        }

      });

  }

  rejectApplication(
    applicationId: number
  ): void {

    this.applicationService
      .updateStatus(
        applicationId,
        'REJECTED'
      )
      .subscribe({

        next: () => {

          this.loadApplications();

        },

        error: (error) => {

          console.error(
            'Error rejecting application:',
            error
          );

        }

      });

  }

}