// @ts-check
const { test, expect } = require('@playwright/test');

test('shows battery status of 75%', async ({ page }) => {
  await page.addInitScript(() => {
    // for these tests, return the same mock battery status
    const mockBatteryInfo = {
      level: 0.75,
      charging: true,
      chargingTime: 1800, // seconds
      dischargingTime: Infinity,
      addEventListener: () => { }
    }
    // application tries navigator.battery first
    // so we delete this method
    delete window.navigator.battery
    // then the app tries navigator.getBattery
    window.navigator.getBattery = () => Promise.resolve(mockBatteryInfo)
  });

  await page.goto('/');
  await expect(page.locator('.battery-percentage')).toHaveText('75%');
  await expect(page.locator('.battery-status')).toHaveText('Adapter');
  await expect(page.locator('.battery-fully')).toHaveText('00:30');
})

test.only('calls navigator.getBattery', async ({ page }) => {
  let getBatteryCalls = 0;
  await page.exposeFunction('onGetBattery', () => { 
    console.log('onGetBattery')
    ++getBatteryCalls;
  });
  await page.addInitScript(() => {
    // for these tests, return the same mock battery status
    const mockBatteryInfo = {
      level: 0.75,
      charging: true,
      chargingTime: 1800, // seconds
      dischargingTime: Infinity,
      addEventListener: () => { }
    }
    // application tries navigator.battery first
    // so we delete this method
    delete window.navigator.battery
    // then the app tries navigator.getBattery
    window.navigator.getBattery = () => {
      window.onGetBattery();
      return Promise.resolve(mockBatteryInfo)
    };
  });

  await page.goto('/');
  await expect(page.locator('.battery-percentage')).toHaveText('75%');
  
  // ensure our stub has been called by the application
  expect(getBatteryCalls).toBe(1);
})
