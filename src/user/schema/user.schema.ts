import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, 'Email already exist'] })
  email: string;
  @Prop()
  password: string;
  @Prop()
  fullname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
