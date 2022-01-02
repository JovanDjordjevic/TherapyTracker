import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumorListComponent } from './tumor-list.component';

describe('TumorListComponent', () => {
  let component: TumorListComponent;
  let fixture: ComponentFixture<TumorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TumorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TumorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
