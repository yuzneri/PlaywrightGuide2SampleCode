import {expect, test as base} from '@playwright/test';
import {STORAGE_STATE_PATH} from '../../../playwright.config';
import {LoginPage} from "../../Fixtures/LoginPage";
import path from "node:path";

const setup = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);

        await use(loginPage);
    },
});

setup('デスクトップSafariログイン', async ({loginPage, page}) => {
    await loginPage.login('desktopSafari@example.com', 'desktopSafari');
    await expect(page.getByTestId('loginId')).toContainText('desktopSafari');
    await page.context().storageState({path: path.join(STORAGE_STATE_PATH, 'DesktopSafariMember.json')});
});
