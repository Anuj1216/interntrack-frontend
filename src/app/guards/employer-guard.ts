import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const employerGuard: CanActivateFn = () => {

  const router = inject(Router);

  const userData =
    localStorage.getItem('currentUser');

  if (!userData) {

    router.navigate(['/login']);

    return false;
  }

  const user =
    JSON.parse(userData);

  if (
    user.role?.toUpperCase()
    === 'EMPLOYER'
  ) {

    return true;
  }

  router.navigate(['/dashboard']);

  return false;

};