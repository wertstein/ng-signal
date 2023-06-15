import { Route } from '@angular/router';
import { ShipListComponent } from './components/ship-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ships',
  },
  {
    path: 'ships',
    component: ShipListComponent,
  },
];
