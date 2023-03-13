import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  error: string = null;
  isLoaded: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    this.signInForm.setValue(
      {
        'email': 'user1@gmail.com',
        'password': 'Raja@123'
      }
    );
    this.isLoaded = true;
  }

  onSubmit() {
    this.isLoaded = false;
    var email = this.signInForm.value['email'];
    var password = this.signInForm.value['password'];
    this.error = null;
    this.authService.signIn(email, password).subscribe(
      resData => {
        this.router.navigate(['/dashboard']);
        this.isLoaded = true;
      },
      errors => {
        this.isLoaded = true;
        this.error = errors.errors;
      }
    );
  }
}
