import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface User {
  id: number,
  username: string,
  email: string,
  password: string,
  role: string
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  imports: [HttpClientModule, ReactiveFormsModule]
})
export class SignUpPageComponent implements OnInit {
  registerForm: FormGroup;
  role = "";
  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  private apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let role = params['role']
      if(role !== "user" && role !== "staff") role = "user";
      this.role = role.toUpperCase();
    })
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {

    const user: User = {
      id: -1,
      username: this.registerForm.get("fullName")?.getRawValue(),
      password: this.registerForm.get("password")?.getRawValue(),
      email: this.registerForm.get("email")?.getRawValue(),
      role: this.role
    }

    this.httpClient.post<User>(`${this.apiUrl}/register`, user)
      .subscribe(newUser => {
        localStorage.setItem("userId", newUser.id.toString())
        if (newUser.role == "STAFF") {
          this.router.navigate(["staff"])
        }
        else {
          this.router.navigate(["customer"])
        }
      })

  }
}






