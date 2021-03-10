import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { DatabaseModule } from '../database/database.module';
import { ManagerResourcesController } from './manager-resources.controller';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [ManagerResourcesController]
})
export class ManagerResourcesModule {}
