import { Controller, Get, Inject, Param, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { TblMessageService } from '../database/services/tbl-message.service';

@Controller('manager-messages')
export class ManagerMessagesController {
    @Inject(TblMessageService)
    messageService: TblMessageService;

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getListMessage(@Query() params, @Query('number', ParseIntPipe) num: number) {
        let from = params.from ? params.from : new Date().getTime();
        let _number = num ? num : 10
        console.log("params: ", params)

        const filter = {
            timestamp: {
                $lte: from 
            }
        }

        return await this.messageService.getFilter(filter, _number);
    }
}
