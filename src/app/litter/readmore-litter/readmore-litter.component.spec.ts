import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmoreLitterComponent } from './readmore-litter.component';

describe('ReadmoreLitterComponent', () => {
  let component: ReadmoreLitterComponent;
  let fixture: ComponentFixture<ReadmoreLitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadmoreLitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadmoreLitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
