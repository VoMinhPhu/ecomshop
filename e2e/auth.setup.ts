import fs from 'node:fs';
import path from 'node:path';

import { test } from '@playwright/test';

import { authFile } from './constants/auth';
import { loginAsUser } from './utils/auth';

test('authenticate user', async ({ page }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await loginAsUser(page);
  await page.context().storageState({ path: authFile });
});
