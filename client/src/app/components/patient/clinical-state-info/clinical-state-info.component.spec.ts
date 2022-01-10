import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalStateInfoComponent } from './clinical-state-info.component';

describe('ClinicalStateInfoComponent', () => {
  let component: ClinicalStateInfoComponent;
  let fixture: ComponentFixture<ClinicalStateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalStateInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalStateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
