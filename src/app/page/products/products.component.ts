import {Component, Input, OnInit, Output} from '@angular/core';
import {Products} from "../../shared/interfaces/products";
import {ProductsService} from "../../shared/services/products/products.service";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../shared/services/cart/cart.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DetailProductComponent} from "../../components/detail-product/detail-product.component";

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
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.cartService.selectedProduct$.subscribe(
      (product: any) => this.cart = product
    )
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data
    })
  }

  productSelected(product: any): void {
    this.cartService.setProduct(product);
  }

  addCart(product: Products): void {
    this.productSelected(this.cart);
    let productCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      counter: 0
    }

    const filter = this.cart.filter((products: any) =>
      products.id === productCart.id
    )

    if (filter.length === 0) {
      productCart.counter++;
      this.cart.push(productCart);
      this.toastr.success('Producto agregado');
      return;
    }

    this.cart.map((products: any, index: number) => {
      if (productCart.id === products.id) {
        this.cart[index].counter++;
        this.toastr.success('Producto agregado');
      }
    })
  }

  detail(product: Products) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = product
    this.dialog.open(DetailProductComponent, dialogConfig);
  }

}
