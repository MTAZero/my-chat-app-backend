import { Body, Controller, Get, Inject, Post, UseInterceptors } from '@nestjs/common';
import { IModelDbService } from '../database/interface';
import { tbl_user } from '../database/schema';
import { TblUsersService } from '../database/services/tbl-users.service';
import * as bcrypt from 'bcrypt'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('manager-users')
export class ManagerUsersController {

    @Inject(TblUsersService)
    UserDbService: IModelDbService<any, any>;

    @Get("")
    async getListUser(@Body() body){
        return this.UserDbService.getAll()
    }

    @Post("")
    @UseInterceptors(FileInterceptor("file"))
    async insertUser(@Body() entity){
        entity.password = await bcrypt.hash(entity.password, 10)

        return this.UserDbService.insert(entity)
    }
}
