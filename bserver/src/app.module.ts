import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { ArtistsModule } from './artists/artists.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiModule,
    AuthModule,
    UsersModule,
    EventsModule,
    ArtistsModule,
    ItemsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
