import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

export interface AuthResponseData {
  id: string;
  userName: string;
  gender: string;
  phone: number;
  email: string;
  role: string,
  status: string,
  token: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  user = new BehaviorSubject<User>(null);
  private setTimeoutSubscription:any;
  constructor(private http: HttpClient, private router: Router) {

  }
  
  signUp(email: string, password: string, ConfirmPassword: string) {
    return this.http.post<AuthResponseData>(
      environment.apiUrl + '/api/user/signUp',
      {
        email: email,
        password: password,
        ConfirmPassword: ConfirmPassword
      }
    ).pipe(
      catchError(error => {
        return this.handelError(error);
      }),
      tap(resData => {
        this.handelAuthentication(resData);
      })
    )
  }


  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      environment.apiUrl + '/api/user/signIn',
      {
        email: email,
        password: password
      }
    ).pipe(
      catchError(error => {
        return this.handelError(error);
      }),
      tap(resData => {
        this.handelAuthentication(resData);
      })
    )
  }

  autoLogin(){
    const userData:{
      id:string;
      email:string;
      userName:string;
      gender:string;
      phone:number;
      role:string;
      status:string;
      _token:string;
      _tokenExpirationDate:Date;
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return null;
    }

    const user:User = new User(
      userData.id,
      userData.email,
      userData.userName,
      userData.gender,
      userData.phone,
      userData.role,
      userData.status,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    //if user has a valid token the proceed for login
    if(user.token){
      this.user.next(user);
      //expiresIn is in millisecond here
      let expiresIn:number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); 
      this.autoLogout(expiresIn);
    }
      
  }

  autoLogout(expiresIn:number){
    //expiresIn must be in millisecond only 
    this.setTimeoutSubscription = setTimeout(()=>{
      this.logout();
    }, expiresIn);
  }

  logout(){           
    this.user.next(null);
    this.router.navigate(['/auth/sign-in']);  
    localStorage.removeItem('userData');
    if(this.setTimeoutSubscription){
        clearTimeout(this.setTimeoutSubscription)
    }
  }

  handelAuthentication(resData: AuthResponseData) {
    const expireDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    //create user instance that used for authentication
    const user = new User(
      resData.id,
      resData.email,
      resData.userName,
      resData.gender,
      resData.phone,
      resData.role,
      resData.status,
      resData.token,
      expireDate
    );
    this.user.next(user);
    localStorage.setItem( 'userData', JSON.stringify(user));
    //expiresIn is in second here so convert it in millisecond
    this.autoLogout(+resData.expiresIn*1000);
  }

  handelError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (errorRes.error.error) {
      errorMessage = errorRes.error.error;
    }else if (errorRes.error) {
      errorMessage = errorRes.error;
    }
    return throwError(errorMessage);
  }

  ngOnDestroy(): void {
    this.setTimeoutSubscription.unsubscribe();
  }
}
