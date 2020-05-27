import { ComponentFactoryResolver, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { entityCatalog } from '../../../../../store/src/entity-catalog/entity-catalog.service';
import { ConnectEndpointData } from '../../../features/endpoints/connect.service';
import { KUBERNETES_ENDPOINT_TYPE } from '../kubernetes-entity-factory';
import { EndpointAuthTypeConfig, IAuthForm } from './../../../core/extension/extension-types';
import { KubeConfigFileCluster, KubeConfigFileUser } from './kube-config.types';

// Auth helper tries to figure out the Kubernetes sub-type and auth to use
// based on the kube config file contents

export class KubeConfigAuthHelper {

  authTypes: {[name: string]: EndpointAuthTypeConfig} = {};

  public subTypes = [];

  constructor() {
    const epTypeInfo = entityCatalog.getAllEndpointTypes(false);
    const k8s = epTypeInfo.find(entity => entity.type === KUBERNETES_ENDPOINT_TYPE);
    if (k8s && k8s.definition) {
      const defn = k8s.definition;

      // Collect all of the auth types
      defn.authTypes.forEach(at => {
        this.authTypes[at.value] = at;
      });

      this.subTypes.push({id: '', name: 'Generic'});

      // Collect all of the auth types for the sub-types
      defn.subTypes.forEach(st => {
        if (st.type !== 'config') {
          this.subTypes.push({id: st.type, name: st.labelShort});
        }
        st.authTypes.forEach(at => {
          this.authTypes[at.value] = at;
        });
      });

      // Sort the subtypes
      this.subTypes = this.subTypes.sort((a , b) => a.name.localeCompare(b.name));
    }
  }

  // Try and parse the authentication metadata
  public parseAuth(cluster: KubeConfigFileCluster, user: KubeConfigFileUser): boolean {

    // Default subtype is generic Kubernetes
    cluster._subType = '';

    // Certificate authentication first

    // In-file certificate authentication
    if (user.user['client-certificate-data'] && user.user['client-key-data']) {
      // We are good to go - create the form data

      // Default is generic kubernetes
      let subType = '';
      const authType = 'kube-cert-auth';
      if (user.user.token) {
        // Probably Azure
        subType = 'aks';
        cluster._subType = 'aks';
      }

      const authData = {
        authType,
        subType,
        values: {
          cert: user.user['client-certificate-data'],
          certKey: user.user['client-key-data']
        }
      };
      user._authData = authData;
      return true;
    }

    const authProvider = user.user['auth-provider'];


    if (authProvider && authProvider.config) {
      console.log('auth provider');
      console.log(authProvider);
      if (authProvider.config['cmd-path'] && authProvider.config['cmd-path'].indexOf('gcloud') !== -1 ) {
        // GKE
        cluster._subType = 'gke';
        console.log('GKE');
        // Can not connect to GKE - user must do so manually
        cluster._registerOnly = true;
        cluster._state.next({
          message: 'This endpoint will be registered but not connected (additional information is required)',
          warning: true
        });
        return true;
      }
    }

  // if (user.user['client-certificate'] || user.user['client-key']) {
    //   cluster._invalid = true;
    //   cluster._state.next({ message: 'This endpoint requires additional information', warning: true });
    // }

    cluster._invalid = true;
    cluster._state.next({ message: 'Authentication mechanism is not supported', warning: true });
    return false;
  }

  // Use the auto component to get the data in the correct format for connecting to the endpoint
  public getAuthDataForConnect(resolver: ComponentFactoryResolver, injector: Injector, fb: FormBuilder, user: KubeConfigFileUser)
  : ConnectEndpointData | null {

    let data = null;

    // Get the component to us
    if (user && user._authData) {
      // console.log(user);
      const authType = this.authTypes[user._authData.authType];
      // console.log(authType);
      // console.log(this.authTypes);

      const factory = resolver.resolveComponentFactory<IAuthForm>(authType.component);

      const ref = factory.create(injector);

      // console.log(ref);
      // console.log(authType);

      const form = fb.group({
        authType: authType.value,
        systemShared: false,
        authValues: fb.group(user._authData.values)
      });

      ref.instance.formGroup = form;

        // Allow the auth form to supply body content if it needs to
      const endpointFormInstance = ref.instance as any;
      if (endpointFormInstance.getBody && endpointFormInstance.getValues) {
        data = {
          authType: authType.value,
          authVal: endpointFormInstance.getValues(user._authData.values),
          systemShared: false,
          bodyContent: endpointFormInstance.getBody()
        };
      }
      ref.destroy();
    }
    return data;
  }
}
