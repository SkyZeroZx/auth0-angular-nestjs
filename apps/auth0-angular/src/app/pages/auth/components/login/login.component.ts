import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}

  login() {
    this.authService.login();
  }
}
