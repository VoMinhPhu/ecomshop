import { test, expect } from '@playwright/test';

import { authText } from '../constants/auth';
import { openLoginDialog } from '../utils/auth';

test.describe('Login flow', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('should open login popup and show validation errors @guest', async ({ page }) => {
    const dialog = await openLoginDialog(page);

    await dialog.getByRole('button', { name: authText.loginButton, exact: true }).click();

    await expect(page.getByText(authText.invalidEmail)).toBeVisible();
    await expect(page.getByText(authText.passwordRequired)).toBeVisible();

    await dialog.getByLabel(authText.accountLabel).fill('invalid-email');
    await dialog.getByRole('button', { name: authText.loginButton, exact: true }).click();
    await expect(page.getByText(authText.invalidEmail)).toBeVisible();
  });
});
