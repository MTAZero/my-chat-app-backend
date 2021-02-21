import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type tblUserDocument = tbl_user & Document;

@Schema()
export class tbl_user {
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

export const UserSchema = SchemaFactory.createForClass(tbl_user);
