import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  allUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
