import { PartialType } from "@nestjs/swagger";
import { LoginAuthDto } from "./login-auth.dto";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterAuthDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
