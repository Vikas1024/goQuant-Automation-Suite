import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path = '/') {
        await this.page.goto(path);
    }

    async click(selector: string) {
        await this.page.click(selector);
    }

    async type(selector: string, text: string) {
        await this.page.fill(selector, text);
    }

    async getText(selector: string) {
        return this.page.textContent(selector);
    }
}
