import { TestBed } from '@angular/core/testing';

import { ModuleSkillService } from './module-skill.service';

describe('ModuleSkillService', () => {
  let service: ModuleSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
