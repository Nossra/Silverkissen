import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatParentsCreateComponent } from './cat-parents-create.component';

describe('CatParentsCreateComponent', () => {
  let component: CatParentsCreateComponent;
  let fixture: ComponentFixture<CatParentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatParentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatParentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
