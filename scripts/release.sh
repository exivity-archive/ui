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

header "Working copy doesn't contain changes"
git status
git diff-index --quiet HEAD --

header "Pulled latest changes from origin"
git pull origin master

header "Run linter"
yarn lint

header "Run tests"
yarn test

header "Run build"
yarn build

# header "Commit docs"
# git add docs
# git commit -m "chore: update docs" || true

header "Cut release"
yarn standard-version --sign

header "Push commit and tag"
git push --follow-tags origin master

header "Publish"
yarn npm:publish

# header "Publish docs"
# yarn docs:publish
