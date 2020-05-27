import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubeConfigTableSelectComponent } from './kube-config-table-select.component';

describe('KubeConfigTableSelectComponent', () => {
  let component: KubeConfigTableSelectComponent;
  let fixture: ComponentFixture<KubeConfigTableSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubeConfigTableSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubeConfigTableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
