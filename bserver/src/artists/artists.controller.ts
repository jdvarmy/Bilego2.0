import { Controller, Get, Param } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('/artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get(':slug')
  async getArtist(@Param('slug') slug: string) {
    return this.artistsService.getArtist(slug);
  }
}
