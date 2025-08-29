# Appium Autotest

A Java-based automation testing framework using Appium for mobile application testing.

## Project Structure

This is a Gradle-based Java project with the following key dependencies:

### Dependencies

- **Appium Java Client** (9.3.0) - For mobile automation testing
- **JUnit 5 (Jupiter)** (5.12.1) - Modern testing framework
- **SLF4J** (2.0.13) - Logging framework
- **Allure** (2.29.0) - Test reporting and visualization
- **Guava** (33.4.6-jre) - Google's core libraries for Java

### Project Layout

```
app/
├── src/
│   ├── main/java/          # Application source code
│   └── test/java/          # Test source code
├── build.gradle            # Build configuration
└── build/                  # Build outputs and reports
```

## Building the Project

To build the project:

```bash
./gradlew build
```

## Running Tests

To run all tests:

```bash
./gradlew test
```

To run tests with detailed output:

```bash
./gradlew test --info
```

## Test Reports

After running tests, you can find the reports in:

- **JUnit Reports**: `app/build/reports/tests/test/index.html`
- **Allure Reports**: Generate with `./gradlew allureReport` (reports in `app/build/reports/allure-report/`)

## Sample Tests

The project includes sample tests that verify:

1. **Appium Setup** - Validates Appium Java Client integration
2. **Logging** - Demonstrates SLF4J logging functionality
3. **Allure Reporting** - Shows Allure annotations usage
4. **JUnit 5 Features** - Modern testing capabilities

## Requirements

- Java 17 or higher
- Gradle 9.0.0 or higher (wrapper included)

## Getting Started

1. Clone the repository
2. Run `./gradlew build` to build the project
3. Run `./gradlew test` to execute tests
4. View test reports in `app/build/reports/tests/test/index.html`

## Configuration

- **Gradle Properties**: See `gradle.properties` for build configuration
- **Dependencies**: Managed in `gradle/libs.versions.toml`
- **Build Script**: Main configuration in `app/build.gradle`