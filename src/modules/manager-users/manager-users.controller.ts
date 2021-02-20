import { Request, Body, Controller, Get, Inject, Post, UseGuards, UseInterceptors, Delete, Param } from '@nestjs/common';
import { IModelDbService } from '../database/interface';
import { TblUsersService } from '../database/services/tbl-users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('manager-users')
export class ManagerUsersController {

    @Inject(TblUsersService)
    UserDbService: IModelDbService<any, any>;

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getOneUser(@Param() params){
        let user = await this.UserDbService.getOne(params.id)

        if (user === null)
            return {
                "statusCode": 400,
                "message": "NotFound",
            }

        return {
            "statusCode": 200,
            "message": "success",
            "user": user
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async removeUser(@Param() params){
        await this.UserDbService.remove(params.id)

        return {
            "statusCode": 200,
            "message": "remove success"
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    async getListUser(@Request() req){
        return this.UserDbService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Post("")
    @UseInterceptors(FileInterceptor("file"))
    async insertUser(@Body() entity){
        return this.UserDbService.insert(entity)
    }

}
