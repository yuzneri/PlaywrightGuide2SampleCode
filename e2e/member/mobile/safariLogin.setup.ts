import {expect, test as setup} from '@playwright/test';
import {STORAGE_STATE_PATH} from '../../../playwright.config';

setup('モバイルSafariログイン', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('mobileSafari@example.com');
    await page.getByLabel('Password').fill('mobileSafari');
    await page.getByRole('button', {name: 'LOG IN'}).tap();

    await page.waitForURL("dashboard");
    await page.getByRole('button').tap();
    await expect(page.getByRole('navigation')).toContainText('mobileSafari');

    await page.context().storageState({path: STORAGE_STATE_PATH + 'MobileSafariMember.json'});
});
