import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IModelDbService } from '../interface';
import { tblRulesDocument, tbl_rules } from '../schema';

import * as _ from 'lodash';
import { filter } from 'lodash';

@Injectable()
export class TblRuleService implements IModelDbService<tbl_rules, any> {
    constructor(
        @InjectModel(tbl_rules.name)
        private readonly ruleModel: Model<tblRulesDocument>,
    ) {}

    async getAll(): Promise<tbl_rules[]> {
        let entitys = await this.ruleModel
            .find()
            .populate('user_id', { _id: 1, fullname: 1 })
            .lean()
            .exec();

        return entitys;
    }

    async getRuleByFiler(filter): Promise<tbl_rules[]>{
        let entitys = await this.ruleModel
            .find(filter)
            .sort({ priority: 1 })
            .populate('user_id', { _id: 1, fullname: 1 })
            .limit(1)
            .lean()
            .exec();
            
        return entitys;
    }

    async getOne(id: string): Promise<tbl_rules> {
        return this.ruleModel.findById(id).lean().exec();
    }

    async update(id: string, entity: any) {
        return this.ruleModel.updateOne({ _id: id }, entity).exec();
    }

    async remove(id: string) {
        return this.ruleModel.remove({ _id: id });
    }

    async insert(entity: any): Promise<tbl_rules> {
        let _entity = new this.ruleModel(entity);

        return await _entity.save();
    }
}
