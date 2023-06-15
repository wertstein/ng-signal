import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  toObservable,
  toSignal,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SwapiService } from '../services/swapi.service';
import { Ship } from '../interfaces';
import { FormsModule } from '@angular/forms';
import { ShipDetailsComponent } from './ship-details.component';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'ng-signal-ship-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ShipDetailsComponent,
  ],
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipListComponent {
  private readonly swapiService = inject(SwapiService);

  readonly searchString = signal('wing');

  readonly ships = signal<Ship[]>([]);

  readonly searchString$ = toObservable(this.searchString);

  readonly criteria$ = this.searchString$.pipe(
    filter((v) => v.length >= 3),
    debounceTime(500)
  );

  readonly criteria = toSignal(this.criteria$, { initialValue: 'wing' });

  constructor() {
    effect(() => {
      this.searchPromise();
    });
  }

  // search() {
  //   this.swapiService
  //     .getShips(this.searchString())
  //     .subscribe((ships) => this.ships.set(ships));
  // }

  async searchPromise() {
    const searchString = this.criteria();

    const ships = await this.swapiService.getShipsPromise(searchString);

    this.ships.set(ships);
  }

  upgrade() {
    this.ships.update((ships) => [
      { ...ships[0], model: `${ships[0].model} PLUS` },
      ...ships.slice(1),
    ]);
  }
}
