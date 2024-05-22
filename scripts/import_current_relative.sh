#!/bin/bash

# Check if a directory and file are provided
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Error: Directory or file not provided."
  exit 1
fi

# Set the working directory to the provided directory
cd "$1" || exit

# Print the current working directory
# echo "Current working directory: $(pwd)"

# Function to find the 'vector/src' directory starting from the current directory and moving up
find_vector_src() {
  local dir=$PWD
  while [ "$dir" != "/" ]; do
    if [ -d "$dir/vector/src" ]; then
      echo "$dir/vector/src"
      return 0
    fi
    dir=$(dirname "$dir")
  done
  return 1
}

# Find the absolute path to the 'vector/src' directory
vector_src_path=$(find_vector_src)

if [ -z "$vector_src_path" ]; then
  echo "Error: 'vector/src' directory not found."
  exit 1
fi

# Print the found vector/src path
# echo "Found vector/src directory: $vector_src_path"

# Function to compute relative path
compute_relative_path() {
  local source=$(cd "$1"; pwd)
  local target=$(cd "$2"; pwd)
  local common_part=$source
  local result=""
  
  while [[ "${target#$common_part}" == "${target}" ]]; do
    common_part=$(dirname "$common_part")
    result="../$result"
  done
  
  local forward_part=${target#$common_part/}
  echo "$result$forward_part"
}

# Get the provided file
file="$2"

# Get the directory of the provided file
file_dir=$(dirname "$file")
relative_path=$(compute_relative_path "$file_dir" "$vector_src_path")

# Replace the import statements in the provided file
old_import=$(grep -E "import \{([^}]+)\} from \"@kurtbruns/vector\";" "$file")
if [[ -n "$old_import" ]]; then

  # Uncomment the following lines for testing
  # new_import=$(echo "$old_import" | sed "s|@kurtbruns/vector|$relative_path|g")
  # echo "File: $file"
  # echo "Old Import: $old_import"
  # echo "New Import: $new_import"
  # echo

  # Uncomment the following line to actually perform the replacement
  sed -i '' -E "s|import \{([^}]+)\} from \"@kurtbruns/vector\";|import {\1} from \"$relative_path\";|g" "$file"
fi

# echo "Test complete."