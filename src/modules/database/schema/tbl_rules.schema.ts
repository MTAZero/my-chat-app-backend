import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { tbl_resources } from './tbl_resources.schema';
import { tbl_user } from './tbl_users.schema';

export type tblRulesDocument = tbl_rules & Document;

@Schema()
export class tbl_rules {
    _id: string;

    @Prop()
    type: Number;

    @Prop()
    module_code: string;

    @Prop()
    action_code: string;

    @Prop({ type: Types.ObjectId, ref: tbl_resources.name })
    resource_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: tbl_user.name })
    user_id: Types.ObjectId;

    @Prop()
    is_allow: Boolean;

    @Prop()
    status: Number

    @Prop({ default: 1000000})
    priority: Number
}

export const RulesSchema = SchemaFactory.createForClass(tbl_rules);
