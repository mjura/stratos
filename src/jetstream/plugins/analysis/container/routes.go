package main

import (
	"errors"
	"os"
	"path/filepath"
	"strings"

	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

// Ping endpoint
func (a *Analyzer) ping(ec echo.Context) error {
	return nil
}

// Get a given report
func (a *Analyzer) report(ec echo.Context) error {

	user := ec.Param("user")
	endpoint := ec.Param("endpoint")
	id := ec.Param("id")
	name := ec.Param("file")

	// Name must end in json - we only serve json files
	if !strings.HasSuffix(name, ".json") {
		return errors.New("Can't serve that file")
	}

	file := filepath.Join(a.reportsDir, user, endpoint, id, name)
	_, err := os.Stat(file)
	if os.IsNotExist(err) {
		return echo.NewHTTPError(404, "No such file")
	}

	return ec.File(file)
}

// Delete a given report
func (a *Analyzer) delete(ec echo.Context) error {
	log.Debug("delete report")

	user := ec.Param("user")
	endpoint := ec.Param("endpoint")
	id := ec.Param("id")
	folder := filepath.Join(a.reportsDir, user, endpoint, id)
	if err := os.RemoveAll(folder); err != nil {
		log.Warnf("Could not delete Analysis report folder: %s", folder)
	}

	return nil
}
