import { test, expect } from '@playwright/test';

test.describe('Protected routes', () => {
  test.describe('unauthenticated user', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('redirects from /account @guest', async ({ page }) => {
      await page.goto('/account');
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('authenticated user', () => {
    test('can access /account @auth', async ({ page }) => {
      await page.goto('/account');
      await expect(page).toHaveURL(/\/account/);
    });
  });
});
