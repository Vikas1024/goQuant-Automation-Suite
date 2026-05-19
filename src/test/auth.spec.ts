import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';

test.describe('Auth flows', () => {
    test('User can register and login (positive)', async ({ page }) => {
        const auth = new AuthPage(page);
        await auth.gotoRegister();

        const user = {
            username: `auto${Date.now()}`,
            firstName: 'Auto',
            lastName: 'Test',
            password: 'P@ssw0rd!'
        };

        await auth.register(user.username, user.firstName, user.lastName, user.password);
        await expect(page.locator('text=Registration is successful')).toBeVisible();

        await auth.gotoLogin();
        await auth.login(user.username, user.password);
        await auth.waitForLoggedIn();

        await expect(page.locator('text=Logout')).toBeVisible();
        await expect(page.locator(`text=Hi, ${user.firstName}`)).toBeVisible();
    });

    test('Login fails with bad credentials (negative)', async ({ page }) => {
        const auth = new AuthPage(page);
        await auth.gotoLogin();
        await auth.login(`noone${Date.now()}`, 'wrongpass');
        await expect(page.locator('text=Invalid username/password')).toBeVisible();
    });
});
