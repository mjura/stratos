package main

import (
	"os"
	"path/filepath"

	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

func (a *Analyzer) ping(ec echo.Context) error {

	log.Info("PING!")

	return nil

}

// Get a given report
func (a *Analyzer) report(ec echo.Context) error {

	user := ec.Param("user")
	endpoint := ec.Param("endpoint")
	id := ec.Param("id")
	file := filepath.Join(a.reportsDir, user, endpoint, id, "report.json")
	log.Info(file)

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
