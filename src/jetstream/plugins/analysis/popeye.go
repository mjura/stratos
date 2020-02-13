package analysis

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/analysis/store"
)

type popEyeSummary struct {
	Score int    `json:"score"`
	Grade string `json:"grade"`
}

type popEyeResult struct {
	PopEye popEyeSummary `json:"popeye"`
}

func runPopeye(dbStore store.AnalysisStore, kubeconfig, folder string, report store.AnalysisRecord, body []byte) error {

	// Remove the config file when we are done
	defer (func() {
		os.Remove(kubeconfig)
	})()

	path := ""
	namespace := ""
	options := &popeyeConfig{}
	if err := json.Unmarshal(body, options); err == nil {
		namespace = options.Namespace
		path = namespace

		if len(options.App) > 0 {
			path = fmt.Sprintf("%s/%s", path, options.App)
		}
	}
	report.Name = "Popeye cluster analysis"
	report.Type = "popeye"
	report.Format = "popeye"

	args := []string{"--kubeconfig", kubeconfig, "-o", "json", "--insecure-skip-tls-verify"}
	if len(namespace) > 0 {
		args = append(args, "-n")
		args = append(args, namespace)
	} else {
		args = append(args, "-A")
	}

	report.Path = path
	parts := len(strings.Split(path, "/"))
	if parts == 2 {
		report.Name = fmt.Sprintf("Popeye workload analysis: %s in %s", options.App, namespace)
	} else if parts == 1 {
		report.Name = fmt.Sprintf("Popeye namespace analysis: %s", namespace)
	}

	_, err := dbStore.Save(report)
	if err != nil {
		return err
	}

	cmd := exec.Command("popeye", args...)
	cmd.Dir = folder

	start := time.Now()
	out, err := cmd.Output()
	end := time.Now()
	if err != nil {
		// There was an error
		// Remove the folder
		os.Remove(folder)
		report.Status = "error"
	} else {
		reportFile := filepath.Join(folder, "report.json")
		ioutil.WriteFile(reportFile, out, os.ModePerm)
		report.Status = "completed"

		// Parse the report
		if summary, err := parsePopeyeReport(reportFile); err == nil {
			report.Result = serializePopeyeReport(summary)
		}
	}

	report.Duration = int(end.Sub(start).Seconds())

	dbStore.UpdateReport(report.UserID, &report)
	if err != nil {
		return errors.New("Could not update Analysis Report")
	}

	return nil
}

func parsePopeyeReport(file string) (*popEyeSummary, error) {
	jsonFile, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer jsonFile.Close()

	data, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return nil, err
	}

	result := popEyeResult{}
	if err = json.Unmarshal(data, &result); err != nil {
		return nil, errors.New("Failed to parse Popeye report")
	}

	return &result.PopEye, nil
}

func serializePopeyeReport(summary *popEyeSummary) string {
	jsonString, err := json.Marshal(summary)
	if err != nil {
		return ""
	}

	return string(jsonString)
}

func populateSummary(report *store.AnalysisRecord) {
	if len(report.Result) > 0 {
		data := []byte(report.Result)
		report.Summary = (*json.RawMessage)(&data)
	}
}
