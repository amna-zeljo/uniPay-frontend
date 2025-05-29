import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';

interface User{
  username:string,
  email:string,
  password:string,
  role:string
}

@Component({
  selector: 'app-signup',
  standalone:true,
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  imports: [HttpClientModule, ReactiveFormsModule]
})
export class SignUpPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private httpClient:HttpClient,
              private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit(): void {

      const user:User={
        username:this.registerForm.get("fullName")?.getRawValue(),
        password:this.registerForm.get("password")?.getRawValue(),
        email:this.registerForm.get("email")?.getRawValue(),
        role: "STAFF"
      }

      this.httpClient.post<User>("http://localhost:8081/register",  user)
        .subscribe(newUser =>{
          if(newUser.role=="STAFF"){
            this.router.navigate(["staff"])
          }
          else{
            this.router.navigate(["customer"])
          }
        })

  }
}






