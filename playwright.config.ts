import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
});
