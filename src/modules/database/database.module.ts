import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    MessageSchema,
    ResourceSchema,
    RulesSchema,
    tbl_messages,
    tbl_resources,
    tbl_rules,
    tbl_user,
    UserSchema,
} from './schema';
import { TblMessageService } from './services/tbl-message.service';
import { TblRoomsService } from './services/tbl-rooms.service';
import { TblUsersService } from './services/tbl-users.service';
import { AuthenticationService } from './services/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/const';
import { TblResourceService } from './services/tbl-resources.service';
import { TblRuleService } from './services/tbl-rules.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: tbl_user.name,
                schema: UserSchema,
            },
            {
                name: tbl_messages.name,
                schema: MessageSchema,
            },
            {
                name: tbl_resources.name,
                schema: ResourceSchema,
            },
            {
                name: tbl_rules.name,
                schema: RulesSchema
            }
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '1d',
            },
        }),
    ],
    providers: [
        TblUsersService,
        TblMessageService,
        TblRoomsService,
        TblRuleService,
        TblResourceService,
        AuthenticationService,
    ],
    exports: [
        TblUsersService,
        TblMessageService,
        TblRoomsService,
        TblRuleService,
        TblResourceService,
        AuthenticationService,
    ],
})
export class DatabaseModule {}
