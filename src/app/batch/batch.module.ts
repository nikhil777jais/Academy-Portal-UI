import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { UpdateBatchComponent } from './update-batch/update-batch.component';
import { BatchItemComponent } from './batch-item/batch-item.component';
import { BatchListComponent } from './batch-list/batch-list.component';
import { AssignToFacultyComponent } from './assign-to-faculty/assign-to-faculty.component';
import { AssignedBatchesComponent } from './assigned-batches/assigned-batches.component';
import { UpdateBatchStatusComponent } from './update-batch-status/update-batch-status.component';


@NgModule({
  declarations: [
    AddBatchComponent,
    UpdateBatchComponent,
    BatchItemComponent,
    BatchListComponent,
    AssignToFacultyComponent,
    AssignedBatchesComponent,
    UpdateBatchStatusComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    BatchRoutingModule
  ]
})
export class BatchModule { }
