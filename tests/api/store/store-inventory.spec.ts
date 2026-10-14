
import { test, expect } from '../../../src/fixtures/api.fixture';
import { measureResponseTime } from '../../../src/utils/response-time';
import {expectJsonContentType, expectResponseTime, expectStatus,} from '../../../src/utils/api-assertions';

test('retrieve store inventory with valid response data', async ({ storeClient }) => {
  const { result: response, responseTimeMs } = 
    await measureResponseTime(() => storeClient.getInventory());
  console.log(`Store inventory response time: ${responseTimeMs} ms`);

  expectStatus(response.status(), 200);
  expectJsonContentType(response.headers()['content-type']);
  expectResponseTime(responseTimeMs, 5000);

  const inventory = await response.json();

  expect(inventory).toBeTruthy();
  expect(typeof inventory).toBe('object');
  expect(Array.isArray(inventory)).toBe(false);

  const inventoryEntries = Object.entries(inventory);

  expect(inventoryEntries.length).toBeGreaterThan(0);

  for (const [status, quantity] of inventoryEntries) {
    expect(typeof status).toBe('string');
    expect(typeof quantity).toBe('number');
    expect(quantity).toBeGreaterThanOrEqual(0);
  }
});
