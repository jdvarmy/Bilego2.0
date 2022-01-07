import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { Artist } from '../types/types';

@Injectable()
export class ArtistsService {
  constructor(private readonly apiService: ApiService) {}

  async getArtist(slug: string) {
    return this.apiService.get<Artist>(`artists/${slug}`);
  }
}
