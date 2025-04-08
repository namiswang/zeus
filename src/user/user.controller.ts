import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Post('login')
  async login(@Body(ValidationPipe) user: LoginDto) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: 'id' in foundUser ? foundUser.id : '',
          username: 'username' in foundUser ? foundUser.username : '',
        },
      });
      return {
        token,
        username: 'username' in foundUser ? foundUser.username : '',
      };
    } else {
      return '登录失败';
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }
}
