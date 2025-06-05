import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../signup-page/signup-page.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login-page.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  apiUrl = environment.apiUrl;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email/*, Validators.pattern('^[a-zA-Z0-9._%+-]+@stu\.ssst\.edu\.ba$')*/]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get("email")?.getRawValue();
      const password = this.loginForm.get("password")?.getRawValue();
      this.httpClient.get<User>(`${this.apiUrl}/login?email=${email}&password=${password}`)
        .subscribe(user => {
          localStorage.setItem("userId", user.id.toString())
          if (user.role == "STAFF") {
            this.router.navigate(["staff"])
          }
          else {
            this.router.navigate(["customer"])
          }
        })
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}


