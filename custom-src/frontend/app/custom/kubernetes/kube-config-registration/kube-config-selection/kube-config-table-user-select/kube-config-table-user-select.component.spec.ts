import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubeConfigTableUserSelectComponent } from './kube-config-table-user-select.component';

describe('KubeConfigTableUserSelectComponent', () => {
  let component: KubeConfigTableUserSelectComponent;
  let fixture: ComponentFixture<KubeConfigTableUserSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubeConfigTableUserSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubeConfigTableUserSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
