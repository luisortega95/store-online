import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/services/cart/cart.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  cart$ = this.cartService.selectedProduct$;
  total: number = 0;
  displayedColumns: string[] = [
    'imageUrl', 'name', 'price', 'quantity', 'delete'
  ];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.cart$.subscribe((product) => {
      this.cart = product;
      this.toPay();
    })
  }

  toPay() {
    this.cart.map((product: any) => {
      this.total += product.counter * product.price;
    })
  }

  removeProduct(productRemoved: any) {
    this.total -= productRemoved.counter * productRemoved.price;
    this.cart.map((products: any, index: number) => {
      if (products.id === productRemoved.id) {
        this.cart.splice(index, 1);
        this.toastr.error('Producto eliminado');
      }
    })
  }

}
