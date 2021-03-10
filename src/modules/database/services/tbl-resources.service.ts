import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IModelDbService } from '../interface';
import {
    tblResourcesDocument,
    tbl_resources,
} from '../schema/tbl_resources.schema';

@Injectable()
export class TblResourceService implements IModelDbService<tbl_resources, any> {
    constructor(
        @InjectModel(tbl_resources.name)
        private readonly resourceModel: Model<tblResourcesDocument>,
    ) {}

    async getAll(): Promise<tbl_resources[]> {
        let entitys = await this.resourceModel.find().exec();
        return entitys;
    }

    async getOne(id: string): Promise<tbl_resources> {
        return await this.resourceModel.findById(id).lean().exec();
    }

    async update(id: string, entity: any) {
        return this.resourceModel.updateOne({ _id: id}, entity).exec()
    }

    async remove(id: string) {
        return this.resourceModel.remove({ _id: id })
    }

    async insert(entity: any): Promise<tbl_resources> {
        let _entity = new this.resourceModel(entity);
        return await _entity.save();
    }
}
