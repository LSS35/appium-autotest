package org.example;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import java.net.MalformedURLException;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AndroidEmulatorFunctionalTest {
    private static AndroidDriver driver;

    @BeforeAll
    static void setUp() throws MalformedURLException {
        UiAutomator2Options options = new UiAutomator2Options()
                .setDeviceName("emulator-5554") // Default emulator name
                .setPlatformName("Android")
                .setAppPackage("com.android.calculator2")
                .setAppActivity("com.android.calculator2.Calculator");
        driver = new AndroidDriver(new URL("http://localhost:4723/wd/hub"), options);
    }

    @Test
    @Order(1)
    @DisplayName("Simple addition in Calculator app")
    void testCalculatorAddition() {
        // 2 + 3 = 5
        driver.findElement(By.id("digit_2")).click();
        driver.findElement(By.id("op_add")).click();
        driver.findElement(By.id("digit_3")).click();
        driver.findElement(By.id("eq")).click();
        WebElement result = driver.findElement(By.id("result"));
        assertTrue(result.getText().contains("5"), "Result should contain 5");
    }

    @AfterAll
    static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

