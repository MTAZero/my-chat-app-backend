import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tblUserDocument, tbl_user } from '../schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectModel(tbl_user.name)
        private readonly userModel: Model<tblUserDocument>,
        private jwtService: JwtService,
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
        this.logger.debug(`check - ${username} - ${password}`);

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
}
