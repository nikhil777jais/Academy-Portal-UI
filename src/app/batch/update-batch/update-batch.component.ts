import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { Module } from 'src/app/module/module';
import { ModuleService } from 'src/app/module/module.service';
import { Skill } from 'src/app/skill/skill';
import { SkillService } from 'src/app/skill/skill.service';
import { Batch } from '../batch';
import { BatchService } from '../batch.service';
import { DetailedBatch } from '../detailed-batch';

@Component({
  selector: 'app-update-batch',
  templateUrl: './update-batch.component.html',
  styleUrls: ['./update-batch.component.css']
})
export class UpdateBatchComponent implements OnInit {

  isLoaded: boolean = false;
  updateBatchForm: FormGroup;
  batchId: number;
  batch: DetailedBatch;
  skills: Skill[];
  modules: Module[];
  message:string;

  constructor(
    private batchService: BatchService,
    private skillService: SkillService,
    private moduleService: ModuleService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe(params => {
      this.batchId = +params['batchId'];
    });
    this.loadData();
  }

  initForm() {
    this.updateBatchForm = new FormGroup({
      'relatedSkillId': new FormControl(null, [Validators.required]),
      'relatedModuleId': new FormControl(null, [Validators.required]),
      'technology': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'batch_Capacity': new FormControl(null, [Validators.required]),
      'batch_End_Date': new FormControl(null, [Validators.required]),
      'batch_Start_Date': new FormControl(null, [Validators.required]),
      'classroom_Name': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  setForm() {
    this.updateBatchForm.setValue({
      
      relatedSkillId:this.batch.relatedSkill.id,
      relatedModuleId:this.batch.relatedModule.id,
      technology:this.batch.technology,
      batch_Capacity:this.batch.batch_Capacity,
      batch_End_Date:this.batch.batch_End_Date,
      batch_Start_Date:this.batch.batch_Start_Date,
      classroom_Name:this.batch.classroom_Name,
    });
  }

  loadBatch$(batchId: number) {
    return this.batchService.getDetailedBatchById(batchId);
  }

  loadSkills$() {
    return this.skillService.getSkillNames();
  }

  loadModules$() {
    return this.moduleService.getModuleNames();
  }

  loadData(){
    var skillObs$ = this.loadSkills$();
    var moduleObs$ = this.loadModules$();
    var batchObs$ = this.loadBatch$(this.batchId);
    zip<[Skill[], Module[], DetailedBatch]>(skillObs$, moduleObs$, batchObs$).subscribe(
      ([skills, modules, batches]) => { 
        this.skills = skills;
        this.modules = modules;
        this.batch = batches;
        this.setForm();
        this.isLoaded = true;
      }
    );
  }

  onSubmit() {
    this.isLoaded = false;
    const batch: Batch = this.updateBatchForm.value
    this.batchService.updateBatch(batch,this.batchId).subscribe(
      resData => {
        this.message = resData.message;
        this.loadData();
      },
      error => {
        this.isLoaded = true;
      }
    );
  }

}
