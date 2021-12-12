import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalStateTabComponent } from './medical-state-tab.component';

describe('MedicalStateTabComponent', () => {
  let component: MedicalStateTabComponent;
  let fixture: ComponentFixture<MedicalStateTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalStateTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalStateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
