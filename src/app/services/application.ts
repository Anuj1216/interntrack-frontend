import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl =
    'http://localhost:8080/api/applications';

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

  updateStatus(
    id: number,
    status: string
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}/status?status=${status}`,
      {}
    );

  }

}