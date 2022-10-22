import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurant } from './restaurant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private baseUrl = environment.host;

  private auth_token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTY2NTkzMDUzMX0.gnzuJcALIOuZbFscpjP7Nls2nRbfeyYveO8_i-TG-iowuAqJbIhYR1RXHykdgjTBJa-aeIzJLQ8ri1ZgoV9zTw";                  

  headers!: HttpHeaders;
  constructor(private http: HttpClient) { 
    console.log(this.auth_token);
     this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth_token).set('content-type', 'application/json');
  }
  get() {
    return this.http.get<Restaurant[]>(this.baseUrl+"/restaurantdb/api/restaurants", { headers: this.headers });
  }
  create(payload: Restaurant) {
    console.log("into services " + payload.name);
    return this.http.post<Restaurant>(this.baseUrl+"/restaurantdb/api/restaurants", payload,{ headers: this.headers });
  }
}
