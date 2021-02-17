import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { tbl_user, UserSchema } from './schema';
import { TblMessageService } from './services/tbl-message.service';
import { TblRoomsService } from './services/tbl-rooms.service';
import { TblUsersService } from './services/tbl-users.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: tbl_user.name,
                schema: UserSchema,
            },
        ]),
    ],
    providers: [TblUsersService, TblMessageService, TblRoomsService],
})
export class DatabaseModule {}
