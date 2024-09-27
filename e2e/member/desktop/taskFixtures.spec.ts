import {expect, test as base} from '@playwright/test';
import {format} from "@formkit/tempo";
import {Task} from "../../Fixtures/Task";

const id = () => {
    return Math.random().toString(36).slice(-8);
}

const testBeforeCreate = base.extend<{ task: Task }>({
    task: async ({page}, use) => {
        const task = new Task(page);

        await use(task);

        await task.removeTask();
    },
});

const testAfterCreate = base.extend<{ task: Task }>({
    task: async ({page}, use) => {
        const task = new Task(page);
        await task.addTask(`カレーを作る${id()}`)

        await use(task);

        await task.removeTask();
    },
});

testBeforeCreate('タスク作成', async ({task, page}) => {
    const taskName = `カレーを作る${id()}`;
    await task.addTask(taskName)

    await expect(page).toHaveURL(/tasks/);
    await expect(page.getByRole('table')).toContainText(taskName);
});

testAfterCreate('タスク編集', async ({task, page}) => {
    const taskName = `シチューを作る${id()}`;

    await page.getByRole('link', {name: task.name}).click();
    await page.getByRole('link', {name: '編集'}).click()
    await page.getByLabel('タスク名').fill(taskName);
    await page.getByRole('button', {name: '更新'}).click()

    await expect(page.getByRole('main')).toContainText(taskName);
});

testAfterCreate('タスク完了', async ({task, page}) => {
    await page.getByRole('link', {name: task.name}).click();

    const taskUrl = page.url();
    await page.getByRole('button', {name: '完了'}).click()

    await page.goto(taskUrl);
    await expect(page.getByRole('main')).toContainText(format(new Date(), 'YYYY-MM-DD'));
});

testAfterCreate('タスクエクスポート', async ({task, page}) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', {name: 'CSV ダウンロード'}).click();
    const download = await downloadPromise;
    const readStream = await download.createReadStream();
    let fileContent = '';

    for await (const chunk of readStream) {
        fileContent += chunk;
    }

    await expect(fileContent).toContain(task.name);
});
