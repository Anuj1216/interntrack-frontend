import { Component } from '@angular/core';

import { Navbar } from '../navbar/navbar';
import { InternshipList } from '../internship-list/internship-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Navbar,
    InternshipList
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}