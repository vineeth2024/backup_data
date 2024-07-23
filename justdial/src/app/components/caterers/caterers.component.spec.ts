import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaterersComponent } from './caterers.component';

describe('CaterersComponent', () => {
  let component: CaterersComponent;
  let fixture: ComponentFixture<CaterersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaterersComponent]
    });
    fixture = TestBed.createComponent(CaterersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
