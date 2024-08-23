import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  redirect() {
    this.authService.user$.pipe(take(1)).subscribe((res) => {
      console.log('hasUser', res);
      this.router.navigate(['/dashboard/profile']);
    });
  }

  ngOnInit(): void {}
}
