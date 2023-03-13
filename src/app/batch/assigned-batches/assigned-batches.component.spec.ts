import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedBatchesComponent } from './assigned-batches.component';

describe('AssignedBatchesComponent', () => {
  let component: AssignedBatchesComponent;
  let fixture: ComponentFixture<AssignedBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedBatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
