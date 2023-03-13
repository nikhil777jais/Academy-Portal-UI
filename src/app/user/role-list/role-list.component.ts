import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: Role[];
  addRoleForm:FormGroup;
  isLoaded = false;
  message:string;
  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
  }

  initForm(){
    this.addRoleForm = new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(resData => {
      this.roles = resData;
      this.isLoaded = true
    });
  }

  onSubmit(){
    this.isLoaded = false;
    const  role = this.addRoleForm.value.name;
    this.roleService.addRole(role).subscribe(resData => {
      this.message = resData.message;
      this.loadRoles();
      this.isLoaded = true;
    })
  }

  onDelete(id:string){
    this.isLoaded = false;
    const  role = this.addRoleForm.value.name;
    this.roleService.deleteRole(id).subscribe(resData => {
      this.message = resData.message;
      this.loadRoles();
      this.isLoaded = true;
    })
  }
}
