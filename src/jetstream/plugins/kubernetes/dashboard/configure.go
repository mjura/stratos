package dashboard

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/cloudfoundry-incubator/stratos/src/jetstream/repository/interfaces"
	log "github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"
)

const dashboardInstallYAMLDownloadURL = "https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc2/aio/deploy/recommended.yaml"

const serviceAccountDefinition = `{
	"apiVersion": "v1",
	"kind": "ServiceAccount",
	"metadata": {
		"name": "stratos-dashboard-user",
		"namespace": "kubernetes-dashboard",
		"labels": {
			"stratos-role": "kubernetes-dashboard-user"
		}
	}
}`

const clusterRoleBindingDefinition = `{
	"apiVersion": "rbac.authorization.k8s.io/v1",
	"kind": "ClusterRoleBinding",
	"metadata": {
		"name": "stratos-dashboard-user",
		"labels": {
			"stratos-role": "kubernetes-dashboard-user"
		}
	},
	"roleRef": {
		"apiGroup": "rbac.authorization.k8s.io",
		"kind": "ClusterRole",
		"name": "cluster-admin"
	}, 
	"subjects": [
		{
			"kind": "ServiceAccount",
			"name": "stratos-dashboard-user",
			"namespace": "kubernetes-dashboard"
		}
	]
}`

type apiVersionAndKind struct {
	APIVersion string `json:"apiVersion"`
	Kind       string `json:"kind"`
}

// CreateServiceAccount will create a service account for accessing the Kubernetes Dashboard
func CreateServiceAccount(p interfaces.PortalProxy, endpointGUID, userGUID string) error {
	log.Debug("CreateServiceAccount")

	target := "api/v1/namespaces/kubernetes-dashboard/serviceaccounts"
	//target := "api/v1/serviceaccounts"
	headers := make(http.Header, 0)
	headers.Set("Content-Type", "application/json")

	response, err := p.DoProxySingleRequest(endpointGUID, userGUID, "POST", target, headers, []byte(serviceAccountDefinition))
	if err != nil {
		return err
	}

	if response.StatusCode != 201 {
		return fmt.Errorf("Unable to create Service Account - unexpected response from API: %d", response.StatusCode)
	}

	target = "/apis/rbac.authorization.k8s.io/v1/clusterrolebindings"
	response, err = p.DoProxySingleRequest(endpointGUID, userGUID, "POST", target, headers, []byte(clusterRoleBindingDefinition))
	if err != nil {
		return err
	}

	if response.StatusCode != 201 {
		return fmt.Errorf("Unable to create Cluster Role Binding - unexpected response from API: %d", response.StatusCode)
	}

	return err
}

// DeleteServiceAccount will delete the service account
func DeleteServiceAccount(p interfaces.PortalProxy, endpointGUID, userGUID string) error {
	log.Debug("DeleteServiceAccount")

	svcAccount, err := getKubeDashboardServiceAccount(p, endpointGUID, userGUID, stratosServiceAccountSelector)
	if err != nil {
		return err
	}

	target := fmt.Sprintf("api/v1/namespaces/kubernetes-dashboard/serviceaccounts/%s", svcAccount.Name)
	response, err := p.DoProxySingleRequest(endpointGUID, userGUID, "DELETE", target, nil, nil)
	if err != nil {
		return err
	}

	if response.StatusCode != 200 {
		return fmt.Errorf("Unable to delete Service Account - unexpected response from API: %d", response.StatusCode)
	}

	target = fmt.Sprintf("apis/rbac.authorization.k8s.io/v1/clusterrolebindings/%s", svcAccount.Name)
	response, err = p.DoProxySingleRequest(endpointGUID, userGUID, "DELETE", target, nil, nil)
	if err != nil {
		return err
	}

	if response.StatusCode != 200 {
		return fmt.Errorf("Unable to delete Cluster Role Binding - unexpected response from API: %d", response.StatusCode)
	}

	return err
}

// InstallDashboard will install the dashboard into a Kubernetes cluster
func InstallDashboard(p interfaces.PortalProxy, endpointGUID, userGUID string) error {
	// Download the Yaml for the dashboard
	log.Debugf("InstallDashboardL %s", dashboardInstallYAMLDownloadURL)

	http := p.GetHttpClient(false)
	resp, err := http.Get(dashboardInstallYAMLDownloadURL)
	if resp.StatusCode != 200 {
		return fmt.Errorf("Could not download YAML to install the dashboard: %s", resp.Status)
	}

	defer resp.Body.Close()

	// Read the entire body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("Could not read YAML to install the dashboard: %s", err.Error())
	}

	r := bytes.NewReader(body)
	dec := yaml.NewDecoder(r)
	var t interface{}
	for dec.Decode(&t) == nil {
		jsonDoc, err := YAMLToJSONWithLabel(t)
		if err != nil {
			return fmt.Errorf("Could not convert YAML to JSON during dashboard installation %s", err.Error())
		}

		info := &apiVersionAndKind{}
		if err := json.Unmarshal(jsonDoc, info); err != nil {
			return fmt.Errorf("Could not parse YAML during dashboard installation %s", err.Error())
		}

		// Now create the resource
		var api, resource string
		if info.APIVersion != "v1" {
			api = fmt.Sprintf("apis/%s", info.APIVersion)
		} else {
			api = fmt.Sprintf("api/%s", info.APIVersion)
		}

		if isClusterAPI(info.Kind) {
			if info.Kind == "Namespace" {
				resource = fmt.Sprintf("api/v1/namespaces")
			} else {
				resource = fmt.Sprintf("%s/%ss", api, strings.ToLower(info.Kind))
			}
		} else {
			resource = fmt.Sprintf("%s/namespaces/kubernetes-dashboard/%ss", api, strings.ToLower(info.Kind))
		}

		response, err := p.DoProxySingleRequest(endpointGUID, userGUID, "POST", resource, nil, jsonDoc)
		if err != nil {
			return err
		}

		if response.StatusCode != 201 {
			if !(response.StatusCode == 409 && isClusterAPI(info.Kind)) {
				return fmt.Errorf("Unable to delete %s - unexpected response from API: %d", info.Kind, response.StatusCode)
			}
		}
	}

	return nil
}

func isClusterAPI(api string) bool {
	return strings.HasPrefix(api, "Cluster") || api == "Namespace"
}


// DeleteDashboard will delete the dashboard from Kubernetes cluster
func DeleteDashboard(p interfaces.PortalProxy, endpointGUID, userGUID string) error {
	log.Debug("DeleteDashboard")

	// Delete the namespace 'kubernetes-dashboard'
	target := "api/v1/namespaces/kubernetes-dashboard?propagationPolicy=Background"
	_, err := p.DoProxySingleRequest(endpointGUID, userGUID, "DELETE", target, nil, nil)
	if err != nil {
		return err
	}

	// Delete the cluster role binding
	labelSelector := "stratos-role%3Dkubernetes-dashboard"
	target = fmt.Sprintf("/apis/rbac.authorization.k8s.io/v1/clusterrolebindings?labelSelector=%s", labelSelector)
	_, err = p.DoProxySingleRequest(endpointGUID, userGUID, "DELETE", target, nil, nil)
	if err != nil {
		return err
	}

	return nil
}
