import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { Item } from '../types/types';

@Injectable()
export class ItemsService {
  constructor(private readonly apiService: ApiService) {}

  async getFilteredItems(options) {
    return this.apiService.get<Item[]>('items', options);
  }

  async getItem(slug: string) {
    return this.apiService.get<Item>(`items/${slug}`);
  }
}
