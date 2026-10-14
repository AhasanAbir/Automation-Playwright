
import { expect } from '@playwright/test';
import { validateSchema } from './schema-validator';

export function expectSchema(
  schema: object,
  data: unknown,
): void {
  const errors = validateSchema(schema, data);

  expect(
    errors,
    `Schema validation failed:\n${errors.join('\n')}`,
  ).toEqual([]);
}
