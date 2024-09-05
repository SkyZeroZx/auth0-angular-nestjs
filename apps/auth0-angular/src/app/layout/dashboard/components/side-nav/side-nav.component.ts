import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { SideNavOptions } from '@/core/interfaces';
import { AuthService } from '@/services/auth';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { SIDE_NAV_BAR_ROUTES } from './side-navbar-routes';

@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss'],
	imports: [
		MatToolbarModule,
		MatSidenavModule,
		MatExpansionModule,
		MatMenuModule,
		MatIconModule,
		MatListModule,
		RouterModule
	],
	standalone: true
})
export class SideNavComponent {
	private readonly breakpointObserver = inject(BreakpointObserver);
	private readonly authService = inject(AuthService);
	private readonly user$ = this.authService.user$;

	readonly expansionPanels: SideNavOptions[] = SIDE_NAV_BAR_ROUTES;

	private readonly isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map((result) => result.matches),
			shareReplay()
		);

	readonly isHandset = toSignal(this.isHandset$);

	readonly user = toSignal(this.user$);

	readonly sidNavBarRoutes = SIDE_NAV_BAR_ROUTES;

	logOut() {
		this.authService.logout();
	}
}
