import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { TermType } from '../types/enums';
import {
  TermCategory,
  TermFeeling,
  TermGenre,
  TermSelection,
} from '../types/types';

type Taxonomies = {
  [TermType.eventCategory]: TermCategory[];
  [TermType.eventGenre]: TermGenre[];
  [TermType.eventFeeling]: TermFeeling[];
  [TermType.eventSelection]: TermSelection[];
};

@Injectable()
export class TaxonomyService {
  constructor(private readonly apiService: ApiService) {}

  async getTaxonomy() {
    return this.apiService.get<Taxonomies>('taxonomy');
  }
}
