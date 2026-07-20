import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { InternshipService } from '../../services/internship';
import { ApplicationService } from '../../services/application';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './employer-dashboard.html',
  styleUrl: './employer-dashboard.css'
})
export class EmployerDashboard implements OnInit {

  internshipCount = 0;
  applicationCount = 0;

  applications: any[] = [];
  showApplications = false;

  constructor(
    private router: Router,
    private internshipService: InternshipService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {

    this.loadDashboardData();

  }

  loadDashboardData(): void {

  this.internshipService
    .getInternshipCount()
    .subscribe({

      next: (count) => {

        this.internshipCount = count;

      },

      error: (error) => {

        console.error(
          'Error loading internship count:',
          error
        );

      }

    });


  this.applicationService
    .getApplicationCount()
    .subscribe({

      next: (count) => {

        this.applicationCount = count;

      },

      error: (error) => {

        console.error(
          'Error loading application count:',
          error
        );

      }

    });

}

  goToCreateInternship(): void {
    this.router.navigate([
      '/employer/internships/new'
    ]);
  }

  goToInternships(): void {
    this.router.navigate([
      '/employer/internships'
    ]);
  }

  goToApplications(): void {
    this.router.navigate([
      '/employer/applications'
    ]);
  }

  logout(): void {

    localStorage.removeItem('currentUser');

    this.router.navigate([
      '/login'
    ]);

  }

  loadApplications(): void {

  this.applicationService
    .getAllApplications()
    .subscribe({

      next: (data) => {

        this.applications = data;

        this.showApplications = true;

      },

      error: (error) => {

        console.error(
          'Error loading applications:',
          error
        );

      }

    });

}

approveApplication(
  id: number
): void {

  this.applicationService
    .updateStatus(id, 'APPROVED')
    .subscribe({

      next: () => {

        this.loadApplications();

        this.applicationCount--;

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
  id: number
): void {

  this.applicationService
    .updateStatus(id, 'REJECTED')
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