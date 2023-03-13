import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToFacultyComponent } from './assign-to-faculty.component';

describe('AssignToFacultyComponent', () => {
  let component: AssignToFacultyComponent;
  let fixture: ComponentFixture<AssignToFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignToFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignToFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
