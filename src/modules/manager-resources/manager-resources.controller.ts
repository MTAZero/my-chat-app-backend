import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    Param,
    Post,
    Res,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
    uploadFileOption,
    uploadMultipleFileOption,
} from 'src/const/upload-image-options';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import * as _ from 'lodash';
import { AuthHelperService } from '../authentication/casl/auth-helper.service';

@Controller('resources')
export class ManagerResourcesController {
    @Inject()
    authHelper: AuthHelperService;

    @UseGuards(JwtAuthGuard)
    @Post('')
    @UseInterceptors(FileInterceptor('image', uploadFileOption))
    async uploadImage(@UploadedFile() image) {
        return _.pick(image, ['fieldname', 'originalname', 'filename']);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/multiple')
    @UseInterceptors(FilesInterceptor('image', 20, uploadMultipleFileOption))
    async uploadMultipleImage(@UploadedFile() images) {
        return _.map(
            images,
            _.partialRight(_.pick, ['fieldname', 'originalname', 'filename']),
        );
    }

    @Get('/:img_name')
    async getImage(@Param('img_name') img_name, @Res() res) {
        let auth_rs = await this.authHelper.canAccessResource('', img_name)

        if (!auth_rs)
            throw new UnauthorizedException()

        return res.sendFile(img_name, { root: './files' });
    }
}
