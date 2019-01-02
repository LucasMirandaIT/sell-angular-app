import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FipeService {

  constructor(private http: HttpClient) { }

  getMarcas() {
    return this.http.get('http://fipeapi.appspot.com/api/1/carros/marcas.json');
  }
}
