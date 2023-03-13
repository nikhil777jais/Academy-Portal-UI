import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    LoadingSpinnerComponent,
    CommonModule
  ]
})
export class SharedModule { }
