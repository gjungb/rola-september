import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Led } from '../model/led';

@Component({
  selector: 'pi-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LedComponent {
  /**
   *
   */
  @Input({
    required: true,
  })
  led!: Led;

  @Input()
  foo?: number;

  /**
   *
   */
  @Output()
  colorChange = new EventEmitter<number>();

  /**
   *  Effect: emits the led's index to the parent component
   *
   * @param ev
   */
  handleClick(ev: MouseEvent): void {
    // console.log('clicked', ev.offsetX);
    // this.led.color = 'yellow';
    // side effect
    this.colorChange.emit(this.led.index);
  }
}
