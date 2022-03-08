import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ApiModule } from '../api/api.module';
import { PassportModule } from '@nestjs/passport';
import { AccessJwtStrategy } from '../jwt/access-jwt-strategy.service';

@Module({
  imports: [ApiModule, PassportModule],
  controllers: [UsersController],
  providers: [UsersService, AccessJwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
