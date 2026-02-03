import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth-service';
import { NgIf } from '@angular/common';

/* Password Match Validator */
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const cPassword = control.get('cPassword')?.value;
  return password === cPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register-doctor.html',
  styleUrl: './register-doctor.css',
})
export class RegisterDoctor {

  doctorForm = new FormGroup({
    doctorName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    specialization: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cPassword: new FormControl('', Validators.required),
  }, { validators: passwordMatchValidator });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.doctorForm.valid) {
      const data = {
        doctorName: this.doctorForm.value.doctorName!,
        email: this.doctorForm.value.email!,
        specialization: this.doctorForm.value.specialization!,
        password: this.doctorForm.value.password!,
      };

      this.authService.registerDoctor(data).subscribe(() => {
        this.doctorForm.reset();
        this.router.navigate(['/login']);
      });
    }
  }
}
