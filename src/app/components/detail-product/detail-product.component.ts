import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Products} from "../../shared/interfaces/products";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  detailProduct: Products;
  panelOpenState = false;

  constructor(
    private dialogRef: MatDialogRef<DetailProductComponent>,
    @Inject(MAT_DIALOG_DATA) data: Products) {
    this.detailProduct = data;
  }

  ngOnInit(): void {}

}
