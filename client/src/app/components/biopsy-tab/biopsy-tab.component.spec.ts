import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiopsyTabComponent } from './biopsy-tab.component';

describe('BiopsyTabComponent', () => {
  let component: BiopsyTabComponent;
  let fixture: ComponentFixture<BiopsyTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiopsyTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiopsyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
