import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { AuthPage } from '../pages/AuthPage';

test('User can vote on a car model (happy path)', async ({ page }) => {
    const auth = new AuthPage(page);
    const user = {
        username: `u${Date.now()}`,
        firstName: 'Vote',
        lastName: 'Tester',
        password: 'P@ssw0rd!'
    };

    await auth.gotoRegister();
    await auth.register(user.username, user.firstName, user.lastName, user.password);
    await expect(page.locator('text=Registration is successful')).toBeVisible();

    await auth.gotoLogin();
    await auth.login(user.username, user.password);
    await auth.waitForLoggedIn();
    await expect(page.locator('text=Logout')).toBeVisible();
    await expect(page.locator('a[href*="/model/"]').first()).toBeVisible();

    const product = new ProductPage(page);
    await product.openFirstModel();

    const votesBefore = await product.getVoteCount();
    await product.vote(`Automation vote ${Date.now()}`);

    await expect(page.getByText('Thank you for your vote!')).toBeVisible();
    await expect.poll(async () => product.getVoteCount()).toBeGreaterThan(votesBefore);
});
