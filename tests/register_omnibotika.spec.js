const { test, expect } = require("@playwright/test");

test("Valid register Omnibotika", async function ({ page }) {
  // Memperpanjang batas waktu tes menjadi 60 detik
  test.setTimeout(60000);

  await page.goto('https://omni.botika.online/register', { 
    waitUntil: 'load',
    timeout: 60000, // Timeout untuk page.goto
  });

  // Mengisi email dan password
  await page.waitForSelector("#email", { timeout: 60000 });
  await page.locator("#email").type("your_email", { force: true }); // diisi sesuai email

  await page.waitForSelector("#password", { timeout: 60000 });
  await page.locator("#password").type("your_password", { force: true }); // diisi sesuai password

  // Klik tombol next dengan id="2", menggunakan escape untuk selektor CSS
  const nextButton = page.locator("#\\32");
  await expect(nextButton).toBeVisible({ timeout: 30000 });
  await nextButton.click();

  // Tunggu sampai form kedua muncul (id="form2")
  await page.waitForSelector("#form2", { timeout: 60000 });

  // Mengisi field tambahan di form kedua
  await page.locator("#username").type("your_username", { force: true }); // isi sesuai username 
  await page.locator("#fullname").type("your_fullname", { force: true }); // isi sesuai nama lengkap
  await page.locator("#phone").type("your_phone", { force: true }); // isi sesuai nomor telepon
  await page.locator("#promo_code").type("promo_kaloada", { force: true }); // isi sesuai kode promosi jika ada

  // Klik tombol "Back" dengan id="1"
  const backButton = page.locator("#\\31");
  await expect(backButton).toBeVisible({ timeout: 30000 });
  await backButton.click();

  // Tunggu sampai form sebelumnya dengan id="2" muncul kembali
  const previousForm = page.locator("#\\32");
  await expect(previousForm).toBeVisible({ timeout: 60000 });
});
