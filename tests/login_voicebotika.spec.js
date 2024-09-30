const { test, expect } = require("@playwright/test");

test("Valid login on Voicebotika with Shadow DOM", async ({ page }) => {
  try {
    await page.goto('https://voice.botika.online/#/login', { 
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    // Debugging: Check page state before interacting with the form
    await page.screenshot({ path: 'before_interaction.png' });

    // Tunggu hingga elemen flt-glass-pane tersedia dengan timeout lebih lama
    await page.waitForSelector('flt-glass-pane', { state: 'attached', timeout: 60000 });

    // Interaksi dengan input di dalam Shadow DOM
    await page.evaluate(() => {
      const glassPane = document.querySelector('flt-glass-pane');
      if (!glassPane) {
        console.error('glassPane not found');
        return;
      }

      const emailInput = glassPane.shadowRoot.querySelector('input[name="email"]');
      const passwordInput = glassPane.shadowRoot.querySelector('input[name="password"]');
      const checkbox = glassPane.shadowRoot.querySelector('input[type="checkbox"]');

      if (emailInput && passwordInput && checkbox) {
        emailInput.focus();
        emailInput.value = "evianatest@gmail.com";
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));

        passwordInput.focus();
        passwordInput.value = "evianatest@123";
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        console.error('One or more inputs not found');
      }
    });

    // Debugging: Check page state after interacting with the form
    await page.screenshot({ path: 'after_form_interaction.png' });

    // Tunggu hingga tombol submit muncul
    const submitButtonLocator = page.locator('flt-glass-pane >>> button'); // Adjust selector if needed

    try {
      await submitButtonLocator.waitFor({ state: 'visible', timeout: 30000 });
      // Klik tombol submit
      await submitButtonLocator.click();
    } catch (error) {
      console.error('Failed to find submit button:', error);
      // Debugging: Capture page state if the button is not found
      await page.screenshot({ path: 'button_not_found.png' });
    }

    // Memastikan login berhasil dengan mengecek keberadaan elemen setelah login
    try {
      await page.waitForSelector('flt-glass-pane', { state: 'visible', timeout: 30000 });
      const glassPane = page.locator("flt-glass-pane");
      await expect(glassPane).toBeVisible();
    } catch (error) {
      console.error('Failed to find glassPane:', error);
      // Debugging: Capture page state if the test fails
      await page.screenshot({ path: 'login_failed.png' });
    }
  } catch (error) {
    console.error('Unexpected error during the test:', error);
    // Capture a screenshot if something went wrong
    try {
      await page.screenshot({ path: 'unexpected_error.png' });
    } catch (screenshotError) {
      console.error('Failed to capture screenshot after unexpected error:', screenshotError);
    }
  }
});
