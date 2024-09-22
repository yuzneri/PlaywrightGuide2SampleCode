import {expect, test} from '@playwright/test';

test('Profile表示', async ({page}) => {
    await page.goto('/profile');
    await expect(page.getByRole('main')).toContainText('Profile Information');
});
