import {expect, test} from '@playwright/test';
import {addDay, format} from "@formkit/tempo";

test('タスクのテスト(Step)', async ({page}) => {
    const id = Math.random().toString(36).slice(-8);
    const task1 = `カレーを作る${id}`;
    const task2 = `シチューを作る${id}`;

    await test.step('タスク作成', async () => {
        await page.goto('/dashboard');
        await page.getByRole('link', {name: 'Create'}).click();

        await page.getByLabel('タスク名').fill(task1);

        await page.getByLabel('期日').fill(format(addDay(new Date()), 'YYYY-MM-DD'));
        await page.getByRole('button', {name: '作成'}).click();

        await expect(page).toHaveURL(/tasks/);
        await expect(page.getByRole('table')).toContainText(task1);
    });

    await test.step('タスク編集', async () => {
        await page.goto('/tasks');
        await page.getByRole('link', {name: task1}).click();
        await page.getByRole('link', {name: '編集'}).click();
        await page.getByLabel('タスク名').fill(task2);
        await page.getByRole('button', {name: '更新'}).click();

        await expect(page.getByRole('main')).toContainText(task2);
    });

    await test.step('タスク完了', async () => {
        await page.goto('/tasks');
        await page.getByRole('link', {name: task2}).click();

        const taskUrl = page.url();
        await page.getByRole('button', {name: '完了'}).click();

        await page.goto(taskUrl);
        await expect(page.getByRole('main')).toContainText(new RegExp(format(new Date(), 'YYYY-MM-DD')));
    });

    await test.step('タスク削除', async () => {
        await page.goto('/tasks');
        await page.getByRole('link', {name: task2}).click();

        const taskUrl = page.url();
        await page.getByRole('button', {name: '削除'}).click();

        const response = await page.request.get(taskUrl);
        await expect(response).not.toBeOK();
    });
});
