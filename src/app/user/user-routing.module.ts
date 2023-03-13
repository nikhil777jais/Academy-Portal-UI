import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuardGuard } from '../auth/role-guard.guard';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RoleListComponent } from './role-list/role-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'profile', component: ProfileEditComponent },
      { path: 'list', component: UserListComponent, canActivate:[RoleGuardGuard] },
      { path: 'update/:id', component: UpdateUserComponent, canActivate:[RoleGuardGuard]},
      { path: 'roles', component: RoleListComponent, canActivate:[RoleGuardGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
