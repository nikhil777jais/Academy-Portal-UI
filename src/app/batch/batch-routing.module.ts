import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuardGuard } from '../auth/role-guard.guard';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { AssignToFacultyComponent } from './assign-to-faculty/assign-to-faculty.component';
import { AssignedBatchesComponent } from './assigned-batches/assigned-batches.component';
import { UpdateBatchStatusComponent } from './update-batch-status/update-batch-status.component';
import { UpdateBatchComponent } from './update-batch/update-batch.component';

const routes: Routes = [
  {
    path:'',canActivate:[AuthGuard], children:[
      {path:'list', component:AddBatchComponent, canActivate:[RoleGuardGuard]},
      {path:'update-batch/:batchId', component:UpdateBatchComponent, canActivate:[RoleGuardGuard]},
      {path:'assign-to-faculty/:batchId', component:AssignToFacultyComponent, canActivate:[RoleGuardGuard]},
      {path:'assigned-batches', component:AssignedBatchesComponent},
      {path:'update-batch-status/:batchId', component:UpdateBatchStatusComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
