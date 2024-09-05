import { UserFormComponent } from '@/pages/dashboard/pages/manage-user/components/shared/user-form';
import { UserService } from '@/services/user';
import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUser, UserProfile } from '@auth0-angular-nestjs/domain-shared';

@Component({
	selector: 'app-update-user',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, UserFormComponent],
	templateUrl: './update-user.component.html',
	styleUrl: './update-user.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserComponent implements OnInit {
	updated = output<UserProfile>();

	private readonly formBuilder = inject(FormBuilder);

	updateUserForm: FormControl<UpdateUser> = this.formBuilder.control(null);

	private readonly userService = inject(UserService);
	private readonly snackBar = inject(MatSnackBar);
	private readonly dialogRef = inject(MatDialogRef<UpdateUserComponent>);
	private readonly dataDialog = inject<UserProfile>(MAT_DIALOG_DATA);

	ngOnInit(): void {
		this.initForm();
	}

	initForm(): void {
		this.updateUserForm.patchValue({ ...this.dataDialog });
	}

	onUpdate() {
		this.userService
			.update(this.updateUserForm.getRawValue().email, this.updateUserForm.getRawValue())
			.subscribe({
				next: ({ data }) => {
					this.snackBar.open('User updated successfully');
					this.updated.emit(data);
					this.dialogRef.close();
				}
			});
	}
}
