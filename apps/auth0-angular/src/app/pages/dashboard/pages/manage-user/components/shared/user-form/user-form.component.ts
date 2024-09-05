import { TypedFormControls } from '@/core/interfaces';
import { ChangeDetectionStrategy, Component, forwardRef, inject, OnInit } from '@angular/core';
import {
	ControlValueAccessor,
	FormBuilder,
	FormGroup,
	FormsModule,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfile } from '@auth0-angular-nestjs/domain-shared';

@Component({
	selector: 'app-user-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
	templateUrl: './user-form.component.html',
	styleUrl: './user-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => UserFormComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => UserFormComponent),
			multi: true
		}
	]
})
export class UserFormComponent implements ControlValueAccessor, OnInit {
	private readonly formBuilder = inject(FormBuilder);
	userForm: FormGroup<TypedFormControls<UserProfile>>;

	ngOnInit(): void {
		this.buildForm();
	}

	private buildForm() {
		this.userForm = this.formBuilder.group({
			id: [null],
			email: [
				'',
				Validators.compose([Validators.required, Validators.email, Validators.maxLength(150)])
			],
			name: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(150)
				])
			],
			family_name: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(150)
				])
			]
		});
	}

	// propagates value changes to parent form control when nested user form changes
	registerOnChange(fn: unknown): void {
		this.userForm.valueChanges.subscribe(fn);
	}

	// marks parent form control as touched when nested user form changes
	registerOnTouched(fn: unknown): void {
		this.userForm.valueChanges.subscribe(fn);
	}

	registerOnValidatorChange(fn: unknown): void {
		this.userForm.valueChanges.subscribe(fn);
	}

	// disabled nested user form when parent form control is disabled
	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.userForm.disable() : this.userForm.enable();
	}

	// writes value to nested user form when value is set to parent form control
	writeValue(user: UserProfile): void {
		this.userForm.patchValue(user, { emitEvent: false });
	}

	// propagates validation errors from nested user form to parent form control
	validate() {
		return this.userForm.valid ? null : { userData: true };
	}
}
