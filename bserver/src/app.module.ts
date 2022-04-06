import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { ItemsModule } from './items/items.module';
import { ArtistsModule } from './artists/artists.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { SlidesModule } from './slides/slides.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiModule,
    AuthModule,
    UsersModule,
    EventsModule,
    ArtistsModule,
    ItemsModule,
    TicketsModule,
    SlidesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
