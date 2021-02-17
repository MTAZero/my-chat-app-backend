import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/database.module';
import { tbl_user, UserSchema } from '../database/schema';
import { TblUsersService } from '../database/services/tbl-users.service';
import { ManagerUsersController } from './manager-users.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: tbl_user.name,
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [ManagerUsersController],
    providers: [TblUsersService],
})
export class ManagerUsersModule {}
