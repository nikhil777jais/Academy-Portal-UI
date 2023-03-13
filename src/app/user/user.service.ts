import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Faculty } from './faculty';
import { Profile } from './profile/profile';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  profilesList: Profile[];

  constructor(
    private http: HttpClient
  ) { }

  fetchProfile() {
    return this.http.get<Profile>(
      environment.apiUrl + '/api/user/profile'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  fetchFaculties() {
    return this.http.get<Faculty[]>(
      environment.apiUrl + '/api/user/getFaculties'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  fetchProfiles() {
    return this.http.get<Profile[]>(
      environment.apiUrl + '/api/user/getUsers'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  updateProfile(profile: Profile) {
    return this.http.patch(
      environment.apiUrl + '/api/user/profile',
      {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getProfileById(id: string) {
    return this.http.get<Profile>(
      environment.apiUrl + '/api/user/getUser/' + id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  updateRole(name: string, userId:string) {
    return this.http.post<any>(
      environment.apiUrl + '/api/user/updateRole/'+ userId,
      {
        name: name  
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
  
  updateStatus(name: string, userId:string) {
    return this.http.post<any>(
      environment.apiUrl + '/api/user/updateStatus/'+ userId,
      {
        name: name
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
