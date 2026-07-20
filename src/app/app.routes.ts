import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { InternshipDetails } from './components/internship-details/internship-details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import {EmployerDashboard} from './components/employer-dashboard/employer-dashboard';
import { CreateInternship } from './components/create-internship/create-internship';
import { Application } from './components/application-list/application-list';

import { employerGuard } from './guards/employer-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'internships/:id',
    component: InternshipDetails
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'employer-dashboard',
    component: EmployerDashboard,
    canActivate: [employerGuard]
  },

  {
    path: 'employer/internships/new',
    component: CreateInternship,
    canActivate: [employerGuard]
   },

   {
    path: 'employer/applications',
    component: Application
    }

];