import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillRoutingModule } from './skill-routing.module';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { UpdateSkillComponent } from './update-skill/update-skill.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddSkillComponent,
    UpdateSkillComponent
  ],
  imports: [
    SharedModule,
    SkillRoutingModule,
    ReactiveFormsModule
  ]
})
export class SkillModule { }
