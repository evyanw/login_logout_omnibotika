const { test, expect } = require("@playwright/test");

test("Valid login", async function({ page }) {
  await page.goto('https://practicetestautomation.com/practice-test-login/', { 
    waitUntil: 'networkidle',
    timeout: 60000, // menambah timeout menjadi 60 detik
  });

  await page.locator("input[name='username']").type("student");
  await page.locator("input[name='password']").type("Password123");

  // Memastikan tombol submit ada sebelum klik
  const submitButton = page.locator("#submit");
  await expect(submitButton).toBeVisible({ timeout: 30000 }); // Tunggu hingga tombol terlihat

  // Klik tombol submit
  await submitButton.click();
});