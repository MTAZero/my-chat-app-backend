import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ManagerUsersController } from './manager-users.controller';

@Module({
    imports: [
      DatabaseModule
    ],
    controllers: [ManagerUsersController],
})
export class ManagerUsersModule {}
