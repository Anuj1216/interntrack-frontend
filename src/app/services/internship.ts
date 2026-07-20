import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Internship } from '../models/internship';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private apiUrl =
    'http://localhost:8080/api/internships';

  constructor(private http: HttpClient) {}

  getInternships(): Observable<Internship[]> {

    return this.http.get<Internship[]>(
      this.apiUrl
    );
  }

  getInternshipById(
    id: number
  ): Observable<Internship> {

    return this.http.get<Internship>(
      `${this.apiUrl}/${id}`
    );
  }

  createInternship(
    internship: Internship
  ): Observable<Internship> {

    return this.http.post<Internship>(
      this.apiUrl,
      internship
    );
  }

  getInternshipCount(): Observable<number> {

    return this.http.get<number>(
        `${this.apiUrl}/count`
    );

    }
}