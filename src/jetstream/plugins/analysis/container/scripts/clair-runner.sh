ARGS="--all-namespaces"

if [ -n "$2" ]; then
  ARGS="-n ${2}"
fi

# $1 is the kubeconfig file

echo "Clair runner..."
echo "Running report..."

# This gives us all of the images
IMAGES=$(kubectl get pods ${ARGS} -o jsonpath="{..image}" | tr -s '[[:space:]]' '\n' | sort | uniq)

# Write the IMAGES list out
echo "$IMAGES" > images.txt

while IFS= read -r IMG; do
  echo "Procesing image: ${IMG} ..."

  # Create a filename that we can use for the log
  # Replace / with underscore
  LOGFILE="${IMG//\//_}"
  LOGFILE="${LOGFILE/:/_}"

  # Pull the image
  echo "Pulling image locally ..."
  docker pull ${IMG}
  if [ $? -eq 0 ]; then
    echo "Image ${IMG} pulled OK"
    echo "Scanning ${IMG} ..."
    clair-scanner --all -r ${LOGFILE}.json --ip host.docker.internal ${IMG} > ${LOGFILE}.log
    echo "Exit code: $?"
  else 
    echo "Failed to pull image"
    # Write out an error file
    touch ${LOGFILE}.err
  fi

done <<< "$IMAGES"


# kubectl api-resources --verbs=list --namespaced -o name \
#   | xargs -n1 -I{} bash -c "kubectl get {} $ARGS -oyaml && echo ---" \
#   | kube-score score -o json - > report.json

#echo "<html><"

# This gets all in the cluser
# kubectl get pods --all-namespaces -o jsonpath="{..image}" |\
# tr -s '[[:space:]]' '\n' |\
# sort |\
# uniq -c

# Just one namespace
#--namespace kube-system

exit 0
