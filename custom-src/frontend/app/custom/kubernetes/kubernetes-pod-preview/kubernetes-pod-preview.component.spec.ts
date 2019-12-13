import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTestingModule } from '../../../../test-framework/core-test.modules';
import { createBasicStoreModule } from '../../../../test-framework/store-test-helper';
import { LoggerService } from '../../../core/logger.service';
import { KubernetesPodPreviewComponent } from './kubernetes-pod-preview.component';

describe('KubernetesPodPreviewComponent', () => {
  let component: KubernetesPodPreviewComponent;
  let fixture: ComponentFixture<KubernetesPodPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KubernetesPodPreviewComponent],
      providers: [LoggerService, HttpClient, HttpHandler],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        CoreTestingModule,
        createBasicStoreModule()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesPodPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
