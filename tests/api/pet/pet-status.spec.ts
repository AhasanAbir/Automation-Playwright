import { test, expect } from '../../../src/fixtures/api.fixture';
import { createPetTestData } from '../../../src/test-data/pet.data';
import { validPetStatuses } from '../../../src/test-data/pet-status.data';
import {expectStatus} from '../../../src/utils/api-assertions';

for (const status of validPetStatuses) {
  test(`create and retrieve a pet with status "${status}"`, async ({ petClient }) => {
    const pet = createPetTestData({ status });
    let petCreated = false;

    try {
      const createResponse = await petClient.createPet(pet);
      expectStatus(createResponse.status(), 200);
      petCreated = true;

      const getResponse = await petClient.getPetById(pet.id);
      expectStatus(getResponse.status(), 200);

      const retrievedPet = await getResponse.json();
      expect(retrievedPet.status).toBe(status);
    } finally {
      if (petCreated) {
        const deleteResponse = await petClient.deletePet(pet.id);
        expectStatus(deleteResponse.status(), 200);
      }
    }
  });
}