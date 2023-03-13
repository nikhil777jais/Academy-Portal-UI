import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment'
import { Module } from './module';
 

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(
    private http: HttpClient
  ) { }

  getModules() {
    return this.http.get<Module[]>(
      environment.apiUrl + '/api/module/getModules'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getModuleNames() {
    return this.http.get<Module[]>(
      environment.apiUrl + '/api/module/getModuleNames'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getModuleById(id:number) {
    return this.http.get<Module>(
      environment.apiUrl + '/api/module/getModule/'+id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  
  addModule(module:Module) {
    return this.http.post<any>(
      environment.apiUrl + '/api/module/addModule/',
      {
        name:module.name,
        technology:module.technology,
        proficiency:module.proficiency
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  
  updateModule(module:Module, id:number) {
    return this.http.patch<any>(
      environment.apiUrl + '/api/module/updateModule/'+id,
      {
        name:module.name,
        technology:module.technology,
        proficiency:module.proficiency
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  
  deleteModule(id:number) {
    return this.http.delete<any>(
      environment.apiUrl + '/api/module/deleteModule/'+id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }  
}
