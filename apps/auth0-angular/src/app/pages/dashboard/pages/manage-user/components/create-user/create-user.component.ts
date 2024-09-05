import { TypedFormControls } from '@/core/interfaces';
import { UserService } from '@/services/user';
import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUser, UserProfile } from '@auth0-angular-nestjs/domain-shared';

@Component({
	selector: 'app-create-user',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	],
	templateUrl: './create-user.component.html',
	styleUrl: './create-user.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent implements OnInit {
	created = output<UserProfile>();

	createUserForm: FormGroup<TypedFormControls<CreateUser>>;

	private readonly formBuilder = inject(FormBuilder);
	private readonly userService = inject(UserService);
	private readonly snackBar = inject(MatSnackBar);
	private readonly dialogRef = inject(MatDialogRef<CreateUserComponent>);

	ngOnInit(): void {
		this.buildForm();
	}

	buildForm() {
		this.createUserForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			name: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(150)])],
			family_name: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(150)])]
		});
	}

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
