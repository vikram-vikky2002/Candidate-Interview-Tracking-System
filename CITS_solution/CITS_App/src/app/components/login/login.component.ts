import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  roleId: number | null = null;
  roleName: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.roleId = this.authService.getUserRoleId();
    this.roleName = this.authService.getUserRoleName();
    
  }

  logout() {
    this.authService.logout();
  }
  onLogin(): void {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        // Step 1: Get full user details using email
        this.authService.getUserByEmail(res.email).subscribe({
          next: (userDetails) => {
            console.log('User fetched:', userDetails);
            this.authService.storeSession(
              userDetails.fullName,
              userDetails.email,
              userDetails.roleId,
              userDetails.userId
            );
            this.authService.redirectAfterLogin();
          },
          error: (err) => {
            console.error('Error fetching user by email:', err);
            alert('Login succeeded but failed to load user details.');
          }
        });
      },
      error: (err) => {
        alert('Login failed: ' + (err.error || 'Invalid email or password'));
      }
    });
  }

}
