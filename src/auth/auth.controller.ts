import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/users/schemas/user.schema';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'User registered Successfully!' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  registerUser(@Body() user: RegisterAuthDto): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'User logged Successfully!' })
  @ApiBadRequestResponse({ description: 'User Not found.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  loginUser(@Body() user: LoginAuthDto) {
    return this.authService.login(user);
  }
}
