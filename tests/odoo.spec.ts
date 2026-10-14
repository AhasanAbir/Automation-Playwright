import { test, expect, chromium, type Page } from '@playwright/test';

test.describe('New Digital Test Cases', () => {
  let page: Page;

  test.beforeAll(async () => {
    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    const browser = page?.context()?.browser();
    if (browser) {
      await browser.close();
    }
  });


test('verify the home page of the application', async () => {
  await page.goto('https://demo.odoo.com');
  await expect(page.locator('//span[contains(text(), "This is a demo database")]')).toContainText('This is a demo database');
});

test('verify that a calendar meeting can be scheduled with default date and time', async () => {
  await page.goto('https://demo.odoo.com');
  await page.getByRole('option', { name: 'Calendar' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Meeting Subject' }).click();
  await page.getByRole('textbox', { name: 'Meeting Subject' }).fill('Team Lunch Meeting');
  await page.getByRole('button', { name: 'Send email' }).click();
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await page.getByRole('link', { name: 'Meetings' }).click();
  await expect(page.locator('text=Calendar Event created')).toContainText('Calendar Event created');
});

test('verify that a employee can be created', async () => {
  await page.goto('https://demo.odoo.com');
  await page.getByRole('option', { name: 'Employees' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Demo Employee');
  await page.getByRole('combobox', { name: 'Employee Type' }).click();
  await page.getByRole('option', { name: 'Employee' }).click();
  await page.getByRole('textbox', { name: 'Wage?' }).click();
  await page.getByRole('textbox', { name: 'Wage?' }).fill('5000');
  await page.getByRole('textbox', { name: 'Work Email' }).click();
  await page.getByRole('textbox', { name: 'Work Email' }).fill('demo@gmail.com');
  await page.getByRole('button', { name: 'Invite', exact: true }).click();
  await expect(page.locator('text=Employee created')).toContainText('Employee created');
});
});
