import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}
  async login(payload: LoginDto) {
    const user = await this.userModel.findOne({ email: payload.email });

    if (!user) throw new UnauthorizedException('Wrong email or password');

    const passwordMatch = await argon.verify(user.password, payload.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Wrong email or password');

    const payloadJwt = { sub: user.id, email: user.email };
    return {
      user: user,
      token: await this.jwtService.signAsync(payloadJwt),
    };
  }

  async register(dto: AuthDto) {
    try {
      const hashPass = await argon.hash(dto.password);
      console.log(hashPass);
      const user = await this.userModel.create({
        email: dto.email,
        password: hashPass,
        fullname: dto.fullname,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
