package analysis

import (
	"errors"
	"os"
	"path/filepath"

	"github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/analysis/store"
	"github.com/cloudfoundry-incubator/stratos/src/jetstream/repository/interfaces"

	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

const reportsDirEnvVar = "ANALYSIS_REPORTS_DIR"

// Analysis - Plugin to allow analysers to run over an endpoint cluster
type Analysis struct {
	portalProxy interfaces.PortalProxy
	reportsDir  string
}

// Init creates a new Analysis
func Init(portalProxy interfaces.PortalProxy) (interfaces.StratosPlugin, error) {
	store.InitRepositoryProvider(portalProxy.GetConfig().DatabaseProviderName)
	return &Analysis{portalProxy: portalProxy}, nil
}

// GetMiddlewarePlugin gets the middleware plugin for this plugin
func (Analysis *Analysis) GetMiddlewarePlugin() (interfaces.MiddlewarePlugin, error) {
	return nil, errors.New("Not implemented")
}

// GetEndpointPlugin gets the endpoint plugin for this plugin
func (Analysis *Analysis) GetEndpointPlugin() (interfaces.EndpointPlugin, error) {
	return nil, errors.New("Not implemented")
}

// GetRoutePlugin gets the route plugin for this plugin
func (Analysis *Analysis) GetRoutePlugin() (interfaces.RoutePlugin, error) {
	return Analysis, nil
}

// AddAdminGroupRoutes adds the admin routes for this plugin to the Echo server
func (Analysis *Analysis) AddAdminGroupRoutes(echoGroup *echo.Group) {
	// no-op
}

// AddSessionGroupRoutes adds the session routes for this plugin to the Echo server
func (Analysis *Analysis) AddSessionGroupRoutes(echoGroup *echo.Group) {
	echoGroup.GET("/analysis/reports", Analysis.listReports)
	echoGroup.GET("/analysis/reports/:id", Analysis.getReport)

	// Get completed reports for the given path
	echoGroup.GET("/analysis/completed/:endpoint/*", Analysis.getReportsByPath)

	// Get latest report
	echoGroup.GET("/analysis/latest/:endpoint/*", Analysis.getLatestReport)
	echoGroup.HEAD("/analysis/latest/:endpoint/*", Analysis.getLatestReport)

	echoGroup.DELETE("/analysis/reports", Analysis.deleteReports)

	// Run report
	echoGroup.POST("/analysis/run/:analyzer/:endpoint", Analysis.runReport)
}

// Init performs plugin initialization
func (analysis *Analysis) Init() error {
	log.Info("Analysis plugin loaded")

	// Init reports directory
	if reportsDir, ok := analysis.portalProxy.Env().Lookup(reportsDirEnvVar); ok {
		dir, err := filepath.Abs(reportsDir)
		if err != nil {
			return err
		}
		analysis.reportsDir = dir

		// Make the directory if it does not exit
		if _, err := os.Stat(dir); os.IsNotExist(err) {
			if os.MkdirAll(dir, os.ModePerm) != nil {
				return errors.New("Could not create folder for analysis reports")
			}
		}
		return nil
	}

	return errors.New("Analysis reports folder not configured")
}
