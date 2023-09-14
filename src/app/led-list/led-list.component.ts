import { Component, OnInit, inject } from '@angular/core';
import { Led } from '../model/led';
import { LedService } from '../shared/led.service';
import { delay, tap } from 'rxjs';

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

  /**
   * Local state
   */

  ngOnInit(): void {
    this.#service
      .readLeds()
      .pipe(
        delay(5_000),
        tap((leds) => console.log(leds))
      )
      .subscribe((value) => {
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
