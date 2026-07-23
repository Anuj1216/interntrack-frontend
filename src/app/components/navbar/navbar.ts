import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar
  implements OnInit {

  currentUser: any = null;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const storedUser =
      localStorage.getItem(
        'currentUser'
      );

    if (storedUser) {

      this.currentUser =
        JSON.parse(
          storedUser
        );

    }

  }

  isEmployer(): boolean {

    return this.currentUser?.role
      ?.toUpperCase()
      === 'EMPLOYER';

  }

  logout(): void {

    localStorage.removeItem(
      'currentUser'
    );

    this.currentUser = null;

    this.router.navigate([
      '/login'
    ]);

  }

}