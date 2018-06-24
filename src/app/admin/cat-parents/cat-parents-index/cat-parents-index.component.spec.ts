import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatParentsIndexComponent } from './cat-parents-index.component';

describe('CatParentsIndexComponent', () => {
  let component: CatParentsIndexComponent;
  let fixture: ComponentFixture<CatParentsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatParentsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatParentsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
