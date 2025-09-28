# Appium Autotest

A Java-based automation testing framework using Appium.

## Requirements
- Java 17 or higher
- Gradle 9.0.0 or higher

## Build & Test
```bash
./gradlew build      # Build the project
./gradlew test       # Run all tests
```

## Reports
- JUnit: `app/build/reports/tests/test/index.html`
- Allure: `./gradlew allureReport` → `app/build/reports/allure-report/`

## Project Structure
```
app/
  src/main/java/    # Application code
  src/test/java/    # Test code
  build.gradle      # Build config
```
