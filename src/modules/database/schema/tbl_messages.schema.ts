import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { tbl_user } from './tbl_users.schema';

export type tblMessageDocument = tbl_messages & Document;

@Schema()
export class tbl_messages {
    _id: string

    @Prop({ type: Types.ObjectId, ref: tbl_user.name })
    user: Types.ObjectId;

    @Prop()
    timestamp: Number;

    @Prop()
    content: String;
}

export const MessageSchema = SchemaFactory.createForClass(tbl_messages);
