import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.html',
})
export class Registration {

  private fb = inject(FormBuilder);

  form = this.fb.group({
    fullname: [''],
    email: [''],
    password: [''],
    confirmPassword: ['']
  });
  onSubmit() {
    console.log(this.form.value);
  }
}
