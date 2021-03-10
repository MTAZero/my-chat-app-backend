import { Body, Controller, Get, Inject, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { OnlySAGuard } from '../authentication/guards/only-admin.guard';
import { TblRuleService } from '../database/services/tbl-rules.service';

@Controller('manager-rules')
export class ManagerRulesController {

    @Inject()
    ruleService: TblRuleService;

    @UseGuards(JwtAuthGuard)
    @Get("")
    async getRules(){
        return this.ruleService.getAll()
    }

    @UseGuards(OnlySAGuard)
    @Post("")
    @UseInterceptors(FileInterceptor("file"))
    async insertRules(@Body() entity){
        return this.ruleService.insert(entity)
    }

}
