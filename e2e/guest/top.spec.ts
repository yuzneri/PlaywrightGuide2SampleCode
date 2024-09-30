import {expect, test} from '@playwright/test';

test('TOPページ', async ({page}, testInfo) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot({fullPage: true});
});
