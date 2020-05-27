import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubeConfigTableImportStatusComponent } from './kube-config-table-import-status.component';

describe('KubeConfigTableImportStatusComponent', () => {
  let component: KubeConfigTableImportStatusComponent;
  let fixture: ComponentFixture<KubeConfigTableImportStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubeConfigTableImportStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubeConfigTableImportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
