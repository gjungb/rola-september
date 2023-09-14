import { InjectionToken } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('REST API base URL', {
  factory: () =>
    'https://347eb1836965ec040f474bd7f78d4730.balena-devices.com/api',
});
