import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBatchStatusComponent } from './update-batch-status.component';

describe('UpdateBatchStatusComponent', () => {
  let component: UpdateBatchStatusComponent;
  let fixture: ComponentFixture<UpdateBatchStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBatchStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBatchStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
