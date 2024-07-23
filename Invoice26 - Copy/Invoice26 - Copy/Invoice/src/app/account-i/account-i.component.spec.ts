import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountIComponent } from './account-i.component';

describe('AccountIComponent', () => {
  let component: AccountIComponent;
  let fixture: ComponentFixture<AccountIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
