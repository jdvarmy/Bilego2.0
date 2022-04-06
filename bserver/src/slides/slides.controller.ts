import { Controller, Get, Query } from '@nestjs/common';
import { SlidesService } from './slides.service';
import { ECity } from '../types/enums';

@Controller('/slides')
export class SlidesController {
  constructor(private readonly slidesService: SlidesService) {}

  @Get()
  getSlides(@Query('c') city?: ECity) {
    return this.slidesService.getSlides(city);
  }
}
