import { Pipe, PipeTransform } from '@angular/core';
import { ColorFormats, TinyColor } from '@ctrl/tinycolor';

/**
 *
 */
@Pipe({
  name: 'piColor',
  // pure: false
})
export class PiColorPipe implements PipeTransform {
  /**
   *
   * @param value
   * @param format
   * @returns
   */
  transform(value: string, format?: ColorFormats): string {
    // pure ???
    // no (side) effect
    // same result for same arguments
    const color = new TinyColor(value);
    return color.toString(format);
  }
}
