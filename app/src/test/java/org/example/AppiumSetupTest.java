/*
 * Sample test to verify all dependencies are working correctly
 */
package org.example;

import io.appium.java_client.AppiumDriver;
import io.qameta.allure.Description;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.jupiter.api.Assertions.*;

@Feature("Appium Setup Verification")
class AppiumSetupTest {
    
    private static final Logger logger = LoggerFactory.getLogger(AppiumSetupTest.class);

    @Test
    @DisplayName("Verify Appium Driver can be imported")
    @Description("This test verifies that Appium Java Client dependency is correctly configured")
    @Story("Dependency verification")
    void testAppiumDriverImport() {
        logger.info("Testing Appium Driver import");
        
        // Test that we can reference AppiumDriver class (dependency is available)
        Class<?> appiumDriverClass = AppiumDriver.class;
        assertNotNull(appiumDriverClass, "AppiumDriver class should be available");
        assertEquals("AppiumDriver", appiumDriverClass.getSimpleName());
        
        logger.info("Appium Driver import test passed");
    }

    @Test
    @DisplayName("Verify SLF4J logging is working")
    @Description("This test verifies that SLF4J logging dependency is correctly configured")
    @Story("Logging verification")
    void testSLF4JLogging() {
        logger.info("Testing SLF4J logging functionality");
        
        // Test that logger is working
        assertNotNull(logger, "Logger should be initialized");
        assertEquals("org.example.AppiumSetupTest", logger.getName());
        
        // Test different log levels
        logger.debug("Debug message");
        logger.info("Info message");
        logger.warn("Warning message");
        logger.error("Error message");
        
        logger.info("SLF4J logging test passed");
    }

    @Test
    @DisplayName("Verify Allure annotations are working")
    @Description("This test verifies that Allure reporting dependency is correctly configured")
    @Story("Reporting verification")
    void testAllureAnnotations() {
        logger.info("Testing Allure annotations");
        
        // If this test runs without errors, it means Allure annotations are working
        assertTrue(true, "Allure annotations should be available and functional");
        
        logger.info("Allure annotations test passed");
    }

    @Test
    @DisplayName("Verify JUnit 5 is working")
    @Description("This test verifies that JUnit 5 (Jupiter) is correctly configured")
    @Story("Testing framework verification")
    void testJUnit5Features() {
        logger.info("Testing JUnit 5 features");
        
        // Test basic assertions
        assertTrue(true);
        assertFalse(false);
        assertEquals("expected", "expected");
        assertNotNull(logger);
        
        // Test that we can use modern JUnit 5 features like DisplayName
        logger.info("JUnit 5 test passed");
    }
}