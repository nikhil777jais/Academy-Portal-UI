import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Batch } from './batch';
import { DetailedBatch } from './detailed-batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(
    private http: HttpClient
  ) { }

  getBatches() {
    return this.http.get<Batch[]>(
      environment.apiUrl + '/api/batch/getBatches'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getBatchById(id:number) {
    return this.http.get<Batch>(
      environment.apiUrl + '/api/batch/getBatch/'+id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  getDetailedBatches() {
    return this.http.get<DetailedBatch[]>(
      environment.apiUrl + '/api/batch/getDetailedBatches'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getDetailedBatchById(id:number) {
    return this.http.get<DetailedBatch>(
      environment.apiUrl + '/api/batch/getDetailedBatch/'+id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  
  addBatch(batch:Batch) {
    return this.http.post<any>(
      environment.apiUrl + '/api/batch/addBatch',
      {
        relatedSkillId:batch.relatedSkillId,
        relatedModuleId:batch.relatedModuleId,
        technology:batch.technology,
        batch_Capacity:batch.batch_Capacity,
        batch_End_Date:batch.batch_End_Date,
        batch_Start_Date:batch.batch_Start_Date,
        classroom_Name:batch.classroom_Name
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  
  updateBatch(batch:Batch, id:number) {
    return this.http.patch<any>(
      environment.apiUrl + '/api/batch/updateBatch/'+id,
      {
        relatedSkillId:batch.relatedSkillId,
        relatedModuleId:batch.relatedModuleId,
        technology:batch.technology,
        batch_Capacity:batch.batch_Capacity,
        batch_End_Date:batch.batch_End_Date,
        batch_Start_Date:batch.batch_Start_Date,
        classroom_Name:batch.classroom_Name
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  addFaculties(batchId:number, facultyIds:string[]) {
    return this.http.post<any>(
      environment.apiUrl + '/api/batch/addFaculty/'+batchId,
      {
        faculties:facultyIds
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  removeFaculty(batchId:number, facultyId:string) {
    return this.http.delete<any>(
      environment.apiUrl + '/api/batch/'+ batchId +'/removeFaculty/'+facultyId
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getUserBatches(){
    return this.http.get<Batch[]>(
      environment.apiUrl + '/api/batch/getUserBatches'
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getDetailedUserBatchById(id:number) {
    return this.http.get<DetailedBatch>(
      environment.apiUrl + '/api/batch/getDetailedUserBatch/'+id
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  updateBatchStatus(batchId:number, statusId:number) {
    return this.http.post<any>(
      environment.apiUrl + '/api/batch/updateSatchStatus/'+batchId,
      {
        statusId:statusId
      }
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
}
