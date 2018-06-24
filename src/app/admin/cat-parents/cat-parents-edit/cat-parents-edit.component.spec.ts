import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatParentsEditComponent } from './cat-parents-edit.component';

describe('CatParentsEditComponent', () => {
  let component: CatParentsEditComponent;
  let fixture: ComponentFixture<CatParentsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatParentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatParentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
