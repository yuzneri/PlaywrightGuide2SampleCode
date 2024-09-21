import {expect, test} from '@playwright/test';
import {addDay, format} from "@formkit/tempo";

test('タスク管理', async ({page}) => {
    const id = Math.random().toString(36).slice(-8);
    const task1 = `カレーを作る${id}`;

    await test.step('タスク作成', async () => {
        await page.goto('/dashboard');
        await page.getByRole('button').tap();
        await page.getByRole('link', {name: 'Create'}).tap()

        await page.getByLabel('タスク名').fill(task1);

        await page.getByLabel('期日').fill(format(addDay(new Date()), 'YYYY-MM-DD'));
        await page.getByRole('button', {name: 'Create Task'}).tap()

        await expect(page).toHaveURL(/tasks/);
        await expect(page.getByText('タスクを作成しました')).toBeVisible();
        await expect(page.getByRole('table')).toContainText(task1);
    });

    await test.step('タスク削除', async () => {
        await page.goto('/tasks');
        await page.getByRole('link', {name: task1}).tap();

        const taskUrl = page.url();
        await page.getByRole('button', {name: '削除'}).tap()
        await expect(page.getByText('タスクを削除しました')).toBeVisible();
    });
});
