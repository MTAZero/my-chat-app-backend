import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DatabaseModule } from '../database/database.module';
import { ManagerUsersController } from './manager-users.controller';

@Module({
    imports: [DatabaseModule, AuthenticationModule],
    controllers: [ManagerUsersController],
})
export class ManagerUsersModule {}
