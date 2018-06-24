import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCatsComponent } from './our-cats.component';

describe('OurCatsComponent', () => {
  let component: OurCatsComponent;
  let fixture: ComponentFixture<OurCatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurCatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
