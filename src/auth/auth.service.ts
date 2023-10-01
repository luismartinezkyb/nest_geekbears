import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtAuthService: JwtService,
  ) {}

  async register(user: RegisterAuthDto) {
    const data = await this.userModel.findOne({ email: user.email });
    if (data) {
      throw new BadRequestException('User already exists!');
    }
    const password = await hash(user.password, 10);

    user = { ...user, password };
    return await this.userModel.create(user);
  }

  async login(user: LoginAuthDto) {
    const { email, password } = user;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) {
      throw new NotFoundException('USER_NOT_FOUND!');
    }
    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) {
      throw new BadRequestException('PASSWORD_INCORRECT');
    }
    const payload = { id: findUser.id, email: findUser.email };
    const token = this.jwtAuthService.sign(payload);
    const data = {
      user: findUser,
      token,
    };
    return data;
  }
}
