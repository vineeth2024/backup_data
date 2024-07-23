import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanquetDetailsComponent } from './banquet-details.component';

describe('BanquetDetailsComponent', () => {
  let component: BanquetDetailsComponent;
  let fixture: ComponentFixture<BanquetDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanquetDetailsComponent]
    });
    fixture = TestBed.createComponent(BanquetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
