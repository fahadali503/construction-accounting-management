#!/bin/bash

# Construction Management - macOS Setup Script
# For Hittah Engineers & Contractors

echo "🏗️  Construction Management Platform - macOS Setup"
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "💡 You can install it using Homebrew: brew install node"
    exit 1
fi

# Check if bun is installed, if not use npm
if command -v bun &> /dev/null; then
    PACKAGE_MANAGER="bun"
    INSTALL_CMD="bun install"
    RUN_CMD="bun run"
else
    PACKAGE_MANAGER="npm"
    INSTALL_CMD="npm install"
    RUN_CMD="npm run"
fi

echo "📦 Using package manager: $PACKAGE_MANAGER"

# Install dependencies
echo "📥 Installing dependencies..."
$INSTALL_CMD

# Set up database
echo "🗄️  Setting up database..."
$RUN_CMD db:generate
$RUN_CMD db:push
$RUN_CMD db:seed

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development server:"
echo "   $RUN_CMD dev"
echo ""
echo "📊 To open database studio:"
echo "   $RUN_CMD db:studio"
echo ""
echo "🔧 Other useful commands:"
echo "   $RUN_CMD build    - Build for production"
echo "   $RUN_CMD lint     - Run linter"
echo "   $RUN_CMD db:migrate - Run database migrations"
echo ""
echo "🍺 macOS Tips:"
echo "   - Install Homebrew if you haven't: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
echo "   - Install bun for faster package management: curl -fsSL https://bun.sh/install | bash"
