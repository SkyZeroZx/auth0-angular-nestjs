import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@/services/auth';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
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
