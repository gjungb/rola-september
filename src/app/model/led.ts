/**
 * A single Led on a Blinkt!
 */
export interface Led {
  /**
   * The 0-based index in a list of leds
   */
  index: number;
  /**
   * A valid CSS color string
   * @see
   */
  color: string;
  /**
   *
   */
  visible?: boolean;
}
