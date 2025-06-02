import { defineConfig } from '@playwright/test';

export default defineConfig({
  // โฟลเดอร์ที่เก็บไฟล์เทสต์ (ไฟล์ .spec.ts/.spec.js)
  testDir: './tests',

  // เวลาสูงสุด (มิลลิวินาที) ที่ Playwright จะรอให้เทสต์เสร็จในแต่ละเคส
  timeout: 60000, // 60 วินาที

  // จำนวนครั้งที่จะ retry เคสที่ล้มเหลว (0 = ไม่ลองซ้ำ)
  retries: 0,

  // การตั้งค่า “use” จะใช้เป็นค่าเริ่มต้นสำหรับทุกๆ browser context/หน้าเพจ
  use: {
    // headless: true หมายถึง รันแบบไม่มี UI (ไม่เปิดหน้าต่างเบราว์เซอร์ให้เห็น)
    headless: false,

    // พารามิเตอร์ baseURL จะถูกใช้เวลาเราเรียก `page.goto('/')` เป็นต้น
    // มันจะตีเป็น 'http://localhost:3000/'
    baseURL: 'http://localhost:3000',

    // trace: 'on-first-retry' คือ ถ้าเคสใดล้มเหลวในรอบแรก
    // Playwright จะเปิดการเก็บ trace (ไฟล์ .zip) เพื่อให้เราดูไทม์ไลน์, แคปเจอร์วิดีโอ, สกรีนช็อต ฯลฯ
    trace: 'on-first-retry',
  },
});
