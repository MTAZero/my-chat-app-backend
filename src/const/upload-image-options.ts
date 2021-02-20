import { editFileName, imageFileFilter } from 'src/utils';
import { diskStorage } from 'multer';

export const uploadFileOption = {
    storage: diskStorage({
        destination: './files',
        filename: editFileName,
    }),
    fileFilter: imageFileFilter,
};

export const uploadMultipleFileOption = {
    storage: diskStorage({
        destination: './files',
        filename: editFileName,
    }),
    fileFilter: imageFileFilter,
};
