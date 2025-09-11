# Windows Setup Script for Appium Mobile Automation
# This script installs all necessary tools for mobile automation testing
# Run this script in PowerShell as Administrator

Write-Host "🚀 Starting Appium Mobile Automation Setup for Windows..." -ForegroundColor Green

# Function to check if command exists
function Test-Command {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

# Function to check if running as administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Administrator)) {
    Write-Host "⚠️  Please run this script as Administrator" -ForegroundColor Red
    exit 1
}

# Install Chocolatey if not present
if (-not (Test-Command choco)) {
    Write-Host "📦 Installing Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Install JDK 17
Write-Host "☕ Installing JDK 17..." -ForegroundColor Yellow
if (-not (Test-Command java)) {
    choco install -y openjdk17
}

# Install Node.js
Write-Host "📦 Installing Node.js..." -ForegroundColor Yellow
if (-not (Test-Command node)) {
    choco install -y nodejs
}

# Install Gradle
Write-Host "🔧 Installing Gradle..." -ForegroundColor Yellow
if (-not (Test-Command gradle)) {
    choco install -y gradle
}

# Install Git (if not present)
if (-not (Test-Command git)) {
    choco install -y git
}

# Set up Android SDK
Write-Host "📱 Setting up Android SDK..." -ForegroundColor Yellow
$AndroidHome = "$env:USERPROFILE\AppData\Local\Android\Sdk"

if (-not (Test-Path $AndroidHome)) {
    Write-Host "📥 Downloading Android Command Line Tools..." -ForegroundColor Yellow
    $SdkToolsUrl = "https://dl.google.com/android/repository/commandlinetools-win-9477386_latest.zip"
    $TempDir = "$env:TEMP\android-sdk"
    
    New-Item -ItemType Directory -Path $TempDir -Force | Out-Null
    New-Item -ItemType Directory -Path $AndroidHome -Force | Out-Null
    
    Invoke-WebRequest -Uri $SdkToolsUrl -OutFile "$TempDir\cmdline-tools.zip"
    Expand-Archive -Path "$TempDir\cmdline-tools.zip" -DestinationPath "$TempDir" -Force
    
    New-Item -ItemType Directory -Path "$AndroidHome\cmdline-tools\latest" -Force | Out-Null
    Move-Item -Path "$TempDir\cmdline-tools\*" -Destination "$AndroidHome\cmdline-tools\latest\" -Force
    
    # Set environment variables
    [Environment]::SetEnvironmentVariable("ANDROID_HOME", $AndroidHome, "User")
    [Environment]::SetEnvironmentVariable("PATH", "$env:PATH;$AndroidHome\cmdline-tools\latest\bin;$AndroidHome\platform-tools", "User")
    
    # Refresh environment variables
    $env:ANDROID_HOME = $AndroidHome
    $env:PATH += ";$AndroidHome\cmdline-tools\latest\bin;$AndroidHome\platform-tools"
    
    # Accept licenses and install basic packages
    Write-Host "📄 Accepting Android SDK licenses..." -ForegroundColor Yellow
    echo y | & "$AndroidHome\cmdline-tools\latest\bin\sdkmanager.bat" --licenses
    
    Write-Host "📦 Installing Android SDK packages..." -ForegroundColor Yellow
    & "$AndroidHome\cmdline-tools\latest\bin\sdkmanager.bat" "platform-tools" "platforms;android-33" "build-tools;33.0.2" "emulator" "system-images;android-33;google_apis;x86_64"
    
    Remove-Item -Path $TempDir -Recurse -Force
}

# Install Appium 2
Write-Host "🔄 Installing Appium 2..." -ForegroundColor Yellow
if (-not (Test-Command appium)) {
    npm install -g appium@next
}

# Install Appium drivers
Write-Host "🚗 Installing Appium drivers..." -ForegroundColor Yellow
appium driver install uiautomator2

# Install Appium Inspector
Write-Host "🔍 Installing Appium Inspector..." -ForegroundColor Yellow
try {
    npm install -g appium-inspector
} catch {
    Write-Host "⚠️  Appium Inspector installation skipped (GUI tool)" -ForegroundColor Yellow
}

# Install appium-doctor
Write-Host "🩺 Installing Appium Doctor..." -ForegroundColor Yellow
npm install -g appium-doctor

Write-Host "✅ Setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "🔄 Please restart your PowerShell or Command Prompt" -ForegroundColor Cyan
Write-Host "🧪 Then run 'npm run verify-setup' to verify your installation" -ForegroundColor Cyan