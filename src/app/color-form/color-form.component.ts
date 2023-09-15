import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { TinyColor } from '@ctrl/tinycolor';
import { tap } from 'rxjs';
import { Led } from '../model/led';

/**
 * Validator for color strings
 */
const isValidColor: ValidatorFn = ({ value }: AbstractControl) =>
  new TinyColor(value ?? undefined).isValid
    ? null
    : { color: `Invalid color: ${value}` };

/**
 *
 */
@Component({
  selector: 'pi-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss'],
})
export class ColorFormComponent implements OnInit {
  #dr = inject(DestroyRef);

  form: FormGroup = new FormGroup({
    color: new FormControl(null, {
      validators: [isValidColor],
    }),
  });

  /**
   *
   */
  ngOnInit(): void {
    this.form.statusChanges
      .pipe(
        tap(() => console.log(this.form.errors)),
        takeUntilDestroyed(this.#dr)
      )
      .subscribe();
  }

  /**
   *
   * @param value
   */
  updateColor(value: Pick<Led, 'color'>): void {
    // effect
    console.log(value);
  }
}
