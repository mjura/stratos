import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubedashConfigurationComponent } from './kubedash-configuration.component';

describe('KubedashConfigurationComponent', () => {
  let component: KubedashConfigurationComponent;
  let fixture: ComponentFixture<KubedashConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubedashConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubedashConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
