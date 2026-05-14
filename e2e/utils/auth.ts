import { expect, type Page } from '@playwright/test';

import { authCookieName, authCookieValue, authCredentials, authText } from '../constants/auth';

export async function openLoginDialog(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: authText.loginButton }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(authText.welcomeTitle)).toBeVisible();

  return dialog;
}

export async function loginAsUser(page: Page) {
  const dialog = await openLoginDialog(page);

  await dialog.getByLabel(authText.accountLabel).fill(authCredentials.email);
  await dialog.getByPlaceholder(authText.passwordPlaceholder).fill(authCredentials.password);
  await dialog.getByRole('button', { name: authText.loginButton, exact: true }).click();

  await expect(dialog).toBeHidden();
  await page.context().addCookies([
    {
      name: authCookieName,
      value: authCookieValue,
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      sameSite: 'Lax',
    },
  ]);
  await page.reload();
  await expect(page.getByRole('button', { name: authText.loginButton })).toBeHidden();
}
