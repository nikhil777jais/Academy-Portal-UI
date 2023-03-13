import { Component, OnInit } from '@angular/core';
import { ModuleSkill } from '../module-skill';
import { ModuleSkillService } from '../module-skill.service';

@Component({
  selector: 'app-mapping-list',
  templateUrl: './mapping-list.component.html',
  styleUrls: ['./mapping-list.component.css']
})
export class MappingListComponent implements OnInit {

  moduleSkills:ModuleSkill[];
  isLoaded:boolean = false
  constructor(
    private moduleSkillService:ModuleSkillService
  ) { }

  ngOnInit(): void {
    this.loadModuleSkills();
  }

  loadModuleSkills(){
    this.moduleSkillService.getMappingList().subscribe(resData => {
      this.moduleSkills = resData;
      this.isLoaded = true;
    });
  }
}
