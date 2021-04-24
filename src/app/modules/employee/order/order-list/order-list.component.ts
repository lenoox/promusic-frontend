import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../../core/service/order.service';
import {Order} from '../../../../shared/model/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void{
    this.orderService.GetOrders().subscribe((data: Order[]) => {
      this.orderList = data;
    });
  }
}
