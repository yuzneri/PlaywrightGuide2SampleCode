import {expect, test as setup} from '@playwright/test';
import {STORAGE_STATE_PATH} from '../../../playwright.config';

setup('デスクトップSafariログイン', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('desktopSafari@example.com');
    await page.getByLabel('Password').fill('desktopSafari');
    await page.getByRole('button', {name: 'LOG IN'}).click();
    await expect(page.getByTestId('loginId')).toContainText('desktopSafari');

    await page.context().storageState({path: STORAGE_STATE_PATH + 'DesktopSafariMember.json'});
});
