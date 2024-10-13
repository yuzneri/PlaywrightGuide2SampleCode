import {Page} from '@playwright/test';

export class LoginFixture {
    constructor(public readonly page: Page) {
    }

    async login(email: string, password: string) {
        await this.page.goto('/login');
        await this.page.getByLabel('Email').fill(email);
        await this.page.getByLabel('Password').fill(password);
        await this.page.getByRole('button', {name: 'LOG IN'}).click();
    }
}
