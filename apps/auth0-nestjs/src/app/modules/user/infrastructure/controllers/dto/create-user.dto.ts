import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@MinLength(5)
	@MaxLength(150)
	email: string;
}
