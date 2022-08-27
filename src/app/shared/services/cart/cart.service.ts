import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

const product: [] = []

@Injectable({
  providedIn: 'root'
})


export class CartService {

  private product$ = new BehaviorSubject<any>(product);

  constructor() {}

  get selectedProduct$(): Observable<any> {
    return this.product$.asObservable();
  }

  setProduct(product: any): void {
    this.product$.next(product);
  }
}
