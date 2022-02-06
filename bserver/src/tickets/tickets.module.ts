import { Module } from '@nestjs/common';
import { ApiModule } from '../api/api.module';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';

@Module({
  imports: [ApiModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
