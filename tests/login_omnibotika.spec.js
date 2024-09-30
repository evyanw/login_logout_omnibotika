const { test, expect } = require("@playwright/test");

test("Valid login Omnibotika", async function ({ page }) {
  // Memperpanjang batas waktu tes menjadi 60 detik
  test.setTimeout(60000);

  await page.goto('https://omni.botika.online/login', { 
    waitUntil: 'load',
    timeout: 60000, // Timeout untuk page.goto
  });

  // Mengisi username dan password
  await page.waitForSelector("#username", { timeout: 60000 });
  await page.locator("#username").type("your_username", { force: true }); //diisi sesuai usernamemu

  await page.waitForSelector("#password", { timeout: 60000 });
  await page.locator("#password").type("your_password", { force: true }); //diisi sesuai passwordmu

  // Klik tombol login
  const submitButton = page.locator("button[name='login']");
  await expect(submitButton).toBeVisible({ timeout: 30000 });
  await submitButton.click();

  // Tunggu dan verifikasi elemen unik di halaman dashboard
  await page.waitForSelector('html', { timeout: 60000 });

  // Memastikan bahwa URL sudah berubah ke dashboard
  await expect(page).toHaveURL(/https:\/\/omni\.botika\.online\/page\/admin\/dashboard/);

  // Jeda selama 20 detik untuk menunggu notifikasi hilang
  await page.waitForTimeout(20000);

  // Klik pada avatar untuk membuka dropdown
  await page.locator('.d-flex > .avatar-img').click();

  // Menunggu sejenak agar dropdown bisa terlihat
  await page.waitForTimeout(1000);

  // Tunggu sampai elemen #logout muncul dan terlihat
  await page.waitForSelector('#logout', { state: 'visible', timeout: 60000 });
  await page.locator('#logout').click();

  // Memastikan kembali ke halaman login setelah logout
  await page.waitForSelector('#username', { timeout: 60000 });
  await expect(page).toHaveURL('https://omni.botika.online/login');
});
