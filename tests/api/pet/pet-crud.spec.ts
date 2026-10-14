
import { test, expect } from '../../../src/fixtures/api.fixture';
import { createPetTestData } from '../../../src/test-data/pet.data';
import { expectSchema } from '../../../src/utils/schema-assertion';
import petSchema from '../../../src/schemas/pet.schema.json';
import {expectStatus} from '../../../src/utils/api-assertions';

test('create, retrieve, and delete a pet', async ({ petClient  }) => {

  const pet = createPetTestData();
  let petCreated = false;

  try{
  const createResponse = await petClient.createPet(pet);
  expectStatus(createResponse.status(), 200);
  petCreated = true;

  const createdPet = await createResponse.json();
  expect(createdPet.id).toBe(pet.id);
  expect(createdPet.name).toBe(pet.name);
  expect(createdPet.status).toBe(pet.status);
  expectSchema(petSchema, createdPet);

  // Retrieve the pet
  const getResponse = await petClient.getPetById(pet.id);
  expectStatus(getResponse.status(), 200);
  const retrievedPet = await getResponse.json();
  expect(retrievedPet.id).toBe(pet.id);
  expect(retrievedPet.name).toBe(pet.name);
  expect(retrievedPet.status).toBe(pet.status);
  
  }finally{
  // Attempt cleanup even if a preceding assertion fails
    if (petCreated) {
      const deleteResponse = await petClient.deletePet(pet.id);
      expectStatus(deleteResponse.status(), 200);
    }
  }
});
