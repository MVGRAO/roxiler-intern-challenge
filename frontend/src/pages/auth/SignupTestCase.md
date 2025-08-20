# Test Case for Store Owner Signup Page

## Test Case ID: TC_SO_001

**Title**: Store Owner Signup Functionality

**Preconditions**:
- The application is running.
- The signup page is accessible.

**Test Steps**:
1. Navigate to the signup page.
2. Fill in the following fields:
   - Name: "John Doe"
   - Email: "john.doe@example.com"
   - Address: "123 Main St, City, Country"
   - Password: "Password123!"
3. Select the role as "Store Owner".
4. Click the "Sign Up" button.

**Expected Results**:
- The user should be successfully registered.
- A success message should be displayed: "Signup successful".
- The user should be redirected to the login page or dashboard.

**Postconditions**:
- The new store owner should be present in the database.
- The user can log in with the provided credentials.

## Additional Test Cases
- **Validation Tests**: Ensure that the form validates input fields correctly (e.g., email format, password strength).
- **Error Handling**: Test scenarios where the email is already in use or required fields are left empty.
