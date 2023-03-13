import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../profile/profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profileEditForm: FormGroup;
  message:string;
  isLoaded: boolean = false;
  profile: Profile;

  constructor(
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.loadProfile();
    this.initForm();
  }

  initForm() {
    this.profileEditForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(3)],),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'dateOfBirth': new FormControl(null, [Validators.required]),
      'gender': new FormControl(null, [Validators.required])
    });
  }

  setForm(profile:Profile){
    const str = this.profile.dateOfBirth.slice(0,10);
    const date = new Date(str);
    
    this.profileEditForm.patchValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      dateOfBirth: formatDate(date,str,'en'),
      gender: profile.gender,
    })
  }

  onSubmit() {
    // console.log(this.profileEditForm);
    this.isLoaded = false;
    const profile: Profile = this.profileEditForm.value;
    this.userService.updateProfile(profile).subscribe(resData => {
      this.isLoaded = true;
      this.message = "Profile Updated"
      this.loadProfile();
    });
  }

  
  loadProfile() {
    this.userService.fetchProfile().subscribe(
      resData => {
        this.profile = resData;
        this.setForm(resData);
        this.isLoaded = true;
      }
    );
  }

}
