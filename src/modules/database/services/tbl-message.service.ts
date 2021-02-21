import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tbl_message_dto } from '../dto';
import { IModelDbService } from '../interface';
import { tblMessageDocument, tbl_messages } from '../schema';

@Injectable()
export class TblMessageService implements IModelDbService<tbl_messages, tbl_message_dto>  {

    constructor(
        @InjectModel(tbl_messages.name) private readonly messageModel: Model<tblMessageDocument>
    ){
    }

    async getAll(): Promise<tbl_messages[]> {
        return await this.messageModel.find().exec()
    }

    async getOne(id: string): Promise<tbl_messages> {
        return await this.messageModel.findById(id).exec()
    }

    async update(id: string, entity: tbl_message_dto) {
        return this.messageModel.updateOne({  _id: id }, entity).exec()
    }

    async remove(id: string) {
        return this.messageModel.remove({ _id: id })
    }

    async insert(entity: tbl_message_dto): Promise<tbl_messages> {
        entity.timestamp = new Date().getTime();

        const message_entity = new this.messageModel(entity)
        return await message_entity.save();

    }

}
