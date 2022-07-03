import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { ApiModule } from '../api/api.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ApiModule, DatabaseModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
