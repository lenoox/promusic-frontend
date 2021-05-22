import { Component, OnInit } from '@angular/core';
import {Order} from '../../../shared/model/order';
import {OrderService} from '../../../core/service/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }
  ngOnInit(): void {
  }
}
