import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumorFormComponent } from './tumor-form.component';

describe('TumorFormComponent', () => {
  let component: TumorFormComponent;
  let fixture: ComponentFixture<TumorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TumorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TumorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
