import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile/profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  isLoaded:boolean = false;
  profiles:Profile [];

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(){
    this.userService.fetchProfiles().subscribe(
      resData => {
        this.profiles = resData;
        this.isLoaded = true;
      }
    );
  }
}
