import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key-pipe';
import { Auth } from '../../shared/services/auth';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe,RouterLink],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
})
export class Registration {
  constructor(
    public formBuilder: FormBuilder,
    private auth: Auth,
    private toastr: ToastrService,
  ) {}
  private fb = inject(FormBuilder);
  isSubmitted: boolean = false;

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };

  form = this.fb.group(
    {
      fullname: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator },
  );

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.valid) {
      this.auth.createUser(this.form.value).subscribe({
        next: (response: any) => {
          console.log(response);

          if (response.succeeded) {
            this.form.reset();
            this.isSubmitted = false;
            this.toastr.success(
              response.message || 'User created successfully',
              'Registration Success',
            );
          }
        },

        error: (error) => {
          console.log(error);
          const message = error.error?.message;
          if (message?.includes('email')) {
            this.toastr.error('Email already exists', 'Registration Failed');
          } else if (message?.includes('username')) {
            this.toastr.error('Username already exists', 'Registration Failed');
          } else if (message?.includes('fullname')) {
            this.toastr.error('Full name already exists', 'Registration Failed');
          } else {
            this.toastr.error(message || 'Registration failed', 'Error');
          }
        },
      });
    } else {
      if (this.form.errors?.['passwordMismatch']) {
        this.toastr.error('Passwords do not match');
        return;
      }
      const passwordControl = this.form.get('password');
      if (passwordControl?.errors?.['pattern']) {
        this.toastr.error(
          'Password must contain uppercase, lowercase, number and special character',
        );
      }
      if (passwordControl?.errors?.['minlength']) {
        this.toastr.error('Password must be at least 6 characters');
      }
    }
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.touched || this.isSubmitted));
  }
}
