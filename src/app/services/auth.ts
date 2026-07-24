import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://interntrack-backend-production-dd2c.up.railway.app/api/auth';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {

    return this.http.post<User>(
      `${this.apiUrl}/register`,
      user
    );

  }

  login(email: string, password: string): Observable<User> {

    return this.http.post<User>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    );

  }

}