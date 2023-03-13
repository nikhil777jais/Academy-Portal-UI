import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { Faculty } from 'src/app/user/faculty';
import { UserService } from 'src/app/user/user.service';
import { BatchService } from '../batch.service';
import { DetailedBatch } from '../detailed-batch';

@Component({
  selector: 'app-assign-to-faculty',
  templateUrl: './assign-to-faculty.component.html',
  styleUrls: ['./assign-to-faculty.component.css']
})
export class AssignToFacultyComponent implements OnInit {

  isLoaded: boolean = false;
  addFacultyForm: FormGroup;
  batchId: number;
  batch: DetailedBatch;
  faculties: Faculty[];
  message:string;

  constructor(
    private batchService: BatchService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe(params => {
      this.batchId = +params['batchId'];
    });
    this.loadData();
  }

  initForm() {
    this.addFacultyForm = new FormGroup({
      'facultyIds': new FormControl(null, [Validators.required])
    });
  }

  setForm() {
    var selectedModuleIds: Array<string> = new Array();
    for (let faculty of this.batch?.users) {
      for (let fac of this.faculties) {
        if (fac.email === faculty.email) {
          selectedModuleIds.push(fac.id);
        }
      }
    }

    this.addFacultyForm.setValue({
      facultyIds: selectedModuleIds
    });
  }

  loadFaculties$() {
    return this.userService.fetchFaculties();
  }
  loadBatch$(batchId: number) {
    return this.batchService.getDetailedBatchById(batchId);
  }


  loadData() {
    var batchObs$ = this.loadBatch$(this.batchId);
    var facultiesObs$ = this.loadFaculties$();
    zip<[Faculty[], DetailedBatch]>(facultiesObs$, batchObs$).subscribe(
      ([faculties, batch]) => {
        this.faculties = faculties;
        this.batch = batch;
        this.setForm();
        this.isLoaded = true;
      }
    );
  }

  onSubmit() {
    this.isLoaded = false;
    const faculties = this.addFacultyForm.value.facultyIds;
    this.batchService.addFaculties(this.batchId, faculties).subscribe(
      resData => {
        this.message = resData.message;
        this.loadData();
      },
      error => {
        console.log(error);
        this.loadData();
      }
    );  
  }

  removeFaculty(facultyId:string){
    this.isLoaded = false;
    if(facultyId){
      this.batchService.removeFaculty(this.batchId, facultyId).subscribe(
        resData => {
          this.message = resData.message;
          this.loadData();
        },
        error => {
          this.loadData();
        }
      );
    }
  }

}
