import {expect, test as base} from '@playwright/test';
import {STORAGE_STATE_PATH} from '../../../playwright.config';
import {LoginPage} from "../../Fixtures/LoginPage";

const setup = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('desktopChrome@example.com', 'desktopChrome');

        await use(loginPage);
    },
});

setup('デスクトップChromeログイン', async ({loginPage, page}) => {
    await expect(page.getByTestId('loginId')).toContainText('desktopChrome');
    await page.context().storageState({path: STORAGE_STATE_PATH + 'DesktopChromeLogin.json'});
});
