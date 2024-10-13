import {test} from '@playwright/test';

// 外部のテストサイトを指定しているため、skipにしています。
// 確認したい場合、.skipを削除し、テスト後に録画データを確認してください。

test('カメラのテスト', async ({page}) => {
    await page.goto('https://webcammictest.com/');
    await page.getByRole('button', {name: 'Start test'}).click();
    await page.waitForTimeout(5000)
});

test('マイクのテスト', async ({page}) => {
    await page.goto('https://webcammictest.com/check-mic.html');
    await page.getByRole('button', {name: 'Start test'}).click();
    await page.waitForTimeout(5000)
    await page.locator('#preview-html')
        .contentFrame()
        .getByRole('link', {name: 'Verify Email Address'})
        .click();
});
