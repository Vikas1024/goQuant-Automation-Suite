import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class AuthPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async gotoRegister() {
        await this.navigate('/register');
    }

    async gotoLogin() {
        await this.navigate('/');
    }

    async register(username: string, firstName: string, lastName: string, password: string) {
        await this.page.locator('#username').fill(username);
        await this.page.locator('#firstName').fill(firstName);
        await this.page.locator('#lastName').fill(lastName);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#confirmPassword').fill(password);
        await this.page.locator('button.btn:has-text("Register")').click();
    }

    async login(username: string, password: string) {
        await this.page.locator('input[name="login"]').fill(username);
        await this.page.locator('input[name="password"]').fill(password);
        await this.page.locator('button:has-text("Login")').first().click();
    }

    async waitForLoggedIn() {
        await this.page.waitForSelector('text=Logout', { timeout: 15_000 });
    }
}
