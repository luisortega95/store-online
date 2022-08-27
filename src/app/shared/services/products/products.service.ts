import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Products} from "../../interfaces/products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private REST_API_SERVER = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {
  }

  public getAllProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.REST_API_SERVER);
  }

  public getProduct(id: string): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.REST_API_SERVER + id);
  }
}
