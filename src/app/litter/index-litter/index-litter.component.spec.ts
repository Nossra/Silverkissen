import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexLitterComponent } from './index-litter.component';

describe('IndexLitterComponent', () => {
  let component: IndexLitterComponent;
  let fixture: ComponentFixture<IndexLitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexLitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexLitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
