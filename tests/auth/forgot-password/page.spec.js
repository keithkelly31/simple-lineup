import { expect, test } from '@playwright/test';

test('forgot password page has expected title', async ({ page }) => {
	await page.goto('/auth/forgot-password');
	await expect(page).toHaveTitle('Simple Lineup | Forgot Password');
});
