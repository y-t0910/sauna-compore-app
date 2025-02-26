#!/bin/bash

# Jest configuration fix script
echo "Starting Jest configuration fix..."

# Check if jest.config.js exists, if not create it
if [ ! -f "jest.config.js" ]; then
    echo "Creating jest.config.js..."
    cat > jest.config.js << 'EOF'
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/']
};
EOF
    echo "jest.config.js created."
fi

# Check if jest.setup.js exists, if not create it
if [ ! -f "jest.setup.js" ]; then
    echo "Creating jest.setup.js..."
    cat > jest.setup.js << 'EOF'
import '@testing-library/jest-dom';
EOF
    echo "jest.setup.js created."
fi

# Create mocks directory and file mock if they don't exist
if [ ! -d "__mocks__" ]; then
    mkdir -p "__mocks__"
    echo "Created __mocks__ directory."
fi

if [ ! -f "__mocks__/fileMock.js" ]; then
    cat > "__mocks__/fileMock.js" << 'EOF'
module.exports = 'test-file-stub';
EOF
    echo "Created file mock."
fi

# Update package.json to ensure Jest scripts are present
echo "Updating package.json with Jest scripts..."
if command -v jq >/dev/null 2>&1; then
    # If jq is available, use it to update package.json
    cp package.json package.json.bak
    jq '.scripts.test = "jest" | .scripts["test:watch"] = "jest --watch"' package.json > tmp.json && mv tmp.json package.json
    echo "Updated package.json using jq."
else
    # Otherwise, remind the user to update package.json manually
    echo "Please add these scripts to your package.json manually:"
    echo '"test": "jest",'
    echo '"test:watch": "jest --watch",'
fi

# Install required dependencies if not already installed
echo "Checking for required dependencies..."
if ! grep -q "jest" package.json || ! grep -q "@testing-library/react" package.json; then
    echo "Installing Jest and testing dependencies..."
    npm install --save-dev jest @testing-library/react @testing-library/jest-dom identity-obj-proxy babel-jest
fi

echo "Jest configuration fix completed!"