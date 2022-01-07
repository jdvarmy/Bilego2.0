import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { ApiModule } from '../api/api.module';

@Module({
  imports: [ApiModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
