import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleSkillMappingRoutingModule } from './module-skill-mapping-routing.module';
import { MappingListComponent } from './mapping-list/mapping-list.component';
import { AddModulesComponent } from './add-modules/add-modules.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MappingListComponent,
    AddModulesComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ModuleSkillMappingRoutingModule
  ]
})
export class ModuleSkillMappingModule { }
