import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuardGuard } from '../auth/role-guard.guard';
import { AddModulesComponent } from './add-modules/add-modules.component';
import { MappingListComponent } from './mapping-list/mapping-list.component';

const routes: Routes = [
  {
    path:'', canActivate:[AuthGuard], children:[
      {path:'list', component:MappingListComponent, canActivate:[RoleGuardGuard]},
      {path:'add-module/:skillId', component:AddModulesComponent, canActivate:[RoleGuardGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleSkillMappingRoutingModule { }
