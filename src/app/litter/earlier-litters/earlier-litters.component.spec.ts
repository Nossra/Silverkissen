import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlierLittersComponent } from './earlier-litters.component';

describe('EarlierLittersComponent', () => {
  let component: EarlierLittersComponent;
  let fixture: ComponentFixture<EarlierLittersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarlierLittersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarlierLittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
