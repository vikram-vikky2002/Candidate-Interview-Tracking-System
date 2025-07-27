import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.authService.storeSession(res.fullName, res.email, res.roleId);
        this.authService.redirectUserByRole(res.roleId);
      },
      error: (err) => {
        alert('Login failed: ' + (err.error || 'Invalid email or password'));
      }
    });
  }
}
