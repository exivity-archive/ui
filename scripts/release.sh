#!/usr/bin/env bash

set -e

echo "Current branch is master"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "master" ]]; then
  exit 1
fi

echo "Working copy doesn't contain changes"
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

echo "Cut release"
standard-version --sign

echo "Push commit and tag"
git push --follow-tags origin master

echo "Publish on NPM"
npm publish
