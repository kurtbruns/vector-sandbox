#!/bin/bash

# Get the workspace folder from the argument
workspaceFolder=$1

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

# Verify that the vector/src path is within the workspaceFolder
if [[ $vector_src_path != ${workspaceFolder}* ]]; then
  echo "Error: 'vector/src' directory not found within the workspaceFolder."
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
  
  if [[ -z "$result" ]]; then
    result="./"
  fi
  
  echo "$result$forward_part"
}

# Find all .ts files and replace the import statements
find . -type f -name "*.ts" ! -path "*/node_modules/*" | while read -r file; do
  file_dir=$(dirname "$file")
  relative_path=$(compute_relative_path "$file_dir" "$vector_src_path")
  old_import=$(grep -E "import \{([^}]+)\} from ['\"]@kurtbruns/vector['\"];" "$file")
  if [[ -n "$old_import" ]]; then

    # Uncomment the following lines for testing
    # new_import=$(echo "$old_import" | sed "s|['\"]@kurtbruns/vector['\"]|$relative_path|g")
    # echo "File: $file"
    # echo "Old Import: $old_import"
    # echo "New Import: $new_import"
    # echo

    # Uncomment the following line to actually perform the replacement
    sed -i '' -E "s|import \{([^}]+)\} from ['\"]@kurtbruns/vector['\"];|import {\1} from \"$relative_path\";|g" "$file"

    # Print the file that had its imports replaced
    echo "Replaced imports in: $file"
  fi
done

echo "Replacement complete."