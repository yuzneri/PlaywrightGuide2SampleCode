import {expect, test as base} from '@playwright/test';
import {STORAGE_STATE_PATH} from '../../../playwright.config';
import {LoginFixture} from "../../Fixtures/LoginFixture";
import path from "node:path";

const setup = base.extend<{ loginFixture: LoginFixture }>({
    loginFixture: async ({page}, use) => {
        const loginFixture = new LoginFixture(page);

        await use(loginFixture);
    },
});

setup('デスクトップFireFoxログイン', async ({loginFixture, page}) => {
    await loginFixture.login('desktopFirefox@example.com', 'desktopFirefox');
    await expect(page.getByTestId('loginId')).toContainText('desktopFirefox');
    await page.context().storageState({path: path.join(STORAGE_STATE_PATH, 'DesktopFirefoxMember.json')});
});
