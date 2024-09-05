import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@Component({
	selector: 'app-dashboard-layout',
	standalone: true,
	imports: [RouterModule, SideNavComponent],
	templateUrl: './dashboard-layout.component.html',
	styleUrl: './dashboard-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {}
