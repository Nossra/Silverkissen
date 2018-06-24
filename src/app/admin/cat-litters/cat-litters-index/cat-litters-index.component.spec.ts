import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatLittersIndexComponent } from './cat-litters-index.component';

describe('CatLittersIndexComponent', () => {
  let component: CatLittersIndexComponent;
  let fixture: ComponentFixture<CatLittersIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatLittersIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatLittersIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
