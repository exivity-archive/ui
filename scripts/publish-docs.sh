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

header "Current branch is master"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" ]]; then
    exit 1
fi

header "Change to lib folder"
pushd docs-static

header "Push to GitHub"
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force "https://${GH_TOKEN}@github.com/exivity/ui.git" master:gh-pages
