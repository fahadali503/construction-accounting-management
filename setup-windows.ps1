# Construction Management - PowerShell Auto Setup Script
# For Hittah Engineers & Contractors
# This script will automatically install bun, clone the repository, and set up the project

Write-Host "🏗️  Construction Management Platform - Auto Setup" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Variables
$REPO_URL = "https://github.com/fahadali503/construction-accounting-management.git"
$PROJECT_NAME = "construction-accounting-management"
$PROJECT_PATH = Join-Path (Get-Location) $PROJECT_NAME
$WEB_PATH = Join-Path $PROJECT_PATH "web"

# Function to check if command exists
function Test-Command {
    param($CommandName)
    try {
        Get-Command $CommandName -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

# Check if bun is installed
Write-Host "🔍 Checking for bun..." -ForegroundColor Yellow
if (Test-Command "bun") {
    $bunVersion = bun --version
    Write-Host "✅ Bun found: v$bunVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Bun not found. Installing bun..." -ForegroundColor Red
    try {
        powershell -c "irm bun.sh/install.ps1 | iex"
        Write-Host "✅ Bun installed successfully!" -ForegroundColor Green
        
        # Refresh environment variables
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        # Verify installation
        if (Test-Command "bun") {
            $bunVersion = bun --version
            Write-Host "✅ Bun version: v$bunVersion" -ForegroundColor Green
        } else {
            Write-Host "❌ Bun installation failed. Please restart PowerShell and try again." -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "❌ Failed to install bun: $_" -ForegroundColor Red
        exit 1
    }
}

# Check if git is installed
Write-Host "� Checking for git..." -ForegroundColor Yellow
if (Test-Command "git") {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Git not found. Please install Git first." -ForegroundColor Red
    Write-Host "💡 Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "🔄 After installing Git, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

# Check if project directory already exists
if (Test-Path $PROJECT_PATH) {
    Write-Host "⚠️  Project directory already exists: $PROJECT_PATH" -ForegroundColor Yellow
    $response = Read-Host "Do you want to remove it and clone fresh? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host "🗑️  Removing existing directory..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force $PROJECT_PATH
    } else {
        Write-Host "❌ Aborted. Please remove the directory manually or choose a different location." -ForegroundColor Red
        exit 1
    }
}

# Clone the repository
Write-Host "📥 Cloning repository from GitHub..." -ForegroundColor Yellow
try {
    git clone $REPO_URL
    Write-Host "✅ Repository cloned successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to clone repository: $_" -ForegroundColor Red
    exit 1
}

# Change to web directory
if (Test-Path $WEB_PATH) {
    Set-Location $WEB_PATH
    Write-Host "📁 Changed to web directory: $WEB_PATH" -ForegroundColor Blue
} else {
    Write-Host "❌ Web directory not found: $WEB_PATH" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies with bun..." -ForegroundColor Yellow
try {
    bun install
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies: $_" -ForegroundColor Red
    exit 1
}

# Set up database
Write-Host "�️  Setting up database..." -ForegroundColor Yellow
try {
    bun run db:generate
    bun run db:push
    bun run db:seed
    Write-Host "✅ Database setup complete!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to setup database: $_" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Yellow
try {
    bun run build
    Write-Host "✅ Project built successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to build project: $_" -ForegroundColor Red
    exit 1
}

# Start the development server
Write-Host "� Starting development server..." -ForegroundColor Green
Write-Host "🌐 Opening browser at http://localhost:3000" -ForegroundColor Cyan

# Open browser
Start-Process "http://localhost:3000"

# Start the server (this will block)
Write-Host "⚡ Starting server with bun dev..." -ForegroundColor Yellow
bun run dev
