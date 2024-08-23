import { isLogged } from '@/core/guard';
import { DashboardLayoutComponent, LoadingComponent } from '@/layout';
import { Route } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { ProfileComponent } from './pages/dashboard/components/profile/profile.component';

//http://localhost:4200/dashboard?code=QxKMv-3L9Dw-PpXGGp6PNqHMG7SDSfqZQ8PWXvp89sXQR&state=MnBMbmktVE85YlQ1Wi5mbH5KUk95Z2lTQkxNMTJYS3EyZlU2ek1wR2hYaA%3D%3D

export const appRoutes: Route[] = [
  {
    path: 'loading',
    canActivate: [authGuardFn],
    component: LoadingComponent,
  },
  {
    path: 'auth/login',
    canActivate: [isLogged],
    loadComponent: () =>
      import('@/pages/auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard/profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  {
    path: 'error',
    loadComponent: () =>
      import('@/pages/error/components/error.component').then(
        (c) => c.ErrorComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'loading',
  },
];
