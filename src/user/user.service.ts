import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async getAllUser() {
    const user = await this.userModel.find();
    return user;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User Not Found!');
    return user;
  }

  async updateUser(id: string, payload: UpdateUserDto, userId: any) {
    const updateUser = await this.userModel.findById(id);
    if (!updateUser) throw new NotFoundException('User Not Found!');
    if (updateUser.id !== userId)
      throw new UnauthorizedException('Your are not authenticated!');
    await this.userModel.updateOne(payload);
    return updateUser;
  }

  async deleteUser(id: string, userId: any) {
    const deleteUser = await this.userModel.findById(id);
    if (!deleteUser) throw new NotFoundException('User Not Found!');
    if (deleteUser.id !== userId)
      throw new UnauthorizedException('Your are not authenticated!');
    await this.userModel.deleteOne({ id: id });

    return deleteUser;
  }
}
