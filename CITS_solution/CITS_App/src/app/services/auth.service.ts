import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7181/api'; // Update if needed

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/User/AuthenticateUser`, credentials);
  }

  storeSession(fullName: string, email: string, roleId: number) {
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
    localStorage.setItem('roleId', roleId.toString());
  }

  redirectUserByRole(roleId: number) {
    switch (roleId) {
      case 1:
        this.router.navigate(['/recruiter-dashboard']);
        break;
      case 2:
        this.router.navigate(['/interviewer-dashboard']);
        break;
      case 3:
        this.router.navigate(['/admin-dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('email');
  }
}
