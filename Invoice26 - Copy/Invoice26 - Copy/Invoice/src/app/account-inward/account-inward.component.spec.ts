import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInwardComponent } from './account-inward.component';

describe('AccountInwardComponent', () => {
  let component: AccountInwardComponent;
  let fixture: ComponentFixture<AccountInwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountInwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
