import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

export function modalConfig(): MatDialogConfig {
	return {
		panelClass: 'modal-mat-custom'
	};
}

export const DEFAULT_MODAL_PROVIDER = [
	{
		provide: MAT_DIALOG_DEFAULT_OPTIONS,
		useValue: modalConfig()
	}
];
