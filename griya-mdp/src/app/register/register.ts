import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validator, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required, Validators.minLength(6)]]
    })
  }

  submitRegister(): void {
    if(this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form submited', formData);

      // TODO: Kirim data ke Backend API
      // this.authService.register(formData).subscribe(...)
    } else {
      console.log('form is not valid');
    }
  }
}
