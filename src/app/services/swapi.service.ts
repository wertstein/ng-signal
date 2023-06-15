import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom, map } from 'rxjs';
import { Ship } from '../interfaces';

const API_URL = 'https://swapi.dev/api';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private readonly http = inject(HttpClient);

  getShips(search = ''): Observable<Ship[]> {
    const params = new HttpParams({ fromObject: { search } });

    return this.http
      .get<{ results: [] }>(`${API_URL}/starships`, { params })
      .pipe(map(({ results }) => results));
  }

  getShipsPromise(search = ''): Promise<Ship[]> {
    return firstValueFrom(this.getShips(search));
  }
}
