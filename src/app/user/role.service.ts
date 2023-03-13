import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from './role';
import { Status } from './status';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }


  getRoles() {
    return this.http.get<Role[]>(
      environment.apiUrl + '/api/role/getRoles'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  addRole(name: string) {
    return this.http.post<any>(
      environment.apiUrl + '/api/role/addRole',
      {
        name:name
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteRole(id: string) {
    return this.http.delete<any>(
      environment.apiUrl + '/api/role/deleteRole/' + id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getStatuses() {
    return this.http.get<Status[]>(
      environment.apiUrl + '/api/status/getAllStatus'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
