import { Component, OnInit } from '@angular/core';
import { Batch } from '../batch';
import { BatchService } from '../batch.service';

@Component({
  selector: 'app-assigned-batches',
  templateUrl: './assigned-batches.component.html',
  styleUrls: ['./assigned-batches.component.css']
})
export class AssignedBatchesComponent implements OnInit {
  batches: Batch[];
  isLoaded:boolean = false;
  
  constructor(
    private batchService: BatchService,
  ) { }

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches() {
    return this.batchService.getUserBatches().subscribe(resData => {
      this.batches = resData;
      this.isLoaded = true;
    });
  } 
}
