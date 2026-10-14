
import { test, expect } from '@playwright/test';

import petRequestSchema from '../../src/schemas/pet-request.schema.json';
import { validateSchema } from '../../src/utils/schema-validator';
import { createPetTestData } from '../../src/test-data/pet.data';
import { invalidPetTestCases } from '../../src/test-data/pet-invalid.data';

test('valid pet request matches the request schema', () => {
  const pet = createPetTestData();

  const errors = validateSchema(petRequestSchema, pet);

  expect(errors).toEqual([]);
});

test('numeric pet name fails request-schema validation', () => {
  const invalidPet = {
    id: 12345,
    name: 12345,
    status: 'available',
  };

  const errors = validateSchema(petRequestSchema, invalidPet);

  expect(errors.length).toBeGreaterThan(0);
});

test('empty pet name fails request-schema validation', () => {
  const invalidPet = {
    id: 12345,
    name: '',
    status: 'available',
  };

  const errors = validateSchema(petRequestSchema, invalidPet);
  expect(errors.length).toBeGreaterThan(0);
});

for (const testCase of invalidPetTestCases) {
  test(`invalid pet request fails schema validation: ${testCase.title}`, () => {
    const errors = validateSchema(petRequestSchema, testCase.payload);
    expect(errors.length).toBeGreaterThan(0);
  });
}

