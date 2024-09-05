import { UserFormComponent } from '@/pages/dashboard/pages/manage-user/components/shared/user-form';
import { UserService } from '@/services/user';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUser, UserProfile } from '@auth0-angular-nestjs/domain-shared';

@Component({
	selector: 'app-create-user',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, UserFormComponent],
	templateUrl: './create-user.component.html',
	styleUrl: './create-user.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent {
	created = output<UserProfile>();

	private readonly formBuilder = inject(FormBuilder);

	createUserForm: FormControl<CreateUser> = this.formBuilder.control(null);

	private readonly userService = inject(UserService);
	private readonly snackBar = inject(MatSnackBar);
	private readonly dialogRef = inject(MatDialogRef<CreateUserComponent>);

	onSave() {
		this.userService.create(this.createUserForm.getRawValue()).subscribe({
			next: ({ data }) => {
				this.snackBar.open('User created successfully');
				this.created.emit(data);
				this.dialogRef.close();
			}
		});
	}
}
