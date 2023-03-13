import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { Module } from 'src/app/module/module';
import { ModuleService } from 'src/app/module/module.service';
import { ModuleSkill } from '../module-skill';
import { ModuleSkillService } from '../module-skill.service';

@Component({
  selector: 'app-add-modules',
  templateUrl: './add-modules.component.html',
  styleUrls: ['./add-modules.component.css']
})
export class AddModulesComponent implements OnInit {

  addModulesForm:FormGroup;
  moduleSkill:ModuleSkill;
  modules:Module[];
  skillId:number;
  isLoaded:boolean = false;
  message:string;

  constructor(
    private moduleSkillService:ModuleSkillService,
    private moduleService:ModuleService,
    private activatedRoute:ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe(params => {
      this.skillId = +params['skillId'];
    });
    this.loadData();
  }

  initForm(){
    this.addModulesForm = new FormGroup({
      'moduleIds':new FormControl(null,[Validators.required])
    });
  }

  setForm(modules:Module[], moduleSkill:ModuleSkill){
    var selectedModuleIds:Array<number> = new Array(); 
    for(let module of moduleSkill.relatedModules){
      for(let m of modules){
        if(m.id === module.id){
          selectedModuleIds.push(m?.id);
        }
      }
    }

    this.addModulesForm.setValue({
      moduleIds: selectedModuleIds
    });
    this.isLoaded = true;
  }
  
  loadModuleSkill$(){
    return this.moduleSkillService.getMappingById(this.skillId);
  }

  loadModules$(){
    return this.moduleService.getModuleNames();
  }

  loadData(){
    var modules$ = this.loadModules$();
    var moduleSkill$ = this.loadModuleSkill$();
    zip<[Module[], ModuleSkill]>(modules$, moduleSkill$).subscribe(
      ([modules, moduleSkill]) => {
        this.modules = modules;
        this.moduleSkill = moduleSkill;
        this.setForm(modules, moduleSkill);
      }
    );
  }

  onSubmit(){
    const moduleIds:number[] = this.addModulesForm.value.moduleIds;
    this.isLoaded = false;
    this.moduleSkillService.addModules(this.skillId, moduleIds).subscribe(
      resData => {
        this.message = resData.message;
        this.loadData();
      },
      error => {
        this.loadData();
      },
    );
  }

  removeModules(skillId:number, moduleId:number){
    this.isLoaded = false;
    this.moduleSkillService.removeModule(moduleId,skillId).subscribe(
      resData =>{
        console.log(resData);
        this.loadData();
      },
      error =>{
        console.log(error);
        this.loadData();
      }
    );
  }

}
