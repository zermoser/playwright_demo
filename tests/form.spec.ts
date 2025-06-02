import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import path from 'path';

test.describe('Form Submission', () => {
  test('should login and submit form and download excel', async ({ page, context }) => {
    // 1. โหลดข้อมูลจาก template.xlsx
    const workbook = XLSX.readFile(path.join(__dirname, 'template.xlsx'));
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet)[0] as {
      firstName: string;
      lastName: string;
      age: number;
      dob: string;
      address: string;
    };

    // 2. ไปที่หน้า Login (ใช้ baseURL จาก playwright.config.ts)
    await page.goto('/');

    // 3. กรอก username/password แล้วกด submit
    await page.fill('input#username', 'admin_test');
    await page.fill('input#password', 'Test@eiei555');

    // 4. รอให้ navigate ไป /form พร้อมกับกดปุ่ม
    await Promise.all([
      page.waitForURL('/form'),          // รอให้ URL เปลี่ยนเป็น /form
      page.click('button[type="submit"]') // กดปุ่ม Login
    ]);

    // (Optional) เช็คอีกทีว่าหน้าเปลี่ยนจริง
    await expect(page).toHaveURL('/form');

    // 5. กรอกข้อมูลจาก Excel ลงฟอร์ม
    await page.fill('input[name="firstName"]', data.firstName);
    await page.fill('input[name="lastName"]', data.lastName);
    await page.fill('input[name="age"]', String(data.age));
    await page.fill('input[name="dob"]', data.dob);
    await page.fill('textarea[name="address"]', data.address);

    // 6. ดักจับการดาวน์โหลดไฟล์
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('button[type="submit"]'), // ปุ่ม Submit ในหน้า form
    ]);

    // 7. ตรวจสอบชื่อไฟล์ที่ดาวน์โหลด
    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toBe('user_data.xlsx');
  });
});
