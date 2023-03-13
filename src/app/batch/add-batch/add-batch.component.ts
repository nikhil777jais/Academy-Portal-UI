import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { Module } from 'src/app/module/module';
import { ModuleService } from 'src/app/module/module.service';
import { Skill } from 'src/app/skill/skill';
import { SkillService } from 'src/app/skill/skill.service';
import { Batch } from '../batch';
import { BatchService } from '../batch.service';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit {

  isLoaded: boolean = false;
  addBatchForm: FormGroup;
  batches: Batch[];
  skills: Skill[];
  modules: Module[];
  message:string;

  constructor(
    private batchService: BatchService,
    private skillService: SkillService,
    private moduleService: ModuleService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm() {
    this.addBatchForm = new FormGroup({
      'relatedSkillId': new FormControl(null, [Validators.required]),
      'relatedModuleId': new FormControl(null, [Validators.required]),
      'technology': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'batch_Capacity': new FormControl(null, [Validators.required]),
      'batch_End_Date': new FormControl(null, [Validators.required]),
      'batch_Start_Date': new FormControl(null, [Validators.required]),
      'classroom_Name': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  loadBatches$() {
    return this.batchService.getBatches()
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
    var batchObs$ = this.loadBatches$();
    zip<[Skill[], Module[], Batch[]]>(skillObs$, moduleObs$, batchObs$).subscribe(
      ([skills, modules, batches]) => {
        this.skills = skills;
        this.modules = modules;
        this.batches = batches;
        this.isLoaded = true;
      }
    );
  }

  onSubmit() {
    this.isLoaded = false;
    const batch: Batch = this.addBatchForm.value
    this.batchService.addBatch(batch).subscribe(
      resData => {
        this.message = resData.message;
        this.loadData();
        this.isLoaded = true;
      },
      error => {
        this.isLoaded = true;
      }
    );
  }
}
