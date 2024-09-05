import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ required: true })
	@IsEmail()
	@IsNotEmpty()
	@MinLength(5)
	@MaxLength(150)
	email: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	@MinLength(5)
	@MaxLength(150)
	@IsString()
	family_name: string;

	@ApiProperty({ required: true })
	@IsNotEmpty()
	@MinLength(5)
	@MaxLength(150)
	@IsString()
	name: string;
}
