import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiopsyComponent } from './biopsy.component';

describe('BiopsyComponent', () => {
  let component: BiopsyComponent;
  let fixture: ComponentFixture<BiopsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiopsyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiopsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
