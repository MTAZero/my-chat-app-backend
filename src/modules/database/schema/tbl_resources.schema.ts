import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type tblResourcesDocument = tbl_resources & Document;

@Schema()
export class tbl_resources {
    _id: string;

    @Prop()
    name: string;

    @Prop()
    url: string;

    @Prop()
    status: Number;

    @Prop()
    access_default: Boolean;
}

export const ResourceSchema = SchemaFactory.createForClass(tbl_resources);
