package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	log "github.com/sirupsen/logrus"
)

const (
	imagesFile = "images.txt"
)

type klarImage struct {
	Name       string `json:"name"`
	ResultFile string `json:"details"`
	Error      bool   `json:"error"`
	LayerCount int    `json:"layerCount"`
}

type klarResult struct {
	Images []klarImage `json:"images"`
}

type klarReport struct {
	LayerCount int `json:"LayerCount"`
	//Vulnerabilities `json:"Vulnerabilities"`
}

func runClair(job *AnalysisJob) error {

	log.Debug("Running Clair job")

	job.Busy = true
	job.Type = "clair"
	job.Format = "clair"
	setJobNameAndPath(job, "Clair")

	scriptPath := filepath.Join(getScriptFolder(), "clair-runner.sh")
	args := []string{scriptPath, job.KuebConfigPath, job.Config.Namespace}
	log.Error(scriptPath)

	go func() {
		// Use our custom script which is a wrapper around kubescore
		cmd := exec.Command("bash", args...)
		cmd.Dir = job.Folder

		// Inherit parent environment
		cmd.Env = os.Environ()

		//cmd.Env = make([]string, 0)
		cmd.Env = append(cmd.Env, fmt.Sprintf("KUBECONFIG=%s", job.KuebConfigPath))

		start := time.Now()
		out, err := cmd.CombinedOutput()
		end := time.Now()

		log.Info("Completed running clar")
		log.Info(err)

		// Remove any config files when done

		// TODO: THIS MUST GO BACK IN
		//job.RemoveTempFiles()

		job.Duration = int(end.Sub(start).Seconds())

		if err != nil {
			// There was an error
			// Remove the folder
			os.Remove(job.Folder)
			log.Error(">>>>>>>>> ERROR <<<<<<<<<")
			log.Error(string(out))
			log.Error(err)
			job.Status = "error"
		} else {
			reportFile := filepath.Join(job.Folder, "report.log")
			ioutil.WriteFile(reportFile, out, os.ModePerm)
			job.Status = "completed"

			err := klarProcess(job.Folder)
			if err != nil {
				job.Status = "error"
			}
		}
	}()

	return nil
}

func klarProcess(folder string) error {

	// Need there to be an index file
	imagesFilePath := filepath.Join(folder, imagesFile)
	log.Info(imagesFilePath)

	_, err := os.Stat(imagesFilePath)
	if os.IsNotExist(err) {
		log.Warn("File does not exist")
		return err
	}

	// Read it
	file, err := os.Open(imagesFilePath)
	if err != nil {
		log.Warn("Could not open file")
		return err
	}
	defer file.Close()

	result := klarResult{}
	result.Images = make([]klarImage, 0)

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		name := scanner.Text()
		if len(name) > 0 {
			image := klarImage{}
			image.Name = scanner.Text()

			klarProcessImage(folder, &image)
			result.Images = append(result.Images, image)
		}
	}

	// Write the report json
	data, err := json.Marshal(result)
	if err != nil {
		return err
	}

	reportFile := filepath.Join(folder, "report.json")
	ioutil.WriteFile(reportFile, data, os.ModePerm)

	return nil
}

func klarProcessImage(folder string, image *klarImage) {

	// Check for the log file
	logName := strings.ReplaceAll(image.Name, "/", "_")
	logName = strings.ReplaceAll(logName, ":", "_")
	image.ResultFile = logName + ".json"

	// No log file means an error
	logFile := filepath.Join(folder, image.ResultFile)
	info, err := os.Stat(logFile)
	image.Error = os.IsNotExist(err)

	if !image.Error {
		// Also an error if the file size if 0
		image.Error = info.Size() == 0
		if !image.Error {
			// Read the file so we can get a summary
			data, err := ioutil.ReadFile(logFile)
			if err != nil {
				image.Error = true
			} else {
				report := klarReport{}
				err = json.Unmarshal(data, &report)
				if err == nil {
					image.LayerCount = report.LayerCount
				}
			}
		}
	}
}
