import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuardGuard } from '../auth/role-guard.guard';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { UpdateSkillComponent } from './update-skill/update-skill.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'list', component: AddSkillComponent, canActivate: [RoleGuardGuard] },
      { path: 'update/:id', component: UpdateSkillComponent, canActivate: [RoleGuardGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule { }
