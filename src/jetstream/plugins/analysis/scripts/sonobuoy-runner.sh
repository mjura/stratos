# $1 is the kubeconfig file

echo "Sonobuoy runner..."
env
echo "Args"
echo $@

echo "Running report..."

sonobuoy run --wait


kubectl api-resources --verbs=list --namespaced -o name \
  | xargs -n1 -I{} bash -c "kubectl get {} $ARGS -oyaml && echo ---" \
  | kube-score score -o json - > report.json

exit 0
