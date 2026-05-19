import { BasePage } from './BasePage';
import { expect, Page } from '@playwright/test';

export class ProductPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async openFirstModel() {
        const href = await this.page.locator('a[href*="/model/"]').first().getAttribute('href');
        if (!href) {
            throw new Error('No car model link found on the page');
        }
        // Firefox does not load Angular routes when '|' is left unencoded in the URL.
        const safeHref = href.replace(/\|/g, '%7C');
        await this.page.goto(safeHref);
        await this.page.waitForSelector('text=/Votes:/');
    }

    async vote(comment?: string) {
        const textarea = this.page.locator('textarea');
        if (comment) {
            await textarea.fill(comment);
            await expect(textarea).toHaveValue(comment);
        }
        const voteButton = this.page.locator('button').filter({ hasText: /^Vote/ });
        await voteButton.scrollIntoViewIfNeeded();
        await voteButton.click();
        await this.page.waitForSelector('text=Thank you for your vote!');
    }

    async getVoteCount(): Promise<number> {
        const votesText = await this.page.locator('text=/Votes:/').textContent();
        const match = votesText?.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
}
