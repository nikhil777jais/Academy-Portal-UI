import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RoleListComponent } from './role-list/role-list.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    UserListComponent,
    UpdateUserComponent,
    RoleListComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
