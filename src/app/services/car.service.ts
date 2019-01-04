import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  brandsDB = [
    { name: 'AUDI', fipe_name: "Audi", key: "audi-6", id: 6 },
    { name: "BMW", fipe_name: "BMW", key: "bmw-7", id: 7 },
    { name: "CITROEN", fipe_name: "Citroën", key: "citroen-13", id: 13 },
    { name: "FIAT", fipe_name: "Fiat", key: "fiat-21", id: 21 }
  ];

  constructor(private http: HttpClient) { }

  getBrandsDB() {
    let backEndRoute = environment.URL_BACKEND_PROD + 'brands/listAll';
    return this.http.get(backEndRoute);
  }
  getBrandsFipe() {
    return this.http.get('https://fipeapi.appspot.com/api/1/carros/marcas.json');
  }

  addDBBrand(brand) {
    let backEndRoute = environment.URL_BACKEND_PROD + 'brands/insert';
    return this.http.post(backEndRoute, brand);
  }

  removeDBBrand(brand) {
    console.log('brandID SERVICE>>>>>>', brand);
    let backEndRoute = environment.URL_BACKEND_PROD + 'brands/remove';
    return this.http.post(backEndRoute, brand);
  }
}
