
import { test, expect } from '@playwright/test';
import { StoreClient } from '../src/clients/store.client';

test('GET store inventory through the API client', async ({ request }) => {
  const storeClient = new StoreClient(request);

  const response = await storeClient.getInventory();

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toBeDefined();
  expect(Array.isArray(body)).toBe(false);
});
