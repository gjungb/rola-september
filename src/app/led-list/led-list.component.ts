import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, tap, timer } from 'rxjs';
import { Led } from '../model/led';
import { LedService } from '../shared/led.service';

/**
 * Stateful Component
 * Smart Component
 */
@Component({
  selector: 'pi-led-list',
  templateUrl: './led-list.component.html',
  styleUrls: ['./led-list.component.scss'],
})
export class LedListComponent implements OnInit {
  #service = inject(LedService);

  leds!: Led[];

  ticker$ = timer(2e3, 1_000).pipe(tap((value) => console.log(value)));

  ngOnInit(): void {
    this.#service
      .readLeds()
      .pipe(
        delay(1_000),
        tap((leds) => console.log(leds))
      )
      .subscribe((value) => {
        /**
         * Local state
         */
        this.leds = value;
      });
  }

  setRandomColor(index: number): void {
    // effect
    console.log(index);
    // mutable
    // this.leds[index].color = 'yellow';
    // immutable (?)
    this.leds[index] = { index, color: 'goldenrod' };
  }
}
