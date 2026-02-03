import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginData() {
  if (this.loginForm.valid) {

    const loginData = {
      email: this.loginForm.get('email')!.value!,
      password: this.loginForm.get('password')!.value!,
    };

    this.authService.loginUser(loginData).subscribe({
      next: (res: any) => {

        localStorage.setItem('role', res.user.role);

        if (res.user.role === 'doctor') {
          localStorage.setItem('doctorId', res.user.id);
          localStorage.setItem('doctorName', res.user.name);
          this.router.navigate(['/doctor']);
        } else {
          localStorage.setItem('patientId', res.user.id);
          localStorage.setItem('patientName', res.user.name);
          this.router.navigate(['/patient']);
        }

        this.loginForm.reset();
      },
      error: () => {
        alert('Invalid email or password');
      }
    });
  }
}

}
