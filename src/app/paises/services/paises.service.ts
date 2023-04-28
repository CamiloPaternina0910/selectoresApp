import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaisSmall } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl  : string = 'https://restcountries.com/v3.1/'
  private _regiones : string[] = [
    'Africa', 
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ]

  constructor(private http : HttpClient) { }

  get regiones(){
    return [ ... this._regiones]
  }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]>{
    const url = `${this._baseUrl}region/${region}?fields=cca3,name`
    return this.http.get<PaisSmall[]>(`${url}`)
  }
}
