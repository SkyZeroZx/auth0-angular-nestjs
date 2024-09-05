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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
	created = output<void>();

	createUserForm: FormGroup;

	private readonly formBuilder = inject(FormBuilder);
	private readonly userService = inject(UserService);

	ngOnInit(): void {
		this.buildForm();
	}

	buildForm() {
		this.createUserForm = this.formBuilder.group({
			email: [null, Validators.compose([Validators.required, Validators.email])]
		});
	}

	onSave() {
		this.userService.create(this.createUserForm.value).subscribe({
			next: () => {
				this.created.emit();
			}
		});
	}
}
