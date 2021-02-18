import { Request, Body, Controller, Get, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { IModelDbService } from '../database/interface';
import { TblUsersService } from '../database/services/tbl-users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('manager-users')
export class ManagerUsersController {

    @Inject(TblUsersService)
    UserDbService: IModelDbService<any, any>;

    @UseGuards(JwtAuthGuard)
    @Get("")
    async getListUser(@Request() req){
        console.log("ala : ", req.user.userId)

        return this.UserDbService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Post("")
    @UseInterceptors(FileInterceptor("file"))
    async insertUser(@Body() entity){
        return this.UserDbService.insert(entity)
    }
}
