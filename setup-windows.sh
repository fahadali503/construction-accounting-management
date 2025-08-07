#!/bin/bash

# Construction Management - Bash Auto Setup Script
# For Hittah Engineers & Contractors
# This script will automatically install bun, clone the repository, and set up the project

echo "🏗️  Construction Management Platform - Auto Setup"
echo "================================================="

# Variables
REPO_URL="https://github.com/fahadali503/construction-accounting-management.git"
PROJECT_NAME="construction-accounting-management"
PROJECT_PATH="$(pwd)/$PROJECT_NAME"
WEB_PATH="$PROJECT_PATH/web"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if bun is installed
echo "🔍 Checking for bun..."
if command_exists bun; then
    BUN_VERSION=$(bun --version)
    echo "✅ Bun found: v$BUN_VERSION"
else
    echo "❌ Bun not found. Installing bun..."
    if curl -fsSL https://bun.sh/install | bash; then
        echo "✅ Bun installed successfully!"
        
        # Add bun to PATH for current session
        export PATH="$HOME/.bun/bin:$PATH"
        
        # Verify installation
        if command_exists bun; then
            BUN_VERSION=$(bun --version)
            echo "✅ Bun version: v$BUN_VERSION"
        else
            echo "❌ Bun installation failed. Please restart terminal and try again."
            exit 1
        fi
    else
        echo "❌ Failed to install bun"
        exit 1
    fi
fi

# Check if git is installed
echo "🔍 Checking for git..."
if command_exists git; then
    GIT_VERSION=$(git --version)
    echo "✅ Git found: $GIT_VERSION"
else
    echo "❌ Git not found. Please install Git first."
    echo "💡 Install instructions:"
    echo "   - Ubuntu/Debian: sudo apt-get install git"
    echo "   - CentOS/RHEL: sudo yum install git"
    echo "   - macOS: brew install git"
    echo "   - Windows: https://git-scm.com/download/win"
    echo "🔄 After installing Git, restart terminal and run this script again."
    exit 1
fi

# Check if project directory already exists
if [ -d "$PROJECT_PATH" ]; then
    echo "⚠️  Project directory already exists: $PROJECT_PATH"
    read -p "Do you want to remove it and clone fresh? (y/N): " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "🗑️  Removing existing directory..."
        rm -rf "$PROJECT_PATH"
    else
        echo "❌ Aborted. Please remove the directory manually or choose a different location."
        exit 1
    fi
fi

# Clone the repository
echo "📥 Cloning repository from GitHub..."
if git clone "$REPO_URL"; then
    echo "✅ Repository cloned successfully!"
else
    echo "❌ Failed to clone repository"
    exit 1
fi

# Change to web directory
if [ -d "$WEB_PATH" ]; then
    cd "$WEB_PATH" || exit 1
    echo "📁 Changed to web directory: $WEB_PATH"
else
    echo "❌ Web directory not found: $WEB_PATH"
    exit 1
fi

# Install dependencies
echo "� Installing dependencies with bun..."
if bun install; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Set up database
echo "🗄️  Setting up database..."
if bun run db:generate && bun run db:push && bun run db:seed; then
    echo "✅ Database setup complete!"
else
    echo "❌ Failed to setup database"
    exit 1
fi

# Build the project
echo "� Building the project..."
if bun run build; then
    echo "✅ Project built successfully!"
else
    echo "❌ Failed to build project"
    exit 1
fi

# Start the development server
echo "🚀 Starting development server..."
echo "🌐 Opening browser at http://localhost:3000"

# Open browser (cross-platform)
if command_exists xdg-open; then
    xdg-open "http://localhost:3000" 2>/dev/null &
elif command_exists open; then
    open "http://localhost:3000" 2>/dev/null &
elif command_exists start; then
    start "http://localhost:3000" 2>/dev/null &
fi

# Start the server (this will block)
echo "⚡ Starting server with bun dev..."
bun run dev
