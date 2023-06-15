import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Ship } from '../interfaces';

@Component({
  selector: 'ng-signal-ship-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipDetailsComponent {
  @Input() ship!: Ship;
}
