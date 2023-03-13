import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from './skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  
  constructor(
    private http: HttpClient
  ) { }

  getSkills() {
    return this.http.get<Skill[]>(
      environment.apiUrl + '/api/skill/getSkills'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  
  getSkillNames() {
    return this.http.get<Skill[]>(
      environment.apiUrl + '/api/skill/getSkillNames'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  getSkillById(id:number) {
    return this.http.get<Skill>(
      environment.apiUrl + '/api/skill/getSkill/'+id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  
  addSkill(skill:Skill) {
    return this.http.post<any>(
      environment.apiUrl + '/api/skill/addSkill/',
      {
        name:skill.name,
        family:skill.family
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  
  updateSkill(skill:Skill, id:number) {
    return this.http.patch<any>(
      environment.apiUrl + '/api/skill/updateSkill/'+id,
      {
        name:skill.name,
        family:skill.family
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  
  deleteSkill(id:number) {
    return this.http.delete<any>(
      environment.apiUrl + '/api/skill/deleteSkill/'+id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

}
