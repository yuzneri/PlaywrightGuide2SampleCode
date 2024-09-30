import {expect, test} from '@playwright/test';

test('TOPページのビジュアルリグレッションテスト', async ({page}, testInfo) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot({fullPage: true});
});

test('TOPページのスナップショットテスト', async ({page}, testInfo) => {
    await page.goto('/');
    expect(await page.textContent('body')).toMatchSnapshot();
});
