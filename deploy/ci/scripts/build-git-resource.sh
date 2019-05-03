#!/bin/bash

# Builds the Docker image used by our Concourse pipelines to detect a tag update

rm -rf ./tmp
mkdir -p ./tmp
cd ./tmp
git clone https://github.com/cf-stratos/git-resource.git

docker build ./git-resource -t splatform/stratos-git-resource:latest -f ./git-resource/dockerfiles/ubuntu/Dockerfile
if [ $? -ne 0 ]; then
  echo "Build failed"
  exit 1
fi
docker push splatform/stratos-git-resource:latest
rm -rf ./tmp
echo "All done"