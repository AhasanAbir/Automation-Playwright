
import type { APIRequestContext, APIResponse } from '@playwright/test';

export class StoreClient {
  constructor(private readonly request: APIRequestContext) {}

  async getInventory(): Promise<APIResponse> {
    return this.request.get('store/inventory');
  }
}
