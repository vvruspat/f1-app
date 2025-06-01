import type { IUser } from "@repo/types";
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto implements IUser {
  @ApiProperty({ description: 'Unique identifier for the user', type: Number, required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ description: 'Email address of the user', type: String, format: 'email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Password for the user account (hashed in DB)', type: String, format: 'password' })
  @IsString()
  password!: string;
}