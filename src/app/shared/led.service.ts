import { Injectable, inject } from '@angular/core';
import { Led } from '../model/led';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { BASE_URL } from './tokens.di';

@Injectable({
  providedIn: 'root',
})
export class LedService {
  /**
   *
   */
  #client = inject(HttpClient);

  /**
   *
   */
  #base = inject(BASE_URL);

  /**
   *
   * @returns
   */
  readLeds(): Observable<Led[]> {
    const url = `${this.#base}/colors`;

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

  /**
   *
   * @param i
   * @returns
   */
  readLed(i: number | string): Observable<Led> {
    const index = typeof i === 'number' ? i : Number.parseInt(i);
    const url = `${this.#base}/colors/${i}`;
    return this.#client
      .get(url, { responseType: 'text' })
      .pipe(map((color) => ({ index, color })));
  }
}
