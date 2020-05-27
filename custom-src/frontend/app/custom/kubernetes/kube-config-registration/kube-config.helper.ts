import * as yaml from 'js-yaml';
import { BehaviorSubject } from 'rxjs';

import { EndpointModel } from '../../../../../store/src/types/endpoint.types';
import { getFullEndpointApiUrl } from '../../../features/endpoints/endpoint-helpers';
import { RowState } from '../../../shared/components/list/data-sources-controllers/list-data-source-types';
import { KubeConfigAuthHelper } from './kube-config-auth.helper';
import { KubeConfigFile, KubeConfigFileCluster, KubeConfigFileUser } from './kube-config.types';

// Helper to parse the kubeconfig and transform it into data
// that we can display in a table for selection

// Main issue is we only support one credential per endpoint, so need to format the data
// to offer the user ability to select which user to import

export class KubeConfigHelper {

  authHelper = new KubeConfigAuthHelper();

  doc: KubeConfigFile;

  clusters: {[name: string]: KubeConfigFileCluster} = {};

  constructor(public endpoints: EndpointModel[]) {}

  public parse(config: string, onUpdate?: any) {

    // TODO: try, catch
    try {
      this.doc = yaml.safeLoad(config);
    } catch (e) {
      return [];
    }

    // Need contexts, users and clusters
    if (!this.doc.contexts || !this.doc.users || !this.doc.clusters) {
      console.warn('Invalid kube config');
      return [];
    }

    // Go through all of the contexts and find the clusters
    if (this.doc.contexts) {
      this.doc.contexts.forEach(ctx => {
        const cluster = this.getCluster(ctx.context.cluster);
        if (cluster) {
          // Found the cluster
          if (!this.clusters[cluster.name]) {
            const clstr = {
              ...cluster,
              _users: []
            };
            this.clusters[cluster.name] = clstr;
            clstr._onUpdate = onUpdate;
            clstr._state = new BehaviorSubject<RowState>({});
          }

          // Get the user
          const user = this.getUser(ctx.context.user);
          if (user) {
            // Check we don't already have this user (remove duplicates)
            const users = this.clusters[cluster.name]._users;
            if (users.findIndex(usr => usr.name === user.name) === -1) {
              this.clusters[cluster.name]._users.push(user);
              if (ctx.name === this.doc['current-context']) {
                // Auto-select this cluster/user if it is the current context
                this.clusters[cluster.name]._user = user.name;
                this.clusters[cluster.name]._selected = true;
              }
            }
          }
        }
      });

      // Go through all clusters, auto-select the user where this is only 1 and check validity
      Object.values(this.clusters).forEach(cluster => {
        if (cluster._users.length === 1) {
          cluster._user = cluster._users[0].name;
        }
        this.checkValidity(cluster);

        // Don't auto-select an invalid item
        if (cluster._selected && cluster._invalid) {
          cluster._selected = false;
        }
      });
    }

    return Object.values(this.clusters);
  }

  private getCluster(name: string): KubeConfigFileCluster {
    return this.doc.clusters.find(item => item.name === name);
  }

  private getUser(name: string): KubeConfigFileUser {
    return this.doc.users.find(item => item.name === name);
  }

  // Check the validity of a cluster for import
  public checkValidity(cluster: KubeConfigFileCluster) {
    console.log('check validity');
    console.log(cluster);
    cluster._invalid = false;
    let reset = true;

    // Check endpoint name
    const found = this.endpoints.find(item => item.name === cluster.name);
    if (found) {
      // If the URL is the same, then we will just connect to the existing endpoint
      if (getFullEndpointApiUrl(found) === cluster.cluster.server) {
        cluster._guid = found.guid;
        cluster._state.next({ message: 'This endpoint already exists - will connect to the existing endpoint', info: true });
        reset = false;
      } else {
        // An endpoint with the same name (but different URL) already exists
        cluster._invalid = true;
        cluster._state.next({ message: 'An endpoint with this name already exists', warning: true });
      }
    } else {
      // Check endpoint url is not registered with a different name
      const foundUrl = this.endpoints.find(item => getFullEndpointApiUrl(item) === cluster.cluster.server);
      if (foundUrl) {
        cluster._invalid = true;
        cluster._state.next({ message: 'An endpoint with this URL already exists', warning: true });
      }
    }

    // Check the connection details
    if (!cluster._invalid && cluster._user) {
      const user = cluster._users.find(item => item.name === cluster._user);
      console.log(user);
      if (user) {
        this.authHelper.parseAuth(cluster, user);
        if (user.user['client-certificate'] || user.user['client-key']) {
          cluster._invalid = true;
          cluster._state.next({ message: 'This endpoint requires additional information', warning: true });
        }
      }
    }

    // Cluster is valid, so clear any warning or error message
    if (!cluster._invalid && reset) {
      cluster._state.next({});
    }
  }
}
