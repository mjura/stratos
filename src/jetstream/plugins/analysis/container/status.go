package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"

	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

func (a *Analyzer) status(ec echo.Context) error {
	err := a.doStatus(ec)
	if err != nil {
		log.Error(err)
	}
	return err
}

func (a *Analyzer) doStatus(ec echo.Context) error {
	log.Debug("Status")
	req := ec.Request()

	// Body contains an array of IDs that the client thinks are running
	// We send back updated status for each

	// Get the list of IDs
	defer req.Body.Close()
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		return errors.New("Could not read body")
	}

	ids := make([]string, 0)
	if err := json.Unmarshal(body, &ids); err != nil {
		return errors.New("Failed to parse body")
	}

	cleanup := make([]string, 0)

	response := make(map[string]AnalysisJob)
	for _, id := range ids {
		if a.jobs[id] == nil {
			// Client has a running job that we know nothing about - so must be an error
			job := AnalysisJob{
				ID:     id,
				Status: "error",
			}
			response[id] = job
		} else {
			response[id] = *a.jobs[id]

			// If the job has finished, increement the cleanup counter
			// We will remove it from our cache once we are pretty sure Jetstream has the status
			if !a.jobs[id].Busy {
				a.jobs[id].CleanupCounter = a.jobs[id].CleanupCounter + 1
				if a.jobs[id].CleanupCounter > 5 {
					cleanup = append(cleanup, id)
				}
			}
		}

		for _, id := range cleanup {
			log.Errorf("Removing job >>>> %s", id)
			delete(a.jobs, id)
		}
	}

	ec.JSON(200, response)
	return nil
}
