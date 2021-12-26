import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentTabComponent } from './treatment-tab.component';

describe('TreatmentTabComponent', () => {
  let component: TreatmentTabComponent;
  let fixture: ComponentFixture<TreatmentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
