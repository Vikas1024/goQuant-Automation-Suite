import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

/** @deprecated Buggy Cars Rating has no cart; kept for compatibility. */
export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}
