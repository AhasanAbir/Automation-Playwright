
import { test, expect } from '../../../src/fixtures/api.fixture';
import { HTTP_STATUS } from '../../../src/constants/http-status';
import { expectStatus } from '../../../src/utils/api-assertions';

test('retrieve a pet with a nonexistent ID', async ({ petClient }) => {
  const nonexistentPetId = 999999999;
  const response = await petClient.getPetById(nonexistentPetId);
  expectStatus(response.status(), HTTP_STATUS.NOT_FOUND);
  const responseBody = await response.text();
  expect(responseBody.length).toBeGreaterThan(0);
});


test('inspect how pet creation handles a numeric name', async ({ request }) => {
  const petId = Date.now();

  const response = await request.post('pet', {
    data: {
      id: petId,
      name: 12345,
      status: 'available',
    },
  });

  expect(response.status()).toBe(200);
  const createdPet = await response.json();
  expect(createdPet.id).toBe(petId);
  expect(createdPet.name).toBe('12345');
  // Clean up the record created by this test.
  const deleteResponse = await request.delete(`pet/${petId}`);
  expect(deleteResponse.status()).toBe(200);
});

