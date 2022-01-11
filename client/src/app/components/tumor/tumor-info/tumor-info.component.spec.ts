import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumorInfoComponent } from './tumor-info.component';

describe('TumorInfoComponent', () => {
  let component: TumorInfoComponent;
  let fixture: ComponentFixture<TumorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TumorInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TumorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
