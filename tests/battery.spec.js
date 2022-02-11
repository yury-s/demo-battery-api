// @ts-check
const { test, expect } = require('@playwright/test');

test('shows battery status of 50%', async ({ page }) => {
  await page.addInitScript(() => {
    // mock "navigator.battery" property
    // returning mock charge object
    window.navigator.battery = {
      level: 0.5,
      charging: false,
      chargingTime: Infinity,
      dischargingTime: 3600, // seconds
      addEventListener: () => {}
    }
  });

  await page.goto('/');
  // now we can assert actual text - we are charged at 50%
  await expect(page.locator('.battery-percentage')).toHaveText('50%');

  // not charging means running on battery
  await expect(page.locator('.battery-status')).toHaveText('Battery');
  // and has enough juice for 1 hour
  await expect(page.locator('.battery-remaining')).toHaveText('01:00');
})
