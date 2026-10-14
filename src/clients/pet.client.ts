
import type {APIRequestContext,APIResponse,} from '@playwright/test';
import type { Pet } from '../models/pet.model';

export class PetClient {
  constructor(private readonly request: APIRequestContext) {}

  async createPet(pet: Pet): Promise<APIResponse> {
    return this.request.post('pet', {
      data: pet,
    });
  }

  async getPetById(petId: number): Promise<APIResponse> {
    return this.request.get(`pet/${petId}`);
  }

  async deletePet(petId: number): Promise<APIResponse> {
    return this.request.delete(`pet/${petId}`);
  }
}
