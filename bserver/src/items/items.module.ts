import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [ApiModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
