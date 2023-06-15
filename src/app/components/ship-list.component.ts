import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SwapiService } from '../services/swapi.service';
import { Ship } from '../interfaces';
import { FormsModule } from '@angular/forms';
import { ShipDetailsComponent } from './ship-details.component';

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

  constructor() {
    effect(() => {
      this.search();
    });
  }

  search() {
    this.swapiService
      .getShips(this.searchString())
      .subscribe((ships) => this.ships.set(ships));
  }

  async searchPromise() {
    const ships = await this.swapiService.getShipsPromise(this.searchString());

    this.ships.set(ships);
  }

  upgrade() {
    this.ships.update((ships) => [
      { ...ships[0], model: `${ships[0].model} PLUS` },
      ...ships.slice(1),
    ]);
  }
}
