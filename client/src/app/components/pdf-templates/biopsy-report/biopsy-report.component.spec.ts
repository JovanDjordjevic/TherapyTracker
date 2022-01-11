import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiopsyReportComponent } from './biopsy-report.component';

describe('BiopsyReportComponent', () => {
  let component: BiopsyReportComponent;
  let fixture: ComponentFixture<BiopsyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiopsyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiopsyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
