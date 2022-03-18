import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  //FIND USER
  async findUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  //CREATE USER
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { name, email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    try {
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('User already exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  //LOGIN USER
  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
