import {Page} from '@playwright/test';
import {addDay, format} from "@formkit/tempo";

export class TaskPage {
    name: string;
    private url: string;


    constructor(public readonly page: Page) {
    }
    async addTask(task: string){
        this.name = task
        await this.page.goto('/tasks/create');
        await this.page.getByLabel('タスク名').fill(task);
        await this.page.getByLabel('期日').fill(format(addDay(new Date()), 'YYYY-MM-DD'));
        await this.page.getByRole('button', {name: 'Create Task'}).click()

        await this.page.getByRole('link', {name: task}).click();
        this.url = this.page.url();
        await this.page.goBack()
    }

    async removeTask(){
        await this.page.goto(this.url);
        await this.page.getByRole('button', {name: '削除'}).click()
    }
}
