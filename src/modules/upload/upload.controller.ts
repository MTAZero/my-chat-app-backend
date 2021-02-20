import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as _ from 'lodash';
import {
    uploadFileOption,
    uploadMultipleFileOption,
} from 'src/const/upload-image-options';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('upload')
export class UploadController {

    @UseGuards(JwtAuthGuard)
    @Post('')
    @UseInterceptors(FileInterceptor('image', uploadFileOption))
    async uploadImage(@UploadedFile() image) {
        return _.pick(image, [
            'fieldname',
            'originalname',
            'filename',
        ]);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/multiple')
    @UseInterceptors(FilesInterceptor('image', 20, uploadMultipleFileOption))
    async uploadMultipleImage(@UploadedFiles() images) {
        return _.map(
            images,
            _.partialRight(_.pick, [
                'fieldname',
                'originalname',
                'filename',
            ]),
        );
    }

    @Get("/:img_name")
    async getImage(@Param("img_name") img_name, @Res() res){
        return res.sendFile(img_name, { root: './files' })
    }
}
