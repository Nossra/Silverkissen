import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedLittersComponent } from './planned-litters.component';

describe('PlannedLittersComponent', () => {
  let component: PlannedLittersComponent;
  let fixture: ComponentFixture<PlannedLittersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedLittersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedLittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
