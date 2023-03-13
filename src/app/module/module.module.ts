import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { AddModuleComponent } from './add-module/add-module.component';
import { UpdateModuleComponent } from './update-module/update-module.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddModuleComponent,
    UpdateModuleComponent
  ],
  imports: [
    SharedModule,
    ModuleRoutingModule,
    ReactiveFormsModule
  ]
})
export class ModuleModule { }
