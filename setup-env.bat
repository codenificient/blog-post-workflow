@echo off
REM Setup script for local environment variables (Windows)
REM This script helps you create a .env file for local testing

echo 🔧 Setting up environment variables for local testing...
echo.

REM Check if .env already exists
if exist ".env" (
    echo ⚠️  .env file already exists. Do you want to overwrite it? (Y/N)
    set /p response=
    if /i not "%response%"=="Y" (
        echo ❌ Setup cancelled. .env file unchanged.
        pause
        exit /b 1
    )
)

echo 📝 Creating .env file...

REM Create .env file
(
echo # Hashnode GraphQL API credentials for local testing
echo # Copy this file to .env and fill in your actual values
echo.
echo # Your Hashnode API key (get it from https://hashnode.com/settings/developer)
echo HASHNODE_API_KEY=your_hashnode_api_key_here
echo.
echo # Your GitHub username to fetch Hashnode posts for
echo GITHUB_USERNAME=your_github_username_here
echo.
echo # Optional: GitHub token for testing GitHub-related functionality
echo GITHUB_TOKEN=your_github_token_here
echo.
echo # Optional: Test mode flag
echo TEST_MODE=true
) > .env

echo ✅ .env file created successfully!
echo.
echo 🔑 Next steps:
echo 1. Edit the .env file and replace the placeholder values with your actual credentials
echo 2. Get your Hashnode API key from: https://hashnode.com/settings/developer
echo 3. Set your actual GitHub username
echo 4. Run the test script: node test-hashnode.js
echo.
echo ⚠️  Remember: Never commit your .env file to version control!
echo    It's already added to .gitignore for safety.
echo.
pause
