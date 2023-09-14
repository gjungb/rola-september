import { Injectable, inject } from '@angular/core';
import { Led } from '../model/led';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LedService {
  #client = inject(HttpClient);
  /**
   *
   * @returns
   */
  readLeds(): Observable<Led[]> {
    // TODO move to DI
    const url =
      'https://347eb1836965ec040f474bd7f78d4730.balena-devices.com/api/colors';

    const res$ = this.#client.get<string[]>(url);

    return res$.pipe(
      map((value) => {
        return value.map((color, index) => {
          return { index, color };
        });
      })
    );

    // .pipe(map((x) => x.map((color, index) => ({ index, color }))));

    return of([
      {
        index: 0,
        color: 'red',
        // foo: 42, ???
      },
      {
        index: 1,
        color: 'green',
      },
      {
        index: 2,
        color: 'blue',
      },
    ]);
  }
}
