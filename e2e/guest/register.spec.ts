import {expect, test} from '@playwright/test';

test('会員登録', async ({page}, testInfo) => {
    const id = Math.random().toString(36).slice(-8);
    const email = `${id}@example.com`;

    await page.goto('/');
    await page.getByRole('link', {name: 'Register'}).click();
    await expect(page).toHaveURL(/register/);

    await page.getByLabel('Name').fill(id);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', {exact: true}).fill(id);
    await page.getByLabel('Confirm Password').fill(id);
    await page.getByRole('button', {name: 'Register'}).click();
    await expect(page).toHaveURL(/verify-email/);

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/verify-email/);

    await page.goto(process.env.MAILPIT_URL);
    await page.getByRole('link', {name: new RegExp(email)}).click();

    const popupPromise = page.waitForEvent('popup');
    await page.locator('#preview-html').contentFrame().getByRole('link', {name: 'Verify Email Address'}).click();
    const popupPage = await popupPromise;

    await expect(popupPage).toHaveURL(/dashboard/);
    await expect(popupPage.getByTestId('loginId')).toContainText(new RegExp(id));
});
