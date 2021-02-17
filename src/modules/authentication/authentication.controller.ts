import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthenticationController {

    @Post("login")
    @UseInterceptors(FileInterceptor("file"))
    handleLogin(@Body() body){
        if (body.username === "admin" && body.password === "123") 
            return "login success"
        return "login fail"
    }

    @Get("my-info")
    handleGetMyInfo(){
        return {
            "your info" : "Bùi Xuân Thuỷ"
        }
    }
}
