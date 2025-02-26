#!/bin/bash

# fix-dependencies.sh - Script to install dependencies

# Exit on error
set -e

echo "Starting dependency installation..."

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "Found package.json, installing dependencies with npm..."
    
    # Install dependencies
    npm install
    
    # Check for outdated packages (informational)
    echo "Checking for outdated packages..."
    npm outdated || true
    
    # Fix any issues with dependencies
    echo "Running npm audit fix..."
    npm audit fix || true
else
    echo "Error: package.json not found. Make sure you're running this script from the project root."
    exit 1
fi

echo "Dependency installation completed successfully!"