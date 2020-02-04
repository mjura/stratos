import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesPodContainersComponent } from './kubernetes-pod-containers.component';

describe('KubernetesPodContainersComponent', () => {
  let component: KubernetesPodContainersComponent;
  let fixture: ComponentFixture<KubernetesPodContainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubernetesPodContainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesPodContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
