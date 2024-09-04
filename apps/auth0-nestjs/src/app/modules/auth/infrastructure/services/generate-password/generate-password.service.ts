import { GeneratePasswordOptions, GeneratePasswordServiceAdapter } from '@/auth/domain/adapters/generate-password';
import { Injectable } from '@nestjs/common';
 
import { generate } from 'generate-password';

@Injectable()
export class GeneratePasswordService implements GeneratePasswordServiceAdapter {
	private readonly passwordOptions: GeneratePasswordOptions = {
		length: 10,
		numbers: true,
		symbols: '$@_.&%,¿?',
		lowercase: true,
		uppercase: false
	};

	generatePassword(options = this.passwordOptions): string {
		return generate({
			...options
		});
	}
}
