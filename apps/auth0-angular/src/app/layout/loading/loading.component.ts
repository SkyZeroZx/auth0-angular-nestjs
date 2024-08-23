import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { take } from 'rxjs';

import { AuthService } from '@/services/auth';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  options: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_7GoiCvHm8v.json',
  };

  animationItem: AnimationItem;

  redirect() {
    this.authService.user$.pipe(take(1)).subscribe((res) => {
      console.log('hasUser', res);
      this.router.navigate(['/dashboard/profile']);
    });
  }

  onLoopComplete() {
    console.log('Event Complete animation lottie');
    this.animationItem.stop();
    this.redirect();
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
