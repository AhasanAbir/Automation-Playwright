
import type { Pet } from '../models/pet.model';

export function createPetTestData(
  overrides: Partial<Pet> = {},
): Pet {
  const uniqueId = Date.now();

  return {
    id: uniqueId,
    name: `Automation Pet ${uniqueId}`,
    status: 'available',
    ...overrides,
  };
}
