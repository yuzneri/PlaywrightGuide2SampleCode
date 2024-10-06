import {expect, test} from '@playwright/test';

test('TOPページのビジュアルリグレッションテスト', async ({page}, testInfo) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot({fullPage: true});
});

test('TOPページのスナップショットテスト', async ({page}, testInfo) => {
    await page.goto('/');
    expect(await page.textContent('body')).toMatchSnapshot();
});

test('リクエストをモック', async ({page}, testInfo) => {
    await page.route('/', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: '<!doctype html><meta charset="utf-8"><title>Mock</title><h1>Mock</h1>',
        });
    });
    await page.goto('/');
    await expect(page.getByRole('heading')).toContainText('Mock');
});

test('元のレスポンスを取得し書き換える', async ({page}, testInfo) => {
    await page.route('/', async (route) => {
        const response = await route.fetch();
        const body = (await response.text()).replace(/ログイン/g, '会員メニュー');
        await route.fulfill({response, body});
    });

    await page.goto('/');
    await expect(page.getByRole('main')).toContainText('会員メニュー');
});
