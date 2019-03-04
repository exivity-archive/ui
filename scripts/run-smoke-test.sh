#!/usr/bin/env bash

# exit script immediately if any command exits with a nonzero status
set -e

# header
function header {
    white=`tput setaf 7`
    bluebg=`tput setab 4`
    reset=`tput sgr0`
    echo -e "\n${bluebg}${white}$1${reset}\n"
}

header "Change into consumer"
pushd tests/fixtures/consumer

header "Run yarn install"
yarn

header "Hot-replace lib into node_modules"
mkdir -p node_modules/@exivity/ui
cp -r ../../../lib/* node_modules/@exivity/ui

header "Test build"
yarn build
