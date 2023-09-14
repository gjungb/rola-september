import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { LedListComponent } from './led-list/led-list.component';
import { LedComponent } from './led/led.component';
import { LedService } from './shared/led.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'leds',
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
        canActivate: [
          (snapshot: ActivatedRouteSnapshot) =>
            false ===
            Number.isNaN(Number.parseInt(snapshot.paramMap.get('index') ?? '')),
        ],
        resolve: {
          led: (snapshot: ActivatedRouteSnapshot) =>
            inject(LedService).readLed(snapshot.paramMap.get('index')!),
        },
        title: (snapshot: ActivatedRouteSnapshot) =>
          `Led ${snapshot.paramMap.get('index')}`,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
