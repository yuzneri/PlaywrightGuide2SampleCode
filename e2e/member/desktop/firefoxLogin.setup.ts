import {expect, test as setup} from '@playwright/test';
import {STORAGE_STATE_PATH} from '../../../playwright.config';

setup('デスクトップFireFoxログイン', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('desktopFirefox@example.com');
    await page.getByLabel('Password').fill('desktopFirefox');
    await page.getByRole('button', {name: 'LOG IN'}).click();
    await expect(page.getByTestId('loginId')).toContainText('desktopFirefox');

    await page.context().storageState({path: STORAGE_STATE_PATH + 'DesktopFirefoxMember.json'});
});
