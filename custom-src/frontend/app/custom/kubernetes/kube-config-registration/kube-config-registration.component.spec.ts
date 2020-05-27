import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubeConfigRegistrationComponent } from './kube-config-registration.component';

describe('KubeConfigRegistrationComponent', () => {
  let component: KubeConfigRegistrationComponent;
  let fixture: ComponentFixture<KubeConfigRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubeConfigRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubeConfigRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
