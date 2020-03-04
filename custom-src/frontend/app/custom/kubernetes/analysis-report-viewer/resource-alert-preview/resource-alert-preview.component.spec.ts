import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAlertPreviewComponent } from './resource-alert-preview.component';
import { ResourceAlertViewComponent } from './resource-alert-view/resource-alert-view.component';

describe('ResourceAlertPreviewComponent', () => {
  let component: ResourceAlertPreviewComponent;
  let fixture: ComponentFixture<ResourceAlertPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceAlertPreviewComponent, ResourceAlertViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceAlertPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
