#!/bin/bash

# fix-tests.sh - Script for running tests in the frontend project

# Set error handling
set -e

echo "Running frontend tests..."

# Change to frontend directory if script is run from another location
cd "$(dirname "$0")"

# Install dependencies if needed
if [ "$1" == "--install" ] || [ "$1" == "-i" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run tests with different options
if [ "$1" == "--watch" ] || [ "$1" == "-w" ]; then
    echo "Starting tests in watch mode..."
    npm test -- --watch
elif [ "$1" == "--coverage" ] || [ "$1" == "-c" ]; then
    echo "Running tests with coverage..."
    npm test -- --coverage
else
    echo "Running standard tests..."
    npm test
fi

echo "Test execution completed."