import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrocreateComponent } from './crocreate.component';

describe('CrocreateComponent', () => {
  let component: CrocreateComponent;
  let fixture: ComponentFixture<CrocreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrocreateComponent]
    });
    fixture = TestBed.createComponent(CrocreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
