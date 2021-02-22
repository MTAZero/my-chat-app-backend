import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ManagerMessagesController } from './manager-messages.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [ManagerMessagesController],
})
export class ManagerMessagesModule {}
