import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Internship
} from '../models/internship';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private apiUrl =
    'http://interntrack-backend-production-dd2c.up.railway.app/api/internships';

  constructor(
    private http: HttpClient
  ) {}

  getAllInternships(): Observable<Internship[]> {

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

  getInternshipsByEmployer(
    employerId: number
  ): Observable<Internship[]> {

    return this.http.get<Internship[]>(
      `${this.apiUrl}/employer/${employerId}`
    );

  }

  getInternshipCount(): Observable<number> {

    return this.http.get<number>(
      `${this.apiUrl}/count`
    );

  }

  createInternship(
    employerId: number,
    internship: Internship
  ): Observable<Internship> {

    return this.http.post<Internship>(
      `${this.apiUrl}?employerId=${employerId}`,
      internship
    );

  }

  updateInternship(
    id: number,
    internship: Internship
  ): Observable<Internship> {

    return this.http.put<Internship>(
      `${this.apiUrl}/${id}`,
      internship
    );

  }

  deleteInternship(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}