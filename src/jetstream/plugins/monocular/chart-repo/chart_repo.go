/*
Copyright (c) 2018 The Helm Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package main

import (
	"os"

	"github.com/helm/monocular/chartrepo/utils"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "chart-repo",
	Short: "Chart Repository utility",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

func main() {
	cmd := rootCmd
	if err := cmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func init() {

	cmds := []*cobra.Command{SyncCmd, DeleteCmd, ServeCmd}

	for _, cmd := range cmds {
		rootCmd.AddCommand(cmd)

		//Flags for optional FoundationDB + Document Layer backend
		cmd.Flags().String("doclayer-url", "mongodb://dev-fdbdoclayer/27016", "FoundationDB Document Layer URL")
		cmd.Flags().String("doclayer-database", "monocular-plugin", "FoundationDB Document-Layer database")

		//Flags for Serve-Mode TLS
		cmd.Flags().Bool("tls", false, "Enable Mutual TLS")
		cmd.Flags().String("cafile", "", "Path to CA certificate to use for client verification.")
		cmd.Flags().String("certfile", "", "Path to TLS certificate.")
		cmd.Flags().String("keyfile", "", "Path to TLS key.")

		// see version.go
		cmd.Flags().StringVarP(&utils.UserAgentComment, "user-agent-comment", "", "", "UserAgent comment used during outbound requests")
		cmd.Flags().Bool("debug", false, "verbose logging")
	}
	rootCmd.AddCommand(utils.VersionCmd)
}
