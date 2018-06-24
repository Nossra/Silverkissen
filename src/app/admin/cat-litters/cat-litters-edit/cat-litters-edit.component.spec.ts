import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatLittersEditComponent } from './cat-litters-edit.component';

describe('CatLittersEditComponent', () => {
  let component: CatLittersEditComponent;
  let fixture: ComponentFixture<CatLittersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatLittersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatLittersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
