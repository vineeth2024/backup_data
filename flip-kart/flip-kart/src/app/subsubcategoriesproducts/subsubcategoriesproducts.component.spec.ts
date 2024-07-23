import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcategoriesproductsComponent } from './subsubcategoriesproducts.component';

describe('SubsubcategoriesproductsComponent', () => {
  let component: SubsubcategoriesproductsComponent;
  let fixture: ComponentFixture<SubsubcategoriesproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubsubcategoriesproductsComponent]
    });
    fixture = TestBed.createComponent(SubsubcategoriesproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
