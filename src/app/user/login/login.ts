import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  styles: ``,
})
export class Login {
  constructor(
    public formBuilder: FormBuilder,
  ) {}
    isSubmitted :boolean = false;

    private fb = inject(FormBuilder);
     form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
     })
     onSubmit() {
    this.isSubmitted = true;
    console.log(this.form.value);
    
    if (this.form.valid) {
      console.log('Logging in...', this.form.value);
    }
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.touched || this.isSubmitted));
  }
}
