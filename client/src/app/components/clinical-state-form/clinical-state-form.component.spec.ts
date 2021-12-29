import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalStateFormComponent } from './clinical-state-form.component';

describe('ClinicalStateFormComponent', () => {
  let component: ClinicalStateFormComponent;
  let fixture: ComponentFixture<ClinicalStateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalStateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalStateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
