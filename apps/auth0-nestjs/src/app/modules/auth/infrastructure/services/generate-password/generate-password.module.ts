import { GeneratePasswordServiceAdapter } from '@/auth/domain/adapters/generate-password';
import { GeneratePasswordService } from '@/auth/infrastructure/services/generate-password/generate-password.service';
import { Module } from '@nestjs/common';

@Module({
	providers: [
		{
			provide: GeneratePasswordServiceAdapter,
			useClass: GeneratePasswordService
		}
	],
	exports: [GeneratePasswordServiceAdapter]
})
export class GeneratePasswordServiceModule {}
