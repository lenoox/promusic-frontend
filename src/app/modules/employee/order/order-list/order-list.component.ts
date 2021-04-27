import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../../core/service/order.service';
import {Order} from '../../../../shared/model/order';
import {Page} from '../../../../shared/model/page';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList: Order[] = [];
  page = 1;
  sizePage = 10;
  totalElements = 0;
  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void{
    this.orderService.GetOrders(this.page, this.sizePage).subscribe((data: Page<Order[]>) => {
      this.orderList = data.content;
      this.totalElements = data.totalElements;
    });
  }
}
