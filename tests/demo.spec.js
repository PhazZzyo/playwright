// @ts-check
const { test, expect } = require('@playwright/test');

test('google search', async ({ page }) => {

  // Navigate to Google.com
  await page.goto('https://www.google.com');

  // Expect a title to be "Google".
  await expect(page).toHaveTitle(/Google/);

  // Type the search query "Mitwerken" into the search bar and press Enter
  await page.fill('[name="q"]', 'Mitwerken');
  await page.keyboard.press('Enter');

  // Print the page title
  console.log(`Page title: ${await page.title()}`);

  // Expectation tests for results.
  await expect(page.locator('[name="q"]')).toHaveValue(/Mitwerken/);
  await expect(page.locator('span')).toContainText(['mitwerken.de']);
  await expect(page.locator('h3')).toContainText(['Mitwerken app']);

  // Capture a screenshot with the search results
  await page.waitForSelector('#search');
  await page.screenshot({ path: 'tests/screenshots/screenshot.jpg', fullPage: true });

});