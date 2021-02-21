import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tblUserDocument, tbl_user } from '../schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TblUsersService } from './tbl-users.service';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectModel(tbl_user.name)
        private readonly userModel: Model<tblUserDocument>,
        private jwtService: JwtService,
        private readonly userSerivce: TblUsersService
    ) {}

    logger = new Logger(AuthenticationService.name);

    async login(user: any): Promise<any> {
        let payload = {
            username: user.username,
            sub: user._id,
        };

        return {
            user: user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, password: string): Promise<any> {
        let user = await this.userModel.findOne({ username: username }).exec();
        if (!user)
            return {
                isValidate: false,
            };

        if (await bcrypt.compare(password, user.password))
            return {
                isValidate: true,
                user,
            };

        return {
            isValidate: false,
        };
    }

    async verifyToken(token: string){
        let data = await this.jwtService.decode(token)

        let userId = data.sub;
        let user = await this.userSerivce.getOne(userId);

        return user
    }

}
