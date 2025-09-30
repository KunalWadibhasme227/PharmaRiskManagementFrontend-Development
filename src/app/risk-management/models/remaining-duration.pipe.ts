import { Pipe, PipeTransform, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Pipe({
  name: 'remainingDuration',
  pure: false // important for live updates
})
export class RemainingDurationPipe implements PipeTransform, OnDestroy {
  private timer$: Subscription | null = null;
  private lastValue: string | null = null;

  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone) {}

  transform(targetDate: string | Date): string {
    if (!targetDate) return '';

    const end = new Date(targetDate).getTime();
    const now = Date.now();
    const diff = end - now;

    // If expired, stop timer and show Expired
    if (diff <= 0) {
      this.clearTimer();
      return 'Expired';
    }

    // Start interval if not already running
    if (!this.timer$) {
      this.ngZone.runOutsideAngular(() => {
        this.timer$ = interval(1000).subscribe(() => {
          this.ngZone.run(() => this.cd.markForCheck());
        });
      });
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.lastValue = `${hours}h ${minutes}m ${seconds}s`;
    return this.lastValue;
  }

  private clearTimer() {
    if (this.timer$) {
      this.timer$.unsubscribe();
      this.timer$ = null;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
