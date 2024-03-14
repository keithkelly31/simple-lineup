export const test_email = 'testuser@simplelineup.com';
export const test_password = '123456';
export const test_user_id = 'c1db9fd2-93a9-417b-8d53-cc7f27061b1d';

export async function signIn(/** @type { import("@playwright/test").Page } */ page) {
	await page.goto('/auth/signin');
	await page.getByRole('textbox', { name: 'email' }).fill(test_email);
	await page.getByRole('textbox', { name: 'password' }).fill(test_password);
	await page.getByRole('button', { name: 'sign in' }).click();
	await page.waitForURL('/members/**');
	return;
}
