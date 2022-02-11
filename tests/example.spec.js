// @ts-check
const { test, expect } = require('@playwright/test');

test('batter percentage is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.battery-percentage')).toBeVisible();
});
