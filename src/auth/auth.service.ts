import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from 'src/user/dtos/create-user.input';
import { User } from 'src/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async jwtValidateUser(payload) {
    const { id } = payload;
    const user = await this.userService.findOne(id);
    return user;
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && bcrypt.compare(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(createUserInput: CreateUserInput): Promise<User> {
    const { email } = createUserInput;
    const userExists = await this.userService.findOneByEmail(email);

    if (userExists) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserInput.password, 12);

    const newUser: CreateUserInput = {
      username: createUserInput.username,
      email: createUserInput.email,
      password: hashedPassword,
    };
    const user = await this.userService.create(newUser);
    console.log(user);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
