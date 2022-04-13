import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { ETermType } from '../types/enums';
import {
  TermCategory,
  TermFeeling,
  TermGenre,
  TermSelection,
} from '../types/types';

type Taxonomies = {
  [ETermType.eventCategory]: TermCategory[];
  [ETermType.eventGenre]: TermGenre[];
  [ETermType.eventFeeling]: TermFeeling[];
  [ETermType.eventSelection]: TermSelection[];
};

@Injectable()
export class TaxonomyService {
  constructor(private readonly apiService: ApiService) {}

  async getTaxonomy() {
    return this.apiService.get<Taxonomies>('taxonomy');
  }
}
