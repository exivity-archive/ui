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

echo "Working copy doesn't contain changes"
git config core.autocrlf false
git status
git diff-index --quiet HEAD --

echo "Pulled latest changes from origin"
git pull origin master

echo "Run linter"
yarn lint

echo "Run tests"
yarn test

echo "Run build"
yarn build

echo "Commit docs"
git add docs
git commit -m "chore: update docs" || true

echo "Cut release"
yarn standard-version --sign

echo "Push commit and tag"
git push --follow-tags origin master

echo "Publish on NPM"
npm publish

echo "Publish docs"
yarn publish:docs
