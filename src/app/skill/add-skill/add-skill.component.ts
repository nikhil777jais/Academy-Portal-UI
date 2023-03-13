import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Skill } from '../skill';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  isLoaded: boolean = false;
  skills: Skill[];
  addSkillForm: FormGroup;
  message:string;

  constructor(
    private skillService: SkillService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadSkills();
  }

  initForm() {
    this.addSkillForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'family': new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  loadSkills() {
    this.skillService.getSkills().subscribe(resData => {
      this.skills = resData;
      this.isLoaded = true;
    });
  }
  onSubmit() {
    this.isLoaded = false;
    const skill: Skill = {
      name: this.addSkillForm.value.name,
      family: this.addSkillForm.value.family
    }
    this.skillService.addSkill(skill).subscribe(resData => {
      this.message = resData.message;
      this.loadSkills();
      this.isLoaded = true;
    });
  }

  onDelete(id: number) {
    this.isLoaded = false;
    this.skillService.deleteSkill(id).subscribe(
      resData => {
        this.message = resData.message;
        this.loadSkills();
        this.isLoaded = true;
      },
      error => {
        this.loadSkills();
        this.isLoaded = true;
      },
    );
  }
}
