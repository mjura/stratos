package analysis

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"time"

	"github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/analysis/store"

	"github.com/labstack/echo"
	uuid "github.com/satori/go.uuid"
	log "github.com/sirupsen/logrus"
)

type popeyeConfig struct {
	Namespace string `json:"namespace"`
	App       string `json:"app"`
}

type KubeConfigExporter interface {
	GetKubeConfigForEndpointUser(endpointID, userID string) (string, error)
}

func (c *Analysis) runReport(ec echo.Context) error {
	log.Debug("runReport")

	analyzer := ec.Param("analyzer")
	endpointID := ec.Param("endpoint")
	userID := ec.Get("user_id").(string)

	log.Error("Running report")

	log.Warn(analyzer)
	log.Warn(userID)
	log.Warn(endpointID)

	// For now we only support Popeye

	// Look up the endpoint for the user
	var p = c.portalProxy
	endpoint, err := p.GetCNSIRecord(endpointID)
	if err != nil {
		return errors.New("Could not get endpoint information")
	}

	report := store.AnalysisRecord{
		ID:           uuid.NewV4().String(),
		EndpointID:   endpointID,
		EndpointType: endpoint.CNSIType,
		UserID:       userID,
		Path:         "",
		Created:      time.Now(),
		Read:         false,
		Duration:     0,
		Status:       "running",
		Result:       "",
	}

	// Create a folder for the output
	folder := filepath.Join(c.reportsDir, userID, endpointID, report.ID)
	if os.MkdirAll(folder, os.ModePerm) != nil {
		return errors.New("Could not create folder for report output")
	}

	// Create a record in the reports datastore
	dbStore, err := store.NewAnalysisDBStore(p.GetDatabaseConnection())
	if err != nil {
		return err
	}

	// Run the tool (TOOD: in the background)

	log.Error("OK - Running analyzer ... ")

	// Get Kube Config

	k8s := c.portalProxy.GetPlugin("kubernetes")
	if k8s == nil {
		return errors.New("Could not find Kubernetes plugin")
	}

	k8sConfig, ok := k8s.(KubeConfigExporter)
	if !ok {
		return errors.New("Could not find Kubernetes plugin interface")
	}

	config, err := k8sConfig.GetKubeConfigForEndpointUser(endpointID, userID)
	if err != nil {
		return errors.New("Could not get Kube Config for the endpoint")
	}

	file := filepath.Join(folder, "kubeconfig")
	err = ioutil.WriteFile(file, []byte(config), os.ModePerm)
	if err != nil {
		return errors.New("Could not write Kube Config file")
	}

	requestBody := make([]byte, 0)

	// Read body
	defer ec.Request().Body.Close()
	if body, err := ioutil.ReadAll((ec.Request().Body)); err == nil {
		requestBody = body
	}

	switch analyzer {
	case "popeye":
		runPopeye(dbStore, file, folder, report, requestBody)
	case "kube-score":
		runKubeScore(dbStore, file, folder, report, requestBody)
	default:
		return fmt.Errorf("Unkown analyzer: %s", analyzer)
	}

	// It should be running in the background

	resp := "OK"

	return ec.JSON(200, resp)
}
