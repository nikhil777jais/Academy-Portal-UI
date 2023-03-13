import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Profile } from './profile';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() profile: Profile;
  // isLoaded:boolean = false;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  //   this.userService.profile.subscribe(profile => {
  //     this.profile = profile;
  //     this.isLoaded = true;
  //   })
  //   console.log(this.profile);
  }

}
