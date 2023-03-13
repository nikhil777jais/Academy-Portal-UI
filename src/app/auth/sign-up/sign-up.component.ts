import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm : FormGroup;
  passwordMatched:boolean = true;
  error:string = null;
  isLoaded:boolean = false;
  constructor(
    private authService:AuthService, 
    private router:Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirm-password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.isLoaded = true;
  }

  onSubmit(){
    this.isLoaded = false;

    var email = this.signUpForm.value['email'];
    var password = this.signUpForm.value['password'];
    var confirmPassword = this.signUpForm.value['confirm-password'];
    if(password !== confirmPassword){
      this.passwordMatched = false;
      return;
    }
    this.passwordMatched = true;
    this.authService.signUp(email, password, confirmPassword).subscribe(
      resData =>{
        this.isLoaded = true;
        this.router.navigate(['/sign-in']);
      },
      errors =>{
        this.isLoaded = true;
        this.error = errors;
      }  
    );
    
  }

}
