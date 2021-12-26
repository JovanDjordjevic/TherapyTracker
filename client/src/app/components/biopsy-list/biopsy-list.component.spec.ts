import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiopsyListComponent } from './biopsy-list.component';

describe('BiopsyListComponent', () => {
  let component: BiopsyListComponent;
  let fixture: ComponentFixture<BiopsyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiopsyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiopsyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
