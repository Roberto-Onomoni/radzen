/*
  This file is automatically generated. Any changes will be overwritten.
  Modify northwind-orders.component.ts instead.
*/
import { ChangeDetectorRef, ViewChild, AfterViewInit, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { DialogService, DIALOG_PARAMETERS, DialogRef } from '@radzen/angular/dist/dialog';
import { NotificationService } from '@radzen/angular/dist/notification';
import { ContentComponent } from '@radzen/angular/dist/content';
import { HeadingComponent } from '@radzen/angular/dist/heading';
import { GridComponent } from '@radzen/angular/dist/grid';
import { AddNorthwindOrderComponent } from '../add-northwind-order/add-northwind-order.component';
import { EditNorthwindOrderComponent } from '../edit-northwind-order/edit-northwind-order.component';

import { NorthwindService } from '../northwind.service';

export class NorthwindOrdersGenerated implements AfterViewInit, OnInit, OnDestroy {
  // Components
  @ViewChild('content1') content1: ContentComponent;
  @ViewChild('pageTitle') pageTitle: HeadingComponent;
  @ViewChild('grid0') grid0: GridComponent;

  router: Router;

  cd: ChangeDetectorRef;

  route: ActivatedRoute;

  notificationService: NotificationService;

  dialogService: DialogService;

  dialogRef: DialogRef;

  _location: Location;

  _subscription: Subscription;

  northwind: NorthwindService;

  getNorthwindOrdersResult: any;

  getNorthwindOrdersCount: any;

  parameters: any;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.notificationService = this.injector.get(NotificationService);

    this.dialogService = this.injector.get(DialogService);

    this.dialogRef = this.injector.get(DialogRef, null);

    this.router = this.injector.get(Router);

    this.cd = this.injector.get(ChangeDetectorRef);

    this._location = this.injector.get(Location);

    this.route = this.injector.get(ActivatedRoute);

    this.northwind = this.injector.get(NorthwindService);
  }

  ngAfterViewInit() {
    this._subscription = this.route.params.subscribe(parameters => {
      if (this.dialogRef) {
        this.parameters = this.injector.get(DIALOG_PARAMETERS);
      } else {
        this.parameters = parameters;
      }
      this.load();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }


  load() {
    this.northwind.getNorthwindOrders(null, this.grid0.allowPaging ? this.grid0.pageSize : null, this.grid0.allowPaging ? 0 : null, null, `Customer,Employee`, this.grid0.allowPaging)
    .subscribe((result: any) => {
      this.getNorthwindOrdersResult = result.value;

      this.getNorthwindOrdersCount = this.grid0.allowPaging ? result['@odata.count'] : result.value.length;
    }, (result: any) => {

    });
  }

  grid0Add(event: any) {
    this.dialogService.open(AddNorthwindOrderComponent, { parameters: {}, title: 'Add Order' });
  }

  grid0Delete(event: any) {
    this.northwind.deleteNorthwindOrder(event.OrderID)
    .subscribe((result: any) => {
      this.notificationService.notify({ severity: "success", summary: `Success`, detail: `NorthwindOrder deleted!` });
    }, (result: any) => {
      this.notificationService.notify({ severity: "error", summary: `Error`, detail: `Unable to delete NorthwindOrder` });
    });
  }

  grid0LoadData(event: any) {
    this.northwind.getNorthwindOrders(`${event.filter}`, event.top, event.skip, `${event.orderby}`, `Customer,Employee`, event.top != null && event.skip != null)
    .subscribe((result: any) => {
      this.getNorthwindOrdersResult = result.value;

      this.getNorthwindOrdersCount = event.top != null && event.skip != null ? result['@odata.count'] : result.value.length;
    }, (result: any) => {

    });
  }

  grid0RowSelect(event: any) {
    this.dialogService.open(EditNorthwindOrderComponent, { parameters: {OrderID: event.OrderID}, title: 'Edit Order' });
  }
}
