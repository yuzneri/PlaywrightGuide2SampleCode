import {expect, test} from '@playwright/test';

test('TOPページのビジュアルリグレッションテスト', async ({page}, testInfo) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot({fullPage: true});
});

test('TOPページのスナップショットテスト', async ({page}, testInfo) => {
    await page.goto('/');
    expect(await page.textContent('body')).toMatchSnapshot();
});

test('background.svgのリクエストがされているか', async ({page}, testInfo) => {
    const requestPromise = page.waitForRequest('img/background.svg');
    await page.goto('/');
    const request = await requestPromise;

    expect(request.method()).toBe('GET');
});

test('background.svgのレスポンスがされているか', async ({page}, testInfo) => {
    const responsePromise = page.waitForResponse('img/background.svg');
    await page.goto('/');
    const response = await responsePromise;

    expect(response.status()).toBe(200);
});
