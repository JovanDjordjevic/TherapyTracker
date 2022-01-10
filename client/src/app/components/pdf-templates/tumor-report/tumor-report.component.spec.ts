import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumorReportComponent } from './tumor-report.component';

describe('TumorReportComponent', () => {
  let component: TumorReportComponent;
  let fixture: ComponentFixture<TumorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TumorReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TumorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
