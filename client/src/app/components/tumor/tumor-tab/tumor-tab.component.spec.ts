import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumorTabComponent } from './tumor-tab.component';

describe('TumorTabComponent', () => {
  let component: TumorTabComponent;
  let fixture: ComponentFixture<TumorTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TumorTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TumorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
