import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EventModule],
})
export class AppModule {}
