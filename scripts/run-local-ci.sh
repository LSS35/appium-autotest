#!/bin/bash
set -e

# Colors for output
green='\033[0;32m'
yellow='\033[1;33m'
red='\033[0;31m'
nc='\033[0m'

print_status() {
  echo -e "${1}${2}${nc}"
}

# Detect architecture
ARCH=$(uname -m)
if [[ "$ARCH" == "arm64" || "$ARCH" == "aarch64" ]]; then
  AVD_NAME="pixel_4_arm64"
  CREATE_CMD="create-arm64"
else
  AVD_NAME="pixel_4_x86_64"
  CREATE_CMD="create-x86_64"
fi

# 1. Create AVD if needed
print_status $yellow "[1/5] Creating $AVD_NAME AVD if needed..."
./scripts/manage-avd.sh $CREATE_CMD

# 2. Start the emulator
print_status $yellow "[2/5] Starting $AVD_NAME emulator..."
./scripts/manage-avd.sh start $AVD_NAME

# Wait for emulator to boot
print_status $yellow "[2/5] Waiting for emulator to boot..."
boot_completed=""
retries=60
while [[ "$boot_completed" != "1" && $retries -gt 0 ]]; do
  sleep 5
  boot_completed=$(adb -e shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  print_status $yellow "  ...waiting for boot ($retries left)"
  ((retries--))
done
if [[ "$boot_completed" != "1" ]]; then
  print_status $red "❌ Emulator failed to boot in time."
  exit 1
fi
print_status $green "✅ Emulator is booted."

# 3. Start Appium server in background
print_status $yellow "[3/5] Starting Appium server..."
npm run start-appium &
APPIUM_PID=$!
sleep 10

# 4. Run tests
print_status $yellow "[4/5] Running tests (test:ci)..."
npm run test:ci || true

# 5. Stop Appium server and emulator
print_status $yellow "[5/5] Stopping Appium server and emulator..."
kill $APPIUM_PID || true
./scripts/manage-avd.sh stop
print_status $green "✅ All done!"

print_status $green "\nView mochawesome-report/mochawesome.html for results."
print_status $green "Check artifacts/screenshots/ and artifacts/videos/ for media."
