import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellIconComponent } from './table-cell-icon.component';

describe('TableCellIconComponent', () => {
  let component: TableCellIconComponent;
  let fixture: ComponentFixture<TableCellIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCellIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
