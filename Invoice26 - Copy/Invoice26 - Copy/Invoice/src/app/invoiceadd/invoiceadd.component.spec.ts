import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceaddComponent } from './invoiceadd.component';

describe('InvoiceaddComponent', () => {
  let component: InvoiceaddComponent;
  let fixture: ComponentFixture<InvoiceaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
