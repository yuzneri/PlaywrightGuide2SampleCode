import {expect, test as setup} from '@playwright/test';
import {STORAGE_STATE_PATH} from '../../../playwright.config';

setup('デスクトップChromeログイン', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('desktopChrome@example.com');
    await page.getByLabel('Password').fill('desktopChrome');
    await page.getByRole('button', {name: 'LOG IN'}).click();
    await expect(page.getByTestId('loginId')).toContainText('desktopChrome');

    await page.context().storageState({path: STORAGE_STATE_PATH + 'DesktopChromeLogin.json'});
});
