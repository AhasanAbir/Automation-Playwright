
import { test, expect } from '@playwright/test';

import petSchema from '../../src/schemas/pet.schema.json';
import { validateSchema } from '../../src/utils/schema-validator';

test('valid pet response matches the schema', () => {
  const pet = {
    id: 12345,
    name: 'Demo Pet',
    status: 'available',
  };

  const errors = validateSchema(petSchema, pet);

  expect(errors).toEqual([]);
});

test('invalid pet response fails schema validation', () => {
  const pet = {
    id: 'not-a-number',
    name: 'Demo Pet',
    status: 'available',
  };

  const errors = validateSchema(petSchema, pet);

  expect(errors.length).toBeGreaterThan(0);
});
