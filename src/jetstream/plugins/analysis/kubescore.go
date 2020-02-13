package analysis

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"time"

	"github.com/cloudfoundry-incubator/stratos/src/jetstream/plugins/analysis/store"
	log "github.com/sirupsen/logrus"
)

// type popEyeSummary struct {
// 	Score int    `json:"score"`
// 	Grade string `json:"grade"`
// }

// type popEyeResult struct {
// 	PopEye popEyeSummary `json:"popeye"`
// }

func runKubeScore(dbStore store.AnalysisStore, kubeconfig, folder string, report store.AnalysisRecord, body []byte) error {

	// Remove the config file when we are done
	defer (func() {
		os.Remove(kubeconfig)
	})()

	namespace := ""
	options := &popeyeConfig{}
	if err := json.Unmarshal(body, options); err == nil {
		namespace = options.Namespace
	}
	report.Name = "Kube-score cluster analysis"
	report.Type = "kubescore"
	report.Format = "kubescore"

	args := []string{"/Users/nwm/tmp/analysis/kubescore-runner", kubeconfig, namespace}
	if len(namespace) > 0 {
		report.Name = fmt.Sprintf("Kube-score namespace analysis: %s", namespace)
		report.Path = namespace
	}

	_, err := dbStore.Save(report)
	if err != nil {
		return err
	}

	// Use our custom script which is a wrapper around kubescore
	cmd := exec.Command("bash", args...)
	cmd.Dir = folder
	cmd.Env = make([]string, 0)
	cmd.Env = append(cmd.Env, fmt.Sprintf("KUBECONFIG=%s", kubeconfig))
	log.Info(kubeconfig)

	start := time.Now()
	out, err := cmd.Output()
	end := time.Now()
	if err != nil {
		// There was an error
		// Remove the folder
		os.Remove(folder)
		log.Error(">>>>>>>>> ERROR <<<<<<<<<")
		log.Error(string(out))
		log.Error(err)
		report.Status = "error"
	} else {
		// reportFile := filepath.Join(folder, "report.json")
		// ioutil.WriteFile(reportFile, out, os.ModePerm)
		report.Status = "completed"

		// Parse the report
		// if summary, err := parsePopeyeReport(reportFile); err == nil {
		// 	report.Result = serializePopeyeReport(summary)
		// }
	}

	report.Duration = int(end.Sub(start).Seconds())

	dbStore.UpdateReport(report.UserID, &report)
	if err != nil {
		return errors.New("Could not update Analysis Report")
	}

	return nil
}
