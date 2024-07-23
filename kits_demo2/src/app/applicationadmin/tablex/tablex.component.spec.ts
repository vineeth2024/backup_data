import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablexComponent } from './tablex.component';

describe('TablexComponent', () => {
  let component: TablexComponent;
  let fixture: ComponentFixture<TablexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
