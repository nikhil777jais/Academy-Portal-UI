import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Module } from '../module';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {

  isLoaded: boolean = false;
  modules: Module[];
  addModuleForm: FormGroup;
  message:string;


  constructor(
    private ModuleService: ModuleService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadModules();
  }

  initForm() {
    this.addModuleForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'technology': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'proficiency': new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  loadModules() {
    this.ModuleService.getModules().subscribe(resData => {
      this.modules = resData;
      this.isLoaded = true;
    });
  }
  onSubmit() {
    this.isLoaded = false;
    const Module: Module = {
      name: this.addModuleForm.value.name,
      technology: this.addModuleForm.value.technology,
      proficiency: this.addModuleForm.value.proficiency,
    }

    //ask for user of operators
    this.ModuleService.addModule(Module).subscribe(resData => {
      this.message = resData.message;
      this.loadModules();
      this.isLoaded = true;
    });
  }

  onDelete(id: number) {
    this.isLoaded = false;
    this.ModuleService.deleteModule(id).subscribe(
      resData => {
        this.message = resData.message;
        this.loadModules();
        this.isLoaded = true;
      },
      error => {
        this.loadModules();
        this.isLoaded = true;
      },
    );
  }
}
