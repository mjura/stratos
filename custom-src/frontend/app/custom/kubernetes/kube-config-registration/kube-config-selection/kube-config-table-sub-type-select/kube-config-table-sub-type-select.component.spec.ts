import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubeConfigTableSubTypeSelectComponent } from './kube-config-table-sub-type-select.component';

describe('KubeConfigTableSubTypeSelectComponent', () => {
  let component: KubeConfigTableSubTypeSelectComponent;
  let fixture: ComponentFixture<KubeConfigTableSubTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubeConfigTableSubTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubeConfigTableSubTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
