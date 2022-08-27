import { Component, OnInit } from '@angular/core';
import {Products} from "../../shared/interfaces/products";
import {ProductsService} from "../../shared/services/products/products.service";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../shared/services/cart/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Products[] = [];
  page: number = 0;
  cart: any;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.cartService.selectedProduct$.subscribe(
      (product:any) => this.cart = product
    )
  }

  private getAllProducts():void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data
    })
  }

  private getProduct(id:string):void {
    this.productService.getProduct(id).subscribe((data) => {
      this.products = data
    })
  }

  private productSelected(product:any): void {
    this.cartService.setProduct(product);
  }

   addCart(product: Products): void {
    this.productSelected(this.cart);
  }

}
