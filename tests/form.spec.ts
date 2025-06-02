import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import path from 'path';

test.describe('Form Submission', () => {
  let data: Record<string, any>;

  test.beforeAll(() => {
    const filePath = path.resolve(__dirname, 'template.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = json[0] as string[];
    const values = json[1] as any[];
    data = {};
    headers.forEach((h, i) => {
      data[h] = values[i];
    });
  });

  test('should login and submit form and download excel', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.fill('input[type="text"]', 'admin_test');
    await page.fill('input[type="password"]', 'Test@eiei555');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:3000/form');

    // Fill form
    const inputs = await page.locator('input');
    await inputs.nth(0).fill(data.firstName as string);
    await inputs.nth(1).fill(data.lastName as string);
    await inputs.nth(2).fill(String(data.age));
    await inputs.nth(3).fill(data.dob as string);
    await inputs.nth(4).fill(data.address as string);

    // Intercept download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('button[type="submit"]')
    ]);

    const pathDownloaded = await download.path();
    expect(pathDownloaded).not.toBeNull();
    const fileName = download.suggestedFilename();
    expect(fileName).toBe('user_data.xlsx');
  });
});
