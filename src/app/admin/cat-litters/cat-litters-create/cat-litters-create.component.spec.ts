import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatLittersCreateComponent } from './cat-litters-create.component';

describe('CatLittersCreateComponent', () => {
  let component: CatLittersCreateComponent;
  let fixture: ComponentFixture<CatLittersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatLittersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatLittersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
