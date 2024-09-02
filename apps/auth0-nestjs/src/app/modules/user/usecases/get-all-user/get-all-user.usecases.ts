import { UserServiceAdapter } from '@/user/domain';
import { Injectable } from '@nestjs/common';
import { UseCaseProxy } from '@shared/domain/use-case';

@Injectable()
export class GetAllUsersUseCases implements UseCaseProxy {
	
    constructor(private readonly userService: UserServiceAdapter) {}

	execute() {
		return this.userService.getAllUsers();
	}
}
