#!/bin/bash

# Setup script for local environment variables
# This script helps you create a .env file for local testing

echo "🔧 Setting up environment variables for local testing..."
echo ""

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Do you want to overwrite it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled. .env file unchanged."
        exit 1
    fi
fi

echo "📝 Creating .env file..."

# Create .env file
cat > .env << EOF
# Hashnode GraphQL API credentials for local testing
# Copy this file to .env and fill in your actual values

# Your Hashnode API key (get it from https://hashnode.com/settings/developer)
HASHNODE_API_KEY=your_hashnode_api_key_here

# Your GitHub username to fetch Hashnode posts for
GITHUB_USERNAME=your_github_username_here

# Optional: GitHub token for testing GitHub-related functionality
GITHUB_TOKEN=your_github_token_here

# Optional: Test mode flag
TEST_MODE=true
EOF

echo "✅ .env file created successfully!"
echo ""
echo "🔑 Next steps:"
echo "1. Edit the .env file and replace the placeholder values with your actual credentials"
echo "2. Get your Hashnode API key from: https://hashnode.com/settings/developer"
echo "3. Set your actual GitHub username"
echo "4. Run the test script: node test-hashnode.js"
echo ""
echo "⚠️  Remember: Never commit your .env file to version control!"
echo "   It's already added to .gitignore for safety."
