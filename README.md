# SauceDemo-Playwhright-JS
📋 This project is an automated testing framework built using Playwright for end-to-end testing of a web application. It includes comprehensive test cases for various user scenarios, such as logging in, navigating through the application, and completing the checkout process. The framework is modular, scalable, and designed for efficient test execution.

Features

🧩 Page Object Model (POM): The project follows the POM design pattern, which separates the logic of web elements from the test scripts for better maintainability.

🌍 Cross-Browser Support: Execute tests across multiple browsers like Chromium, Firefox, and WebKit.

♻️ Reusable Components: Common methods and configurations are stored in reusable modules to avoid redundancy.

🔍 Detailed Test Scenarios: Includes smoke tests, end-to-end workflows, and edge case validations.

🚨 Error Handling: Verifies error messages and validates proper handling of invalid inputs.

Directory Structure:

./
├── pageObjects

│   ├── checkoutInformationPage.js

│   ├── completePage.js

│   ├── homePage.js

│   ├── itemDetailsPage.js

│   ├── overviewPage.js

│   ├── shopPage.js

│   └── ShoppingCartPage.js

├── pages

│   ├── checkoutInformationPage.js

│   ├── completePage.js

│   ├── homePage.js

│   ├── itemDetailsPage.js

│   ├── MethodRepository.js

│   ├── overViewPage.js

│   ├── shopPage.js

│   └── shoppingCartPage.js

├── tests

│   ├── TC01SmokeTest.test.js

│   ├── TC02E2ECheckoutProcessforSU.test.js

│   ├── TC03CheckoutProcessforSUandPGU.test.js

│   ├── TC04CheckoutProcessforPUandPGU.test.js

│   └── TC05CheckoutProcessforPGUandSU.test.js

├── ConfigUtil.js

└── playwright.config.js

Key Components:

📄 pageObjects/: Contains locators and element definitions for different pages.

🖱️ pages/: Contains actions and methods for interacting with the web elements.

🧪 tests/: Includes test scripts for validating the application under different scenarios.

⚙️ ConfigUtil.js: Holds configuration details such as base URLs and other constants.

🛠️ playwright.config.js: Configuration for the Playwright test runner.

Installation:

📥 Clone the repository:

git clone <repository_url>

📂 Navigate to the project directory:

cd <project_directory>

📦 Install dependencies:

npm install

Usage:

▶️ Run all tests:

npx playwright test

🎯 Run a specific test:

npx playwright test tests/TC01SmokeTest.test.js

📊 Generate an HTML report:

npx playwright show-report

🐞 Debug tests:

npx playwright test --debug

Writing Tests:

Follow the examples in the tests/ directory to create new test cases. Ensure to:

Use pageObjects/ for selectors.

Write methods in pages/ for reusable interactions.

Keep test scripts simple and high-level, focusing on the scenario flow.

Test Scenarios Included:

🚀 Smoke Tests: Basic login and navigation validation.

✅ End-to-End Checkout: Complete purchase workflow for multiple user types.

⚠️ Error Handling: Validations for incorrect input and missing fields.

🔄 Sorting and Filtering: Verifying product order and filtering options.

🔗 Cross-User Scenarios: Ensures data consistency across sessions with different user roles.

Technologies Used:

🖥️ Playwright: For browser automation.

💻 JavaScript/Node.js: For scripting and execution.

📑 JSON: For test data storage.

Contribution:

Contributions are welcome! Follow these steps:

🍴 Fork the repository.

🌿 Create a feature branch:

git checkout -b feature/new-feature

💾 Commit your changes:

git commit -m "Add new feature"

⬆️ Push to the branch:

git push origin feature/new-feature

🔃 Open a Pull Request.
