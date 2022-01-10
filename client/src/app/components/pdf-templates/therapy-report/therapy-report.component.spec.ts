import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyReportComponent } from './therapy-report.component';

describe('TherapyReportComponent', () => {
  let component: TherapyReportComponent;
  let fixture: ComponentFixture<TherapyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
