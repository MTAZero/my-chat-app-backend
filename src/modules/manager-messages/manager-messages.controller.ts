import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { TblMessageService } from '../database/services/tbl-message.service';

@Controller('manager-messages')
export class ManagerMessagesController {

    @Inject(TblMessageService)
    messageService: TblMessageService

    @UseGuards(JwtAuthGuard)
    @Get("")
    async getListMessage(){
        return await this.messageService.getAll()
    }

}
