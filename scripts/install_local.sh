#!/bin/sh

# Define the repository URL
REPO_URL="git@github.com:kurtbruns/vector.git"

# Check if a version number is provided
if [ -z "$1" ]; then
  VERSION="latest"
else
  VERSION="$1"
fi

# Define the target directory
TARGET_DIR="src/vector"

# Remove the target directory if it exists to ensure a clean clone
rm -rf $TARGET_DIR

# Install the specified version or the latest version if no version is provided
if [ "$VERSION" = "latest" ]; then
  git clone $REPO_URL $TARGET_DIR
  cd $TARGET_DIR
else
  git clone $REPO_URL $TARGET_DIR
  cd $TARGET_DIR
  git checkout tags/$VERSION -b version-$VERSION
fi

npm install
