import {Component, OnInit, ViewChild,} from '@angular/core';
import {CartService} from "../../shared/services/cart/cart.service";
import {ToastrService} from "ngx-toastr";
import {Products} from "../../shared/interfaces/products";
import {MatTable} from "@angular/material/table";

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
  @ViewChild(MatTable) table: MatTable<Products> | undefined;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService) {

  }

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
        this.cart.splice(index, 1)
        // @ts-ignore
        this.table.renderRows()
        this.toastr.error('Producto eliminado');
      }
    })
  }

}
