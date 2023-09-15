import { NgModule, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterModule,
  Routes,
} from '@angular/router';
import { LedListComponent } from './led-list/led-list.component';
import { LedComponent } from './led/led.component';
import { LedService } from './shared/led.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'leds',
    pathMatch: 'full',
  },
  {
    path: 'leds',
    children: [
      {
        path: '',
        component: LedListComponent,
      },
      {
        path: ':index',
        component: LedComponent,
        canActivate: [],
        resolve: {
          led: (route: ActivatedRouteSnapshot) => {
            const service = inject(LedService);
            // TODO make sure that index is a number?
            // TODO use service to read led from Raspberry Pi
            const index = route.paramMap.get('index');
            return { index, color: 'blue ' };
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
