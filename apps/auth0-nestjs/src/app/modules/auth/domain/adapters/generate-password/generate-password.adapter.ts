export interface GeneratePasswordOptions {
	length: number;
	numbers: boolean;
	symbols: boolean | string;
	lowercase: boolean;
	uppercase: boolean;
	exclude?: string;
}

export abstract class GeneratePasswordServiceAdapter {
	abstract generatePassword(options?: GeneratePasswordOptions): string;
}
