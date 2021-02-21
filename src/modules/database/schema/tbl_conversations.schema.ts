import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type tblConversations = tbl_conversations & Document;

@Schema()
export class tbl_conversations {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    sex: number;

    @Prop()
    address: string;

    @Prop()
    fullname: string;

    @Prop()
    avatar: string;
}

export const conversationSchema = SchemaFactory.createForClass(tbl_conversations);
