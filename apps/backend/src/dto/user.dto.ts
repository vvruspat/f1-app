import type { IUser } from "@repo/types";
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class UserDto implements IUser {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}