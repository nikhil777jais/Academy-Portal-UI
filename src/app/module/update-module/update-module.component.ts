import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Module } from '../module';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css']
})
export class UpdateModuleComponent implements OnInit {

  isLoaded: boolean = false;
  id: number;
  module: Module;
  updateModuleForm: FormGroup;
  message:string;

  constructor(
    private moduleService: ModuleService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadModule(this.id);
    })
  }

  initForm() {
    this.updateModuleForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'technology': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'proficiency': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  setForm(module: Module) {
    this.updateModuleForm.setValue({
      'name': module.name,
      'technology': module.technology,
      'proficiency': module.proficiency,
    });
  }


  loadModule(id: number) {
    this.moduleService.getModuleById(id).subscribe(resData => {
      this.module = resData;
      this.setForm(this.module);
      this.isLoaded = true;
    });
  }

  onSubmit() {
    this.isLoaded = false;
    const module: Module = {
      name: this.updateModuleForm.value.name,
      technology: this.updateModuleForm.value.technology,
      proficiency: this.updateModuleForm.value.proficiency
    }

    this.moduleService.updateModule(module, this.id).subscribe(resData => {
      this.message = resData.message;
      this.loadModule(this.id);
      this.isLoaded = true;
    });
  }
  
}
