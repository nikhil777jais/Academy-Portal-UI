import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuardGuard } from '../auth/role-guard.guard';
import { AddModuleComponent } from './add-module/add-module.component';
import { UpdateModuleComponent } from './update-module/update-module.component';

const routes: Routes = [
  {
    path:'', canActivate:[AuthGuard], children:[
      {path:'list', component:AddModuleComponent, canActivate:[RoleGuardGuard]},
      {path:'update/:id', component:UpdateModuleComponent, canActivate:[RoleGuardGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
