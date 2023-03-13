import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user';
import { RoleService } from 'src/app/user/role.service';
import { Status } from 'src/app/user/status';
import { BatchService } from '../batch.service';
import { DetailedBatch } from '../detailed-batch';

@Component({
  selector: 'app-update-batch-status',
  templateUrl: './update-batch-status.component.html',
  styleUrls: ['./update-batch-status.component.css']
})
export class UpdateBatchStatusComponent implements OnInit {

  statuses: Status[];
  batch: DetailedBatch;
  batchId:number;
  isLoaded:boolean = false;
  updateStatusForm:FormGroup;
  user:User;
  userSubscription:any;
  message:string;

  constructor(
    private batchService: BatchService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.activatedRoute.params.subscribe(params=>{
      this.batchId = +params['batchId'];
    });
    this.loadData();
  }

  initForm(){
    this.updateStatusForm = new FormGroup({
      'statusId': new FormControl(null, [Validators.required])
    });
  }

  setForm(){
    const currentStatus = this.batch.users.find(u => u.id === this.user.id).status;
    const statusId = this.statuses.find(s => s.name === currentStatus).id;
    this.updateStatusForm.setValue({
      statusId:statusId
    });

  }

  loadStatuses$() {
    return this.roleService.getStatuses();
  }
  loadBatch$() {
    return this.batchService.getDetailedUserBatchById(this.batchId);
  } 

  loadData() {
    var statuses$ = this.loadStatuses$();
    var batch$ = this.loadBatch$();
    zip<[Status[], DetailedBatch]>(statuses$, batch$).subscribe(
      ([statuses, batch]) => {
        this.statuses = statuses;
        this.batch = batch;
        this.setForm();
        this.isLoaded = true;
      }
    );
  }

  onSubmit(){
    this.isLoaded = false;
    const statusId = this.updateStatusForm.value.statusId;
    this.batchService.updateBatchStatus(this.batchId ,statusId).subscribe(
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
}
