import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth-service';
import { Patient } from '../../patient';


function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const cPassword = control.get('cPassword')?.value;

  if (password !== cPassword) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  
  registerForm=new FormGroup({
    name:new FormControl("",[Validators.required,Validators.minLength(5)]),
    email:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required,Validators.minLength(4)]),
    cPassword:new FormControl("",[Validators.required,Validators.minLength(4)])
  },{
    validators:passwordMatchValidator
  })

  constructor(private authService:AuthService,private router:Router){

  }

  onSubmit() {
  if (this.registerForm.valid) {

    const formData: Patient = {
      name: this.registerForm.get('name')!.value!,
      email: this.registerForm.get('email')!.value!,
      password: this.registerForm.get('password')!.value!,
      cPassword: this.registerForm.get('cPassword')!.value!,
    };

    console.log('Form Data:', formData);

    this.authService.getRegisterFormData(formData).subscribe({
      next: () => {
        this.registerForm.reset();
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

}
