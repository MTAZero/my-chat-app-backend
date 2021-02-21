import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema, tbl_messages, tbl_user, UserSchema } from './schema';
import { TblMessageService } from './services/tbl-message.service';
import { TblRoomsService } from './services/tbl-rooms.service';
import { TblUsersService } from './services/tbl-users.service';
import { AuthenticationService } from './services/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/const';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: tbl_user.name,
                schema: UserSchema,
            },
            {
                name: tbl_messages.name,
                schema: MessageSchema
            }
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '1d'
            }
        })
    ],
    providers: [TblUsersService, TblMessageService, TblRoomsService, AuthenticationService],
    exports: [TblUsersService, TblMessageService, TblRoomsService, AuthenticationService]
})
export class DatabaseModule {}
