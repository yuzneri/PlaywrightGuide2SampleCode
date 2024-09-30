import {expect, test as base} from '@playwright/test';
import {STORAGE_STATE_PATH} from '../../../playwright.config';
import {LoginPage} from "../../Fixtures/LoginPage";

const setup = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);

        await use(loginPage);
    },
});

setup('デスクトップFireFoxログイン', async ({loginPage, page}) => {
    await loginPage.login('desktopFirefox@example.com', 'desktopFirefox');
    await expect(page.getByTestId('loginId')).toContainText('desktopFirefox');
    await page.context().storageState({path: STORAGE_STATE_PATH + 'DesktopFirefoxMember.json'});
});
