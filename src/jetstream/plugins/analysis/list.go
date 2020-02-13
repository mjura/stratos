package analysis

import (
	//"errors"

	//"github.com/cloudfoundry-incubator/stratos/src/jetstream/repository/interfaces"

	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"strings"

	"github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/analysis/store"

	"github.com/labstack/echo"

	log "github.com/sirupsen/logrus"
)

// listReports will list the analysis repotrs that have run
func (c *Analysis) listReports(ec echo.Context) error {
	log.Debug("listReports")
	var p = c.portalProxy

	// Need to get a config object for the target endpoint
	// endpointGUID := ec.Param("endpoint")
	userID := ec.Get("user_id").(string)

	// Create a record in the reports datastore
	dbStore, err := store.NewAnalysisDBStore(p.GetDatabaseConnection())
	if err != nil {
		return err
	}

	reports, err := dbStore.List(userID)
	if err != nil {
		return err
	}

	for _, report := range reports {
		populateSummary(report)
	}

	return ec.JSON(200, reports)
}

// getReportsByPath will list the completed analysis repotrs that have run for the specified path
func (c *Analysis) getReportsByPath(ec echo.Context) error {
	log.Debug("getReportsByPath")
	var p = c.portalProxy

	// Need to get a config object for the target endpoint
	// endpointGUID := ec.Param("endpoint")
	userID := ec.Get("user_id").(string)
	endpointID := ec.Param("endpoint")

	log.Info("getReportsByPath")
	log.Info(ec.Request().RequestURI)

	pathPrefix := fmt.Sprintf("completed/%s/", endpointID)
	index := strings.Index(ec.Request().RequestURI, pathPrefix)

	log.Info(pathPrefix)
	log.Info(index)
	if index < 0 {
		return errors.New("Invalid request")
	}
	path := ec.Request().RequestURI[index+len(pathPrefix):]

	// Create a record in the reports datastore
	dbStore, err := store.NewAnalysisDBStore(p.GetDatabaseConnection())
	if err != nil {
		return err
	}

	reports, err := dbStore.ListCompletedByPath(userID, endpointID, path)
	if err != nil {
		return err
	}

	for _, report := range reports {
		populateSummary(report)
	}

	return ec.JSON(200, reports)
}

func (c *Analysis) getLatestReport(ec echo.Context) error {
	log.Debug("getLatestReport")
	var p = c.portalProxy

	// Need to get a config object for the target endpoint
	userID := ec.Get("user_id").(string)
	endpointID := ec.Param("endpoint")

	pathPrefix := fmt.Sprintf("latest/%s/", endpointID)
	index := strings.Index(ec.Request().RequestURI, pathPrefix)
	if index < 0 {
		return errors.New("Invalid request")
	}
	path := ec.Request().RequestURI[index+len(pathPrefix):]

	// Create a record in the reports datastore
	dbStore, err := store.NewAnalysisDBStore(p.GetDatabaseConnection())
	if err != nil {
		return err
	}

	report, err := dbStore.GetLatestCompleted(userID, endpointID, path)
	if err != nil {
		return echo.NewHTTPError(404, "No Analysis Report found")
	}

	if ec.Request().Method == "HEAD" {
		ec.Response().Status = 200
		return nil
	}

	// Must be a GET request, so send the report and the contents
	file := filepath.Join(c.reportsDir, report.UserID, report.EndpointID, report.ID, "report.json")
	bytes, err := ioutil.ReadFile(file)
	if err != nil {
		return err
	}

	report.Report = (*json.RawMessage)(&bytes)
	return ec.JSON(200, report)
}

func (c *Analysis) getReport(ec echo.Context) error {
	log.Debug("getReport")
	var p = c.portalProxy

	// Need to get a config object for the target endpoint
	userID := ec.Get("user_id").(string)
	ID := ec.Param("id")

	// Create a record in the reports datastore
	dbStore, err := store.NewAnalysisDBStore(p.GetDatabaseConnection())
	if err != nil {
		return err
	}

	report, err := dbStore.Get(userID, ID)
	if err != nil {
		return err
	}

	// Must be a GET request, so send the report and the contents
	file := filepath.Join(c.reportsDir, report.UserID, report.EndpointID, report.ID, "report.json")
	bytes, err := ioutil.ReadFile(file)
	if err != nil {
		return err
	}

	report.Report = (*json.RawMessage)(&bytes)
	return ec.JSON(200, report)
}

func (c *Analysis) deleteReports(ec echo.Context) error {
	log.Debug("deleteReports")
	var p = c.portalProxy

	// Need to get a config object for the target endpoint
	// endpointGUID := ec.Param("endpoint")
	userID := ec.Get("user_id").(string)

	defer ec.Request().Body.Close()
	body, err := ioutil.ReadAll(ec.Request().Body)
	if err != nil {
		return err
	}

	var ids []string
	ids = make([]string, 0)

	if err = json.Unmarshal(body, &ids); err != nil {
		return err
	}

	dbStore, err := store.NewAnalysisDBStore(p.GetDatabaseConnection())
	if err != nil {
		return err
	}

	log.Errorf("%+v", ids)

	for _, id := range ids {
		log.Warn(id)
		dbStore.Delete(userID, id)
	}

	return ec.JSON(200, ids)
}
