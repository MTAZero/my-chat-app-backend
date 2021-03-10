import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ManagerRulesController } from './manager-rules.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ManagerRulesController]
})
export class ManagerRulesModule {}
