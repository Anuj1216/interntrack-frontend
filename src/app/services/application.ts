import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl =
    'https://interntrack-backend-production-dd2c.up.railway.app/api/applications';

  constructor(
    private http: HttpClient
  ) {}

  getApplicationCount(): Observable<number> {

    return this.http.get<number>(
      `${this.apiUrl}/count`
    );

  }

  getAllApplications(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  getApplicationsByEmployer(
    employerId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/employer/${employerId}`
    );

  }

  updateStatus(
    id: number,
    status: string
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}/status?status=${status}`,
      {}
    );

  }

  applyForInternship(
    internshipId: number,
    studentId: number
  ): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/internship/${internshipId}/student/${studentId}`,
      {}
    );

  }

}