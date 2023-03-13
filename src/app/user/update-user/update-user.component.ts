import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { zip } from 'rxjs';
import { Profile } from '../profile/profile';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { Status } from '../status';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent implements OnInit {
  isLoaded: boolean = false;
  profile: Profile;
  id: string;
  roles: Role[];
  statuses: Status[];
  updateStatusForm: FormGroup;
  updateRoleForm: FormGroup;
  message:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.initForms();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.loadData();
  }


  initForms() {
    this.updateRoleForm = new FormGroup({
      'role': new FormControl(null, [Validators.required])
    });

    this.updateStatusForm = new FormGroup({
      'status': new FormControl(null, [Validators.required])
    });
  }

  setForms(roles: Role[], statuses: Status[], profile: Profile) {
    this.isLoaded = true;
    const role = roles.find(r => r.name === profile.role);
    const status = statuses.find(s => s.name === profile.status);
    this.updateRoleForm.setValue({
      'role': role ? role.name : null
    });
    this.updateStatusForm.setValue({
      'status': status ? status.name : null
    });
    this.isLoaded = true;
  }



  loadProfile$() {
    return this.userService.getProfileById(this.id)
  }

  loadRoles$() {
    return this.roleService.getRoles();
  }

  loadStatuses$() {
    return this.roleService.getStatuses();
  }

  loadData() {
    var roles$ = this.loadRoles$();
    var statuses$ = this.loadStatuses$();
    var profile$ = this.loadProfile$();
    zip<[Role[], Status[], Profile]>(roles$, statuses$, profile$).subscribe(
      ([roles, statuses, profile]) => {
        this.roles = roles;
        this.statuses = statuses;
        this.profile = profile;
        this.setForms(roles, statuses, profile);
      }
    );
  }

  onUpdateRole() {
    this.isLoaded = false;
    const role = this.updateRoleForm.value.role;
    this.userService.updateRole(role, this.profile.id).subscribe(resData => {
      this.message = resData.message;
      this.loadData();
      this.isLoaded = true;
    });
  }
  
  onUpdateStatus() {
    this.isLoaded = false;
    const status = this.updateStatusForm.value.status;
    this.userService.updateStatus(status, this.profile.id).subscribe(resData => {
      this.message = resData.message;
      this.loadData();
      this.isLoaded = true;
    });
  }

}
