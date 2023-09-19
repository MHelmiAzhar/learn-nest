import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  year: number;
  @Prop()
  author: string;
  @Prop()
  userId: string;
}
export const BookSchema = SchemaFactory.createForClass(Book);
