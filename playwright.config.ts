import { loadEnvConfig } from '@next/env';
import { defineConfig, devices } from '@playwright/test';

import { authFile } from './e2e/constants/auth';

const env = process.env as Record<string, string | undefined>;
env.NODE_ENV ??= 'test';
loadEnvConfig(process.cwd());

export default defineConfig({
  testDir: './e2e',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'auth-setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'guest-chromium',
      grep: /@guest/,
      testIgnore: /auth\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: { cookies: [], origins: [] },
      },
    },
    {
      name: 'auth-chromium',
      grep: /@auth/,
      dependencies: ['auth-setup'],
      testIgnore: /auth\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },
  ],

  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
