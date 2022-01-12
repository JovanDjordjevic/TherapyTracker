import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiopsyInfoComponent } from './biopsy-info.component';

describe('BiopsyInfoComponent', () => {
  let component: BiopsyInfoComponent;
  let fixture: ComponentFixture<BiopsyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiopsyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiopsyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
