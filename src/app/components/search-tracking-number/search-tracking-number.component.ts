import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AngularMaterialModule } from 'src/app/common/angular-material.module';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-search-tracking-number',
  templateUrl: './search-tracking-number.component.html',
  styleUrls: ['./search-tracking-number.component.scss'],
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, MatButtonModule, FormsModule],
})
export class SearchTrackingNumberComponent implements OnInit {
  inputNumberOrder = '';
  constructor(
    private orderService : OrderService
  ) { }
  orderTracking:any;
  ngOnInit() {
  }

  getOrderByTrackingNumber(){
    this.orderService.trackingByOrderNumber(this.inputNumberOrder).subscribe({
      next: (value) => {
        this.orderTracking = value.result_data;
      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
  }
}
