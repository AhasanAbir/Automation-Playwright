
import { test, expect } from '@playwright/test';

test('Get a user successfully', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  // Validate HTTP status
  expect(response.status()).toBe(200);

  // Validate response body
  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.name).toBeTruthy();
  expect(body.email).toContain('@');

  // Validate response headers
  expect(response.headers()['content-type'])
    .toContain('application/json');
});
