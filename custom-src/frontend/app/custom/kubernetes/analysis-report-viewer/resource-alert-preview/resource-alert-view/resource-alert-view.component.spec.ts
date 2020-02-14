import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAlertViewComponent } from './resource-alert-view.component';

describe('ResourceAlertViewComponent', () => {
  let component: ResourceAlertViewComponent;
  let fixture: ComponentFixture<ResourceAlertViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceAlertViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceAlertViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
