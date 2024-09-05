import { debounceTime, distinctUntilChanged } from 'rxjs';

import { UserService } from '@/services/user';
import { ChangeDetectionStrategy, Component, inject, OnInit, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserProfile } from '@auth0-angular-nestjs/domain-shared';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateUserComponent } from './components/create-user/create-user.component';

@Component({
	selector: 'app-manage-user',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatTableModule,
		MatPaginatorModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatSortModule,
		MatInputModule,
		MatDialogModule
	],
	templateUrl: './manage-user.component.html',
	styleUrl: './manage-user.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageUserComponent implements OnInit {
	displayedColumns = ['email', 'nickname', 'user_id', 'created_at', 'updated_at'];

	searchControl = new FormControl<string>('');

	paginator = viewChild(MatPaginator);

	sort = viewChild(MatSort);

	dataSource: MatTableDataSource<UserProfile>;

	private readonly userService = inject(UserService);
	private readonly matDialog = inject(MatDialog);

	ngOnInit(): void {
		this.getUsers();
		this.onChangeSearch();
	}

	onChangeSearch() {
		this.searchControl.valueChanges
			.pipe(distinctUntilChanged(), debounceTime(400))
			.subscribe((search) => {
				this.dataSource.filter = search.trim().toLocaleLowerCase();
			});
	}

	getUsers() {
		this.userService.getAll().subscribe({
			next: ({ data }) => {
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.sort = this.sort();
				this.dataSource.paginator = this.paginator();
			}
		});
	}

	showCreateUser() {
		const createUserInstance = this.matDialog.open(CreateUserComponent).componentInstance;
		createUserInstance.created.subscribe(() => this.getUsers());
	}

	showUpdate(update: any) {
		null;
	}
}
