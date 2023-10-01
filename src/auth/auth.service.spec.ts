import { Model } from "mongoose";
import { AuthService } from "./auth.service";
import { User } from "src/users/schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { compare, hash } from "bcrypt";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDto } from "./dto/register-auth.dto";

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });
  describe('register', () => {
    it('should create a new user', async () => {
      // Arrange
      const userDto: RegisterAuthDto = {
        name: 'new name',
        email: 'test@example.com',
        password: 'password',
        // Add other required fields
      };
      const hashedPassword = await hash(userDto.password, 10);

      jest.spyOn(authService, 'register').mockResolvedValue(null);
      jest.spyOn(authService, 'register').mockResolvedValue({ ...userDto });

      // Act
      const result = await authService.register(userDto);

      // Assert
      expect(result).toEqual({ ...userDto, password: hashedPassword });
    });

    it('should throw a BadRequestException if the user already exists', async () => {
      // Arrange
      const userDto: RegisterAuthDto = {
        email: 'test@example.com',
        password: 'password',
        // Add other required fields
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(userDto);

      // Act & Assert
      await expect(authService.register(userDto)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      // Arrange
      const userDto: LoginAuthDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const user = {
        ...userDto,
        password: await hash(userDto.password, 10),
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(user);

      // Mock bcrypt compare function
      const bcryptCompare = jest.spyOn(bcrypt, 'compare');
      bcryptCompare.mockResolvedValue(true); // Password comparison succeeds

      // Act
      const result = await authService.login(userDto);

      // Assert
      expect(result).toHaveProperty('user', user);
      expect(result).toHaveProperty('token'); // You can add more specific token-related assertions

      // Clean up
      bcryptCompare.mockRestore();
    });

    it('should throw a NotFoundException if the user does not exist', async () => {
      // Arrange
      const userDto: LoginAuthDto = {
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      // Act & Assert
      await expect(authService.login(userDto)).rejects.toThrowError(NotFoundException);
    });

    it('should throw a BadRequestException if the password is incorrect', async () => {
      // Arrange
      const userDto: LoginAuthDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const user = {
        ...userDto,
        password: await hash('wrong-password', 10), // Incorrect password
      };

      jest.spyOn(userModel, 'findOne').mockResolvedValue(user);

      // Mock bcrypt compare function
      const bcryptCompare = jest.spyOn(bcrypt, 'compare');
      bcryptCompare.mockResolvedValue(false); // Password comparison fails

      // Act & Assert
      await expect(authService.login(userDto)).rejects.toThrowError(BadRequestException);

      // Clean up
      bcryptCompare.mockRestore();
    });
  });
});
