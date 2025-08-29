# Screenshot Placeholders

This directory contains placeholder references for XML hierarchy screenshots.

## Login Screen Screenshot
**File**: `login_screen.png`
**Status**: Placeholder - To be captured during actual testing
**Description**: Screenshot showing the login screen UI hierarchy with highlighted stable locators

### What to capture:
- Full login screen layout
- Highlighted elements with their resource IDs
- Accessibility information overlay (if available)
- Element boundaries visualization

### Key elements to highlight:
- Username field (`com.example.app:id/username_field`)
- Password field (`com.example.app:id/password_field`)
- Login button (`com.example.app:id/login_button`)
- Forgot password link (`com.example.app:id/forgot_password_link`)
- Social login buttons
- Sign up link

## Dashboard Screen Screenshot
**File**: `dashboard_screen.png`
**Status**: Placeholder - To be captured during actual testing
**Description**: Screenshot showing the main dashboard screen with navigation and content areas

### What to capture:
- Full dashboard layout with top navigation
- Bottom navigation tabs
- Quick actions section
- Recent items list
- Statistics cards
- Floating action button

### Key elements to highlight:
- Search input (`com.example.app:id/search_input`)
- Menu button (`com.example.app:id/menu_button`)
- Bottom navigation tabs (`com.example.app:id/nav_*`)
- Quick action buttons (`com.example.app:id/action_*`)
- Recent items list (`com.example.app:id/recent_items_list`)
- Statistics cards (`com.example.app:id/stat_*`)

## How to Capture Screenshots

### Using ADB
```bash
# Capture screen
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png login_screen.png
```

### Using Appium Inspector
1. Connect to your app
2. Navigate to the desired screen
3. Use the "Screenshot" feature
4. Save with descriptive filename

### Using Android Studio Layout Inspector
1. Connect to device and app
2. Capture layout snapshot
3. Export or screenshot the hierarchy view
4. Annotate with stable locator information

## Annotation Guidelines

When creating actual screenshots:
1. **Highlight stable locators** with colored borders
2. **Add labels** showing resource IDs and accessibility IDs
3. **Use consistent color coding**:
   - Green: Resource ID locators (most stable)
   - Blue: Accessibility ID locators
   - Yellow: Alternative locators
   - Red: Problematic/fragile locators
4. **Include element hierarchy** view when possible
5. **Add explanatory annotations** for key elements

## File Naming Convention

- `{screen_name}_hierarchy.png` - Full hierarchy view
- `{screen_name}_elements.png` - Element boundaries highlighted
- `{screen_name}_locators.png` - Locator annotations overlay

Example:
- `login_screen_hierarchy.png`
- `login_screen_elements.png`
- `login_screen_locators.png`