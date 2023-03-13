import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { ModuleSkill } from './module-skill';

@Injectable({
  providedIn: 'root'
})
export class ModuleSkillService {

  constructor(
    private http:HttpClient
  ) { }

  getMappingList(){
    return this.http.get<ModuleSkill[]>(
      environment.apiUrl + '/api/moduleSkillMapping/getMappingList'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getMappingById(id:number){
    return this.http.get<ModuleSkill>(
      environment.apiUrl + '/api/moduleSkillMapping/getMapping/'+id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  addModules(id:number, moduleIds:number[] ){
    return this.http.post<any>(
      environment.apiUrl + '/api/moduleSkillMapping/addModules/'+id,
      {
        moduleIds:moduleIds  
      }
    ).pipe(
      catchError(error => { 
        return throwError(error);
      })
    );
  }
  
  removeModule(id:number, skillId:number){
    return this.http.delete<any>(
      environment.apiUrl + '/api/moduleSkillMapping/'+ skillId +'/removeModuleFromSkill/'+id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
