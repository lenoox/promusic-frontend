import { Component, OnInit } from '@angular/core';
import {Order} from '../../../../shared/model/order';
import {OrderService} from '../../../../core/service/order.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StatusService} from '../../../../core/service/status.service';
import {Status} from '../../../../shared/model/status';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  statusForm: FormGroup;
  statusList: Status[];
  isResponseOrderStatus: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private statusService: StatusService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadStatus();
    this.loadProduct();
    this.statusForm = this.formBuilder.group({
      status: this.formBuilder.group({
        id: ['', [Validators.required]],
      })
    });
  }
  onSubmit(): void {
    const id = +this.route.snapshot.params.id;
    if (this.statusForm.value) {
      this.orderService.changeStatusByOrder(id, this.statusForm.value)
        .subscribe((resp) => {
          if (resp.status === 200){
            this.isResponseOrderStatus = true;
          }
        }, (err: any) => {
          this.isResponseOrderStatus = false;
          console.log(err);
        });
    }
  }
  loadProduct(): void{
    const id = +this.route.snapshot.params.id;
    this.orderService.GetOrder(id).subscribe((data) => {
      this.order = data;
      this.statusForm.get('status.id').setValue(data.status.id);
    });
  }
  loadStatus(): void{
    this.statusService.GetAllStatus().subscribe((data) => {
      this.statusList = data;
    });
  }
  get getControl(){
    return this.statusForm.controls;
  }
}
