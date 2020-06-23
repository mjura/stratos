import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EndpointAuthValues, IEndpointAuthComponent } from '../../../../../../core/src/core/extension/extension-types';

@Component({
  selector: 'app-kubernetes-config-auth-form',
  templateUrl: './kubernetes-config-auth-form.component.html',
  styleUrls: ['./kubernetes-config-auth-form.component.scss']
})
export class KubernetesConfigAuthFormComponent implements IEndpointAuthComponent {
  @Input() formGroup: FormGroup;

  public getValues(values: EndpointAuthValues): EndpointAuthValues {
    return {};
  }

  public getBody(): string {
    return this.formGroup.value.authValues.kubeconfig;
  }
}
