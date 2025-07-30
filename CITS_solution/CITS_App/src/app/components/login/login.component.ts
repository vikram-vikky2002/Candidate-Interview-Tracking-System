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
        console.log(res)
        this.authService.storeSession(res.fullName, res.email, res.roleId);
        this.authService.storeSession(res.fullName, res.email, res.roleId);
        this.authService.redirectAfterLogin();

        
      },
      error: (err) => {
        alert('Login failed: ' + (err.error || 'Invalid email or password'));
      }
    });
  }
}
