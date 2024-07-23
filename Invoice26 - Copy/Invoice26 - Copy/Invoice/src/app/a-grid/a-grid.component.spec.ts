import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AGridComponent } from './a-grid.component';

describe('AGridComponent', () => {
  let component: AGridComponent;
  let fixture: ComponentFixture<AGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
