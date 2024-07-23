import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileGridComponent } from './admin-profile-grid.component';

describe('AdminProfileGridComponent', () => {
  let component: AdminProfileGridComponent;
  let fixture: ComponentFixture<AdminProfileGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfileGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProfileGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
