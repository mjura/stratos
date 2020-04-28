ARGS="--all-namespaces"

# When running in Kubernetes get the Clair server from the environment:
#   CLAIR_METRICS_API_SERVICE_PORT
#   CLAIR_METRICS_API_SERVICE_HOST

if [ -n "${CLAIR_METRICS_API_SERVICE_HOST}" ]; then
  echo "Setting CLAIR_ADDR from environment"
  CLAIR_SERVER="http://${CLAIR_METRICS_API_SERVICE_HOST}:${CLAIR_METRICS_API_SERVICE_PORT}"
else
  if [ -z "${CLAIR_SERVER}" ]; then
    echo "Need CLAIR_SERVER environment variable"
    exit 1
  fi
fi

echo "Clair server: ${CLAIR_SERVER}"

# We use klar as this can be used in a Kubernetes environment without docker

if [ -n "$2" ]; then
  ARGS="-n ${2}"
fi

# $1 is the kubeconfig file

echo "Enumerating all referenced images ..."

# This gives us all of the images in the cluser or in the namespace
IMAGES=$(kubectl get pods ${ARGS} -o jsonpath="{..image}" | tr -s '[[:space:]]' '\n' | sort | uniq)

# Write the IMAGES list out
echo "$IMAGES" > images.txt

while IFS= read -r IMG; do
  # Ignore empty image name
  if [ -n ${IMG} ]; then
    echo "Procesing image: ${IMG} ..."

    # Create a filename that we can use for the log
    # Replace / with underscore
    LOGFILE="${IMG//\//_}"
    LOGFILE="${LOGFILE/:/_}"

    echo "Scanning ${IMG} ..."
    export CLAIR_ADDR="${CLAIR_SERVER}"
    export JSON_OUTPUT=false
    export CLAIR_TIMEOUT=10
    env
    klar ${IMG} > ${LOGFILE}.log 2>&1
    EXITCODE=$?
    if [ $EXITCODE -ne 0 ]; then
      # Delete the logfile, so we know there is an error
      rm -f ${LOGFILE}.log
      echo "Error scanning image ${IMG} (${EXITCODE})"
    else
      # Now JSON format (this will be quick as Clair will have cached the image data)
      export JSON_OUTPUT=true
      klar ${IMG} > ${LOGFILE}.json
      EXITCODE=$?
      if [ $EXITCODE -ne 0 ]; then
        # Delete the logfile, so we know there is an error
        rm -f ${LOGFILE}.log
        echo "Error scanning image ${IMG} (${EXITCODE})"
      fi
    fi
  fi

done <<< "$IMAGES"

exit 0
