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

  // Store session info including role
  storeSession(fullName: string, email: string, roleId: number, userId: number) {
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
    localStorage.setItem('roleId', roleId.toString());
    localStorage.setItem('userId', userId.toString());
  }
  getUserByEmail(email: string) {
    return this.http.get<any>(`${this.baseUrl}/User/GetUserByEmail/${email}`);
  }


  // Unified redirect after login
  redirectAfterLogin() {
    this.router.navigate(['/dashboard-stats']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('email');
  }

  getUserRoleId(): number | null {
    const role = localStorage.getItem('roleId');
    return role ? +role : null;
  }

  getUserRoleName(): string {
    const roleId = this.getUserRoleId();
    switch (roleId) {
      case 1: return 'Recruiter';
      case 2: return 'Interviewer';
      case 3: return 'Admin';
      default: return 'Unknown';
    }
  }

  getUserEmail(): string | null {
    return localStorage.getItem('email');
  }

  getFullName(): string | null {
    return localStorage.getItem('fullName');
  }
}
