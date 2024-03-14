import { expect, test } from '@playwright/test';
import { signIn } from '../config';

test('member can create a team', async ({ page }) => {
	await signIn(page);
	await page.getByRole('button').filter({ hasText: 'create a team' }).click();
	await page.getByRole('textbox', { name: 'name' }).fill('simple lineup test team');
	await page.getByRole('button').filter({ hasText: 'create team' }).click();

	await page.waitForURL('https://checkout.stripe.com/**');
	await expect(page).toHaveURL(/(https:\/\/checkout\.stripe\.com\/)((?:[a-z][a-z0-9_]*))/i);
});
