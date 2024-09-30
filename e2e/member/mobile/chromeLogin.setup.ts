import {expect, test as setup} from '@playwright/test';
import {STORAGE_STATE_PATH} from '../../../playwright.config';
import path from "node:path";

setup('モバイルChromeログイン', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('mobileChrome@example.com');
    await page.getByLabel('Password').fill('mobileChrome');
    await page.getByRole('button', {name: 'LOG IN'}).tap();

    await page.getByRole('button').tap();
    await expect(page.getByRole('navigation')).toContainText('mobileChrome');

    await page.context().storageState({path: path.join(STORAGE_STATE_PATH, 'MobileChromeMember.json')});
});
