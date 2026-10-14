
import { test as base } from '@playwright/test';

import { PetClient } from '../clients/pet.client';
import { StoreClient } from '../clients/store.client';

type ApiFixtures = {
  petClient: PetClient;
  storeClient: StoreClient;
};

export const test = base.extend<ApiFixtures>({
  petClient: async ({ request }, use) => {
    await use(new PetClient(request));
  },

  storeClient: async ({ request }, use) => {
    await use(new StoreClient(request));
  },
});

export { expect } from '@playwright/test';
