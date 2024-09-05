import { UserServiceAdapter } from '@/user/domain';
import { Injectable } from '@nestjs/common';
import { UseCaseProxy } from '@shared/domain/use-case';

@Injectable()
export class DeleteUserUseCases implements UseCaseProxy {
    
	constructor(private readonly userService: UserServiceAdapter) {}

	async execute(email: string) {
		await this.userService.delete(email);
	}
}
