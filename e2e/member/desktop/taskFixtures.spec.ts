import {expect, test as base} from '@playwright/test';
import {format} from "@formkit/tempo";
import {TaskFixture} from "../../Fixtures/TaskFixture";

const id = () => {
    return Math.random().toString(36).slice(-8);
}

const test = base.extend<{ taskFixture: TaskFixture }>({
    taskFixture: async ({page}, use) => {
        const task = new TaskFixture(page);
        await task.addTask(`カレーを作る${id()}`);

        await use(task);

        await task.removeTask();
    },
});
test.describe('タスクのテスト(Fixture)', () => {
    test('タスク編集', async ({page, taskFixture}) => {
        const taskName = `シチューを作る${id()}`;

        await page.getByRole('link', {name: taskFixture.name}).click();
        await page.getByRole('link', {name: '編集'}).click();
        await page.getByLabel('タスク名').fill(taskName);
        await page.getByRole('button', {name: '更新'}).click();

        await expect(page.getByRole('main')).toContainText(taskName);
    });

    test('タスク完了', async ({page, taskFixture}) => {
        await page.getByRole('link', {name: taskFixture.name}).click();

        const taskUrl = page.url();
        await page.getByRole('button', {name: '完了'}).click();

        await page.goto(taskUrl);
        await expect(page.getByRole('main')).toContainText(format(new Date(), 'YYYY-MM-DD'));
    });

    test('タスクエクスポート', async ({page, taskFixture}) => {
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('link', {name: 'CSV ダウンロード'}).click();
        const download = await downloadPromise;
        const readStream = await download.createReadStream();
        let fileContent = '';

        for await (const chunk of readStream) {
            fileContent += chunk;
        }

        await expect(fileContent).toContain(taskFixture.name);
    });
});
