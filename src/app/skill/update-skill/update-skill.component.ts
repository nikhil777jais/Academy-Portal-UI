import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Skill } from '../skill';
import { SkillService } from '../skill.service';

@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.css']
})
export class UpdateSkillComponent implements OnInit {

  isLoaded:boolean = false;
  id:number;
  skill:Skill;
  updateSkillForm:FormGroup;  
  message:string;

  constructor(
    private skillService:SkillService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadSkill(this.id);
    })
  }

  initForm(){
    this.updateSkillForm = new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'family':new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  setForm(skill:Skill){
    this.updateSkillForm.setValue({
      'name': skill.name,
      'family':skill.family
    });
  }


  loadSkill(id:number){
    this.skillService.getSkillById(id).subscribe(resData => {
      this.skill = resData;
      this.setForm(this.skill);
      this.isLoaded = true;
    });
  }

  onSubmit(){
    this.isLoaded = false;
    const skill:Skill = {
      name: this.updateSkillForm.value.name,
      family: this.updateSkillForm.value.family
    }
      this.skillService.updateSkill(skill,this.id).subscribe(resData => {
      this.message = resData.message;
      this.loadSkill(this.id);
      this.isLoaded = true;
    })
  }
}
