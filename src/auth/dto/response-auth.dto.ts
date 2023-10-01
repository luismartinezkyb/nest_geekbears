import { IsEmail, IsJWT, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class ResponseAuthDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsJWT()
  token: string;
}
