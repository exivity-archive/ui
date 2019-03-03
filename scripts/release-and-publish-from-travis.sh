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

header "Check tags"
if git describe --exact-match --tags HEAD; then
    echo "Do not release for commits containings tags"
    exit 0
fi

header "Check PR build"
if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
    echo "Do not release for PR builds"
    exit 0
fi

header "Setup git"
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git remote set-url origin https://${GH_TOKEN}@github.com/exivity/ui.git
git checkout master

header "Cut release"
yarn version:bump

header "Publish to npm"
bash scripts/publish-npm.sh

header "Push commit and tag"
yarn git:push

header "Publish to GitHub Pages"
yarn docs:publish
