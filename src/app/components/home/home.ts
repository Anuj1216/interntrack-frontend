import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: ''
})
export class Home implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const storedUser =
      localStorage.getItem('currentUser');

    if (!storedUser) {

      this.router.navigate([
        '/internships'
      ]);

      return;

    }

    const user =
      JSON.parse(storedUser);

    if (
      user.role.toUpperCase()
      === 'EMPLOYER'
    ) {

      this.router.navigate([
        '/employer-dashboard'
      ]);

    } else if (
      user.role.toUpperCase()
      === 'STUDENT'
    ) {

      this.router.navigate([
        '/dashboard'
      ]);

    } else {

      this.router.navigate([
        '/internships'
      ]);

    }

  }

}