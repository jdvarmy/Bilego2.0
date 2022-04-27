import { Controller, Get, Param, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { City, TermType } from '../types/enums';

@Controller('/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getFilteredItems(
    @Query('city') city?: City,
    @Query('category') categories?: TermType | TermType[],
    @Query('count') count?: number,
    @Query('offset') offset?: number,
  ) {
    return this.itemsService.getFilteredItems({
      city,
      category: categories || [],
      count: count ?? 10,
      offset: offset ?? 0,
    });
  }

  @Get(':slug')
  getEvent(@Param('slug') slug: string) {
    return this.itemsService.getItem(slug);
  }
}
