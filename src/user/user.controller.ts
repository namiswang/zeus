import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
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
  async login(@Body() user: LoginDto) {
    const vo = await this.userService.login(user);

    if (vo instanceof HttpException) {
      throw vo;
    }

    vo.accessToken = this.jwtService.sign({
      user: {
        id: vo.userInfo.id,
        username: vo.userInfo.username,
      },
    });
    return vo;
  }

  @Post('register')
  async register(@Body() user: RegisterDto) {
    return await this.userService.register(user);
  }
}
