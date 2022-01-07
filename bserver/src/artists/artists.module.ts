import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ApiModule } from '../api/api.module';

@Module({
  imports: [ApiModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
