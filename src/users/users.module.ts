import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserStorage } from './storage/users.storage';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserStorage],
})
export class UsersModule {}
