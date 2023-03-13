import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedBatch } from '../detailed-batch';

@Component({
  selector: 'app-batch-item',
  templateUrl: './batch-item.component.html',
  styleUrls: ['./batch-item.component.css']
})
export class BatchItemComponent implements OnInit {
  @Input() batch: DetailedBatch
  @Output() onRemoveFaculty = new EventEmitter<string>();
  isRemoveMode:boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.routeConfig.path === 'assign-to-faculty/:batchId')
      this.isRemoveMode = true;
  }

  removeFaculty(facultyId:string){
    this.onRemoveFaculty.emit(facultyId);
  }
}
