import { Injectable } from '@nestjs/common';
import { IModelDbService } from '../interface'
import { tblUserDocument, tbl_user } from '../schema/index';
import { tbl_user_dto } from '../dto/index'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt"

@Injectable()
export class TblUsersService implements IModelDbService<tbl_user, tbl_user_dto>{

    constructor(
        @InjectModel(tbl_user.name) private readonly userModel: Model<tblUserDocument>,
    ) { }

    async getAll(): Promise<tbl_user[]> {
        return this.userModel.find().exec()
    }

    async getOne(id: string): Promise<tbl_user> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, entity: tbl_user_dto) {
        return this.userModel
            .updateMany({
                _id: id
            },
                entity)
            .exec();
    }

    async remove(id: string) {
        return this.userModel.remove({ _id: id})
    }

    async insert(entity: any): Promise<tbl_user> {
        entity.password = await bcrypt.hash(entity.password, 10)

        const user_entity = new this.userModel(entity)
        return user_entity.save();
    }
}
