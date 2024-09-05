import { ResponseFormat } from '@/core/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser, UpdateUser, UserProfile } from '@auth0-angular-nestjs/domain-shared';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private readonly http: HttpClient) {}

	getAll() {
		return this.http.get<ResponseFormat<UserProfile[]>>(`${environment.API_URL}/users`);
	}

	create(createUser: CreateUser) {
		return this.http.post<ResponseFormat<UserProfile>>(`${environment.API_URL}/users`, createUser);
	}

	update(email: string, updateUser: UpdateUser) {
		return this.http.patch<ResponseFormat<UserProfile>>(
			`${environment.API_URL}/users/${email}`,
			updateUser
		);
	}

	delete(email: string) {
		return this.http.delete<ResponseFormat<void>>(`${environment.API_URL}/users/${email}`);
	}
}
