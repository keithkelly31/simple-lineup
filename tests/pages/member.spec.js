import { expect, test } from '@playwright/test';
import { signIn, test_user_id } from '../config';

test.describe('authenticated user', () => {
	test.beforeEach(async ({ page }) => {
		await signIn(page);
	});

	test('has expected title', async ({ page }) => {
		await expect(page).toHaveTitle('simple lineup | Test User');
	});
});

test('logged out user is redirected to sign in page', async ({ page }) => {
	await page.goto(`/members/${test_user_id}`);
	await page.waitForURL('/auth/signin');
	await expect(page).toHaveURL('/auth/signin');
});
