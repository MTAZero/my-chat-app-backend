import { Request, Controller, Get, Inject, Post, UseGuards, UseInterceptors, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { stringify } from 'querystring';
import { AuthenticationService } from '../database/services/authentication.service';
import { TblUsersService } from '../database/services/tbl-users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthenticationController {

    @Inject(AuthenticationService)
    authenticaionService: AuthenticationService

    @Inject(TblUsersService)
    userService: TblUsersService

    logger = new Logger(AuthenticationController.name)

    @UseGuards(LocalAuthGuard)
    @Post("login")
    @UseInterceptors(FileInterceptor("file"))
    async handleLogin(@Request() req){
        let result = await this.authenticaionService.login(req.user)
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Post("my-info")
    async handleGetMyInfo(@Request() req){
        let result = await this.userService.getOne(req.user.userId)
        return result
    }
}
