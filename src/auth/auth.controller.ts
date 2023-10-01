import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: RegisterAuthDto): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  loginUser(@Body() user: LoginAuthDto) {
    return this.authService.login(user);
  }
}
