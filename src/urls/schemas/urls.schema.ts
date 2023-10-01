import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Url {
  @Prop({
    required: true,
  })
  original: string;
  @Prop()
  short: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
